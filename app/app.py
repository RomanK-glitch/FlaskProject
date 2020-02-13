from flask import Flask
from config import ServerConfiguration
from flask_sqlalchemy import SQLAlchemy



app = Flask(__name__)
app.config.from_object(ServerConfiguration)

db = SQLAlchemy(app)
