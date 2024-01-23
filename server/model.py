from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    full_name = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, unique=True, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    # update_at = db.Column(db.DateTime, onupdate=db.func.now())



Table users {
  id  integer [primary key]
  username varchar
  email  varchar
  full_name varchar 
  _password_hash varchar 
  created_at varchar 
}


Table comments {
  id integer [primary key]
  post_id integer
  user_id integer
  content varchar  
  created_at varchar  
  updated_at varchar 
}

Table posts {
  id integer [primary key]
  phase integer
  preview varchar
  minutes_to_read integer
  title varchar
  content varchar
  resources varchar  
  created_at varchar  
  updated_at varchar  
  user_id integer
}
