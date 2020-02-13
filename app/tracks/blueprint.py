from flask import Blueprint
from flask import render_template

from models import Track

from flask import request
from app import db

from flask import redirect
from flask import url_for

tracks = Blueprint('tracks', __name__, template_folder='templates')

