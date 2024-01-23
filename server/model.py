from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from app import bcrypt


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-comments.user', '-votes.user', '-posts.user')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    full_name = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, unique=True, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    # table relationship columns
    posts = db.relationship('Post', backref='user')
    comments = db.relationship('Comment', back_populates='user')
    votes = db.relationship('Vote', back_populates='user')

    # password and authentication
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    # Field validations

    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError('Please provide a username')
        if User.query.filter_by(username=username).first():
            raise ValueError('Username already in use')

        return username

    @validates('email')
    def validate_email(self, key, email):
        import re
        pattern = r'^[a-z]*.[a-z]*@student.moringaschool.com'
        regex = re.compile(pattern)
        if not regex.fullmatch(email):
            raise ValueError('use a valid Moringa School email')

        if not email:
            raise ValueError('Please provide an email')

        return email

    @validates('full_name')
    def validate_full_name(self, key, full_name):
        if not full_name:
            raise ValueError("Please provide your full names")

        return full_name

    def __repr__(self):
        return f'''<User {self.username}, id: {self.id}>'''


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'
    serialize_rules = ('-post.comments', '-user.comments')

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    update_at = db.Column(db.DateTime, onupdate=db.func.now())

    post = db.relationship('Post', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

    @validates('content')
    def validate_content(self, key, content):
        if not content:
            raise ValueError('Write comment!!!')

        if len(content) < 25:
            raise ValueError('comment must be atleast 25 character long')

        return content

    def __repr__(self):
        return f'''<Content: {self.id} || {self.content}>'''


class Post(db.Model, SerializerMixin):

    __tablename__ = 'posts'
    serialize_rules = ('-comments.post', '-votes.post')

    id = db.Column(db.Integer, primary_key=True)
    phase = db.Column(db.Integer)
    minutes_to_read = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    resources = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    # Table relationship
    comments = db.relationship('Comment', back_populates='post')
    votes = db.relationship('Vote', back_populates='post')

    @validates('content')
    def validate_content(self, key, content):
        if not content:
            raise ValueError('Please provide your content')

        if len(content) < 300:
            raise ValueError('content must be atleast 300 character long')

        return content

    @validates('phase')
    def validate_phase(self, key, phase):
        if phase not in range(6):
            raise ValueError('phases range feom 0 to 5')
        return phase

    @validates("title")
    def validate_title(self, key, title):
        if not title:
            raise ValueError('Please provide a title')

        if len(title) not in range(3, 100):
            raise ValueError('Title should be atleast 3 characters long')

        return title

    def __repr__(self):
        return f'''<Title: {self.title}, Content{self.content}>'''


class Vote(db.Model, SerializerMixin):

    __tablename__ = 'votes'
    serialize_rules = ('-user.votes', '-post.votes')

    id = db.Column(db.Integer, primary_key=True)
    vote_type = db.Column(db.Boolean)
    user_id = db.Column(db.Integer. db.ForeignKey('user.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Table relations
    user = db.relationship('User', back_populates="votes")
    post = db.relationship('Post', back_populates="votes")

    def __repr__(self):
        return f'''<Vote type: {self.vote_type}>'''
