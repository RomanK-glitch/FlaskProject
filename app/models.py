from app import db
from datetime import datetime
import re

def slugify(s):
    pattern = r'[^\w+]'
    return re.sub(pattern, '-', s)

class Track(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    track_name = db.Column(db.String(30))
    picture = db.Column(db.String(140))
    duration = db.Column(db.Integer)
    listenings = db.Column(db.Integer)
    path = db.Column(db.String(140))
    date = db.Column(db.DateTime, default=datetime.now())
    slug = db.Column(db.String(140), unique=True)

    def __init__(self, *args, **kwargs):
        super(Track, self).__init__(*args, **kwargs)
        self.generate_slug()

    def generate_slug(self):
        if self.title:
            self.slug = slugify(self.title)

    def __repr__(self):
        return '<Track id: {}, titleP{}>'.format(self.id, self.title)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30))
    about = db.Column(db.Text)
    picture = db.Column(db.String(140))
    password = db.Column(db.String(30))
    mail = db.Column(db.String(30))
    slug = db.Column(db.String(140), unique=True)
    tracks = db.relationship('Track', backref='user')

    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)
        self.slug = slugify(self.name)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text)
    user_id = db.Column(db.Integer)
    track_id = db.Column(db.Integer)
    date = db.Column(db.DateTime, default=datetime.now())

    def __init__(self, *args, **kwargs):
        super(Comment, self).__init__(*args, **kwargs)
        self.generate_slug()

class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    User1_id = db.Column(db.Integer)
    User2_id = db.Column(db.Integer)

    def __init__(self, *args, **kwargs):
        super(Followers, self).__init__(*args, **kwargs)
        self.generate_slug()

class Likes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    track_id = db.Column(db.Integer)

    def __init__(self, *args, **kwargs):
        super(Likes, self).__init__(*args, **kwargs)
        self.generate_slug()
