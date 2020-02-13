from app import app
from app import db

from tracks.blueprint import tracks
from users.usersBP import users

import view


app.register_blueprint(users)

if __name__ == '__main__':
    app.run()






