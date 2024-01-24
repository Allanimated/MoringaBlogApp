from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse
from server.models import User, Post, Comment, Vote
from server.config import db

post_bp = Blueprint("post_bp", __name__)
api = Api(post_bp)

parser = reqparse.RequestParser()
parser.add_argument('phase', type=str, help='Provide phase')
parser.add_argument('title', type=str, help='Provide title')
parser.add_argument('content', type=str, help='Provide content')
parser.add_argument('resources', type=str, help='Provide resources')
parser.add_argument('user_id', type=int, help='Provide user id')


class Posts(Resource):
    def get(self):
        post_lc = [post.to_dict() for post in Post.query.all()]

        response = make_response(jsonify(post_lc), 200)

        return response

    def post(self):
        try:
            args = parser.parse_args()

            new_post = Post(
                phase=args["phase"],
                title=args["title"],
                content=args["content"],
                resources=args["resources"],
                user_id=args['user_id']
            )
            db.session.add(new_post)
            db.session.commit()

            response = make_response(jsonify(new_post.to_dict()), 201)

            return response
        except ValueError as e:
            return {'error': [str(e)]}


class PostByID(Resource):
    def get(self, post_id):
        post = Post.query.filter_by(id=post_id).first()

        if not post:
            return {"error": "post not found"}, 404

        return make_response(jsonify(post.to_dict()), 200)

    def patch(self, post_id):
        try:
            post = Post.query.filter_by(id=post_id).first()

            args = request.get_json()

            for attr in args:
                setattr(post, attr, args.get(attr))

            db.session.commit()

            return make_response(jsonify(post.to_dict()), 201)
        except ValueError as e:
            return {'error': [str(e)]}

    def delete(self, post_id):
        post = Post.query.filter_by(id=post_id).first()
        if not post:
            return {"error": "post not found"}
        post_comments = Comment.query.filter_by(post_id=post_id).all()
        post_votes = Vote.query.filter_by(post_id=post_id).all()

        if post_comments:
            Comment.query.delete(post_comments)
        if post_votes:
            Vote.query.delete(post_votes)

        db.session.delete(post)
        db.session.commit()

        response_dict = {
            "message": "post deleted successfully"
        }
        response = make_response(jsonify(response_dict), 200)

        return response


api.add_resource(Posts, "/posts")
api.add_resource(PostByID, "/posts/<int:post_id>")
