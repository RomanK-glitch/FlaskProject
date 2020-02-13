from wtforms import Form, StringField, TextAreaField

class TrackFrom(Form):
    name=StringField('User name')
    email=StringField('E-mail')
    password=StringField('Password')
    rpassword=StringField('Repeat password')