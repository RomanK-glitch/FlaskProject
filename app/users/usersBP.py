from flask import Blueprint
from flask import render_template

from models import Track, User

users = Blueprint('users', __name__, template_folder='templates')

@users.route('/<slug>')
def profile(slug):
    user = User.query.filter(User.slug==slug).first()
    tracks = Track.query.filter(Track.user_id==user.id)
    return render_template('users/profile.html', user=user, tracks=tracks)
