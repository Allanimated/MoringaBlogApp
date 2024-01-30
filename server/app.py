from flask import request, jsonify, make_response, session
from flask_restful import Resource
import jwt
from server.config import app, api
from server.controllers.post_controller import post_bp
from server.controllers.user_controller import user_bp
from server.controllers.comment_controller import comment_bp
from server.controllers.vote_controller import vote_bp
from server.models import User
from server.auth_middleware import token_required

# register blueprints
app.register_blueprint(post_bp)
app.register_blueprint(user_bp)
app.register_blueprint(comment_bp)
app.register_blueprint(vote_bp)


class CheckSession(Resource):
    def get(self):
        try:
            if not session['token']:
                return {'token': None}, 404

            return {'token': session['token'], 'user_id': session['user_id']}, 200
        except Exception as e:
            return {'token': None}, 404


class Index(Resource):
    def get(self):
        return {"message": "Welcome to moring blog api"}, 200


class Login(Resource):
    def post(self):
        try:
            data = request.get_json()
            if not data:
                return {
                    "message": "Please provide user details",
                    "data": None,
                    "error": "Bad request"
                }, 400

            # validate input
            username = data["username"]
            user = User.query.filter(User.username == username).first()
            if not user:
                return {
                    "message": "Please provide user details",
                    "data": None,
                    "error": "Username not found"
                }, 404

            password = data['password']
            if user.authenticate(password):
                try:
                    # token should expire after 24 hrs
                    user.token = jwt.encode(
                        {"user_id": str(user.id)},
                        app.config["SECRET_KEY"],
                        algorithm="HS256"
                    )
                    # set token and user_id to session
                    session['token'] = user.token
                    session['user_id'] = user.id
                    return make_response(jsonify({
                        "message": "Successfully fetched auth token",
                        "data": user.to_dict(),
                        "token": str(user.token)
                    }), 200)
                except Exception as e:
                    return {
                        "error": "Something went wrong",
                        "message": str(e)
                    }, 500
            return {
                "message": "Error fetching auth token!.",
                "data": None,
                "error": "Invalid username or password. Try again.."
            }, 404
        except Exception as e:
            return {
                "message": "Something went wrong!",
                "error": str(e),
                "data": None
            }, 500


class Logout(Resource):
    def get(self):
        session['token'] = None
        session['user_id'] = None
        return {}, 200


api.add_resource(Logout, '/logout')
api.add_resource(Index, '/')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
