from flask import request, jsonify, make_response
from flask_restful import Resource
from server.config import app, api
from server.controllers.post_controller import post_bp
from server.controllers.user_controller import user_bp
from server.controllers.comment_controller import comment_bp
from server.controllers.vote_controller import vote_bp


# register blueprints
app.register_blueprint(post_bp)
app.register_blueprint(user_bp)
app.register_blueprint(comment_bp)
app.register_blueprint(vote_bp)


class Index(Resource):
    def get(self):
        return {"message": "Welcome to moring blog api"}, 200


api.add_resource(Index, '/')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
