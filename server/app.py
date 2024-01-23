from flask import request, jsonify, make_response
from flask_restful import Resource
from models import User, Comment, Post, Vote
from config import app, api, db


class Index(Resource):
    def get(self):
        return {"message": "Welcome to moring blog api"}, 200


api.add_resource(Index, '/')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
