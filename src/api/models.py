from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

participant = db.Table('participant',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('evento_id', db.Integer, db.ForeignKey('evento.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(80), unique=False)
    age =db.Column(db.Integer,unique=False)
    description =db.Column(db.String)
    participant = db.relationship('Evento',secondary=participant, lazy='subquery', backref=db.backref('user', lazy=True))
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "age": self.age,
            "description" : self.description,
            "participant" : self.participant,
            # do not serialize the password, its a security breach
        }
class Evento(db.Model):
    id = db.Column(db.Integer, primary_key=True )
    sport = db.Column(db.String(250))
    date = db.Column(db.String)#cambiarla a string?
    duration = db.Column(db.Integer)
    agemin = db.Column(db.Integer)
    agemax = db.Column(db.Integer)
    payment = db.Column(db.Integer(), unique=False, nullable=False)
    space= db.Column(db.Boolean(), unique=False, nullable=False)
    participantmax = db.Column(db.Integer,unique=False)
    ciudad = db.Column(db.String)
    description =db.Column(db.String(250))
    admin = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=True)

    def __repr__(self):
        return '<Eventos %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "sport": self.sport,
            "date": self.date,
            "duration": self.duration,
            "agemin": self.agemin,
            "agemax": self.agemax,
            "payment": self.payment,
            "participantmax": self.participantmax,
            "space": self.space,
            "ciudad" : self.ciudad,
            "admin" : self.admin
            # "Lugarprovincia": self.Lugarprovincia,
            # "depolugarciudadrte": self.lugarciudad,
            # "direcionevento": self.direcionevento
        }
        