from os import environ
from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData


load_dotenv()


# initialize app
app = Flask(__name__)
# app configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////home/allan/Development/Code/Phase_4/phase-4-blog-project/server/instance/moringa.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.config['SECRET_KEY'] = environ.get('SECRET_KEY')

# initialize database
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

CORS(app)
bcrypt = Bcrypt(app)
api = Api(app)
