from functools import wraps
import jwt
from flask import request, abort
from flask import current_app
from server.models import User


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return {
                "message": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized"
            }, 401

        try:
            data = jwt.decode(
                token, current_app.config['SECRET_KEY'], algorithms=['HS256'])

            current_user = User.query.filter_by(id=data["user_id"]).first()

            if current_user is None:
                return {
                    "message": "Invalid Authentication token!",
                    "data": None,
                    "error": "Unauthorized"
                }, 401

            return f(current_user, *args, **kwargs)
        except Exception as e:
            return {
                "message": "Something went wrong here",
                "data": None,
                "error": str(e)
            }, 500

    return decorated
