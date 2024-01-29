from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse
from server.models import Vote
from server.config import db
from server.auth_middleware import token_required

vote_bp = Blueprint("vote_bp", __name__)
api = Api(vote_bp)


parser = reqparse.RequestParser()
parser.add_argument('vote_type', type=str, help='Provide vote')
parser.add_argument('post_id', type=int, help='Provide post id')


class Votes(Resource):
    def get(self):
        vote_lc = [vote.to_dict() for vote in Vote.query.all()]
        return make_response(jsonify(vote_lc), 200)

    @token_required
    def post(current_user, *args):
        try:
            args = parser.parse_args()
            # a user can only vote once for a particular post
            vote = Vote.query.filter(
                Vote.user_id == current_user.id, Vote.post_id == args['post_id']).first()
            if vote:
                return {'message': "Vote exist"}, 200

            new_vote = Vote(
                post_id=args["post_id"],
                user_id=current_user.id,
                vote_type=int(args["vote_type"])
            )
            db.session.add(new_vote)
            db.session.commit()

            return make_response(jsonify(new_vote.to_dict()), 201)
        except ValueError as e:
            return {"error": [str(e)]}, 400


class VoteByID(Resource):
    def get(self, vote_id):
        vote = Vote.query.filter_by(id=vote_id).first()
        if not vote:
            return {"error": "Vote not found"}, 404
        response = make_response(jsonify(vote.to_dict()), 200)
        return response

    @token_required
    def patch(current_user, *args, vote_id):
        vote = Vote.query.filter_by(id=vote_id).first()
        if not vote or vote.user_id != current_user.id:
            return {
                "message": "failed to update vote",
                "error": "Unauthorized request",
                "data": None
            }, 401

        try:
            data = request.get_json()
            for attr in data:
                if attr != "vote_type":
                    return {
                        "message": "failed to update vote. Ypu an only update vote_type",
                        "error": "Unauthorized request",
                        "data": None
                    }, 401
                setattr(vote, attr, data[attr])

            db.session.commit()

            return make_response(jsonify(vote.to_dict()), 200)

        except ValueError as e:
            return {"error": [str(e)]}

    # def delete(self, vote_id):
    #     vote = vote.query.filter_by(id=vote_id).first()

    #     db.session.delete(vote)
    #     db.session.commit()

    #     return {"message": "Vote deleted successfully"}, 200


api.add_resource(Votes, "/votes")
api.add_resource(VoteByID, "/votes/<int:vote_id>")
