from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse
from server.models import Comment
from server.config import db

comment_bp = Blueprint("comment_bp", __name__)
api = Api(comment_bp)


parser = reqparse.RequestParser()
parser.add_argument('content', type=str, help='Provide content')
parser.add_argument('post_id', type=int, help='Provide post id')
parser.add_argument('user_id', type=int, help='Provide user id')


class Comments(Resource):
    def get(self):
        comment_lc = [comment.to_dict() for comment in Comment.query.all()]
        return make_response(jsonify(comment_lc), 200)

    def post(self):
        try:
            args = parser.parse_args()

            new_comment = Comment(
                post_id=args["post_id"],
                user_id=args["user_id"],
                content=args["content"]
            )
            db.session.add(new_comment)
            db.session.commit()

            return make_response(jsonify(new_comment), 200)
        except ValueError as e:
            return {"error": [str(e)]}


class CommentByID(Resource):
    def get(self, comment_id):
        comment = Comment.query.filter_by(id=comment_id).first()
        if not comment:
            return {"error": "comment not found"}, 404
        response = make_response(jsonify(comment.to_dict()), 200)
        return response

    def patch(self, comment_id):
        try:
            comment = Comment.query.filter_by(id=comment_id).first()
            data = request.get_json()
            for attr in data:
                setattr(comment, attr, data[attr])

            db.session.commit()

            return make_response(jsonify(comment.to_dict()), 200)

        except ValueError as e:
            return {"error": [str(e)]}

    def delete(self, comment_id):
        comment = Comment.query.filter_by(id=comment_id).first()

        db.session.delete(comment)
        db.session.commit()

        return {"message": "comment deleted successfully"}


api.add_resource(Comments, "/comments")
api.add_resource(CommentByID, "/comments/<int:comment_id>")
