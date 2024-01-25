from flask import Blueprint, jsonify, make_response, request
from flask_restful import Api, Resource, reqparse
from server.config import bcrypt, db
from server.models import User, Post, Comment, Vote
from server.auth_middleware import token_required


user_bp = Blueprint('user_bp', __name__)
api = Api(user_bp)

parser = reqparse.RequestParser()
parser.add_argument('username', type=str, help='please provide an email')
parser.add_argument('email', type=str, help='please provide an email')
parser.add_argument('password', type=str, help='please provide password')
parser.add_argument('confirm_password', type=str,
                    help='please confirm password')
parser.add_argument('full_name', type=str,
                    help='please provide your full name')


class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        response = make_response(jsonify(users), 200)
        return response

    def post(self):
        try:
            args = parser.parse_args()

            if args['password'] != args['confirm_password']:
                return {"error": "Your passwords do not match"}, 401

            new_user = User(
                username=args['username'],
                email=args['email'],
                _password_hash=bcrypt.generate_password_hash(
                    args['password'].encode('utf-8')
                )
            )

            db.session.add(new_user)
            db.session.commit()

            response = make_response(jsonify(new_user.to_dict()), 201)
            return response

        except ValueError as e:
            return {'error': [str(e)]}


class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()

        if not user:
            return {"error": "User not found"}, 404

        return make_response(jsonify(user.to_dict()), 200)

    @token_required
    def patch(current_user, *args, id):
        user = User.query.filter_by(id=id).first()
        if not user or current_user.id != user.id:
            return {
                "message": "failed to update post",
                "error": "Unauthorized request",
                "data": None
            }, 401

        try:
            data = request.get_json()
            for attr in data:
                # check update fields
                if attr not in ['username', 'password', 'email', 'full_name']:
                    return {
                        "message": "failed to update user. You can only update email, password, full_name or username",
                        "error": "Unauthorized request",
                        "data": None
                    }, 401
                # handle password updates
                if attr == 'password':
                    print(user)
                    password_hash = bcrypt.generate_password_hash(
                        data[attr].encode('utf-8')
                    )
                    setattr(user, '_password_hash', password_hash)

                # update other fields
                setattr(user, attr, data[attr])
            db.session.commit()
            return make_response(jsonify(user.to_dict()), 200)
        except ValueError as e:
            return {'error': [str(e)]}

    @token_required
    def delete(current_user, *args, id):
        user = User.query.filter_by(id=id).first()
        if not user or current_user.id != user.id:
            return {
                "message": "failed to delete user",
                "error": "Unauthorized request",
                "data": None
            }, 401

        user_posts = Post.query.filter_by(user_id=id).all()
        user_comments = Comment.query.filter_by(user_id=id).all()
        user_votes = Vote.query.filter_by(user_id=id).all()

        # delete entries
        if user_posts:
            Post.query.delete(user_posts)
        if user_comments:
            Comment.query.delete(user_comments)
        if user_votes:
            Vote.query.delete(user_votes)

        User.query.delete(user)
        return {"message": "User account has been deleted successfully"}, 200


api.add_resource(Users, '/users')
api.add_resource(UserByID, '/users/<int:id>')
