from app import app
from flask import render_template, redirect, url_for

from models import Track, User
from forms import TrackFrom

from flask import request

@app.route('/')
def index():
        q = request.args.get('q')
        if q:
                tracks = Track.query.filter(Track.track_name.contains(q)).all()
                users = User.query.filter(User.id == Track.user_id)
                usersq = User.query.filter(User.name.contains(q)).all()
                return render_template('search_view.html', tracks=tracks, users=users, usersq=usersq)
        else:
                tracks = Track.query.all()
                users = User.query.filter(User.id==Track.user_id)
                return render_template('index.html', tracks=tracks, users=users)