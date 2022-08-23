from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    age = db.Column(db.Integer,nullable=False)
    management_event = db.Column(db.Integer,nullable=False)
    participants = db.Column(db.Integer,nullable=False)  
    description =db.Column(db.String,(240), nullable=False)
    photo = db.Column()#investigar
    location =db.Column()#investigar // En proceso

    # userevents = db.relationship('Usereventos',backref=db.backref('Usereventos'))
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "age": self.age,
            "management_event": self.management_event,
            "participants" : self.participants,
            "description" : self.description,
            # "photo": self.photo,                  // en proceso de saber como se hace
            # "location": self.location             // en proceso de saber como se hace
            # do not serialize the password, its a security breach
        }
class Events(db.Model):
    id = db.Column(db.Integer, primary_key=True )
    sport = db.Column(db.String(80), nullable=False)
    date = db.Column(db.Integer(), nullable=False)
    duration = db.Column(db.Integer(), nullable=False)
    payment = db.Column(db.Integer(), nullable=False)
    space= db.Column(db.Boolean(), nullable=False)
    agemin = db.Column(db.Integer,nullable=False)
    agemax = db.Column(db.Integer,nullable=False)
    city = db.Column(db.Integer,nullable=False)
    direction = db.Column(db.Integer,nullable=False)
    # location =db.Column()    //investigando
    
    # usereventos =db.relationship('Usereventos',backref=db.backref('Usereventos'))
    
    def __repr__(self):
        return '<Eventos %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "sport": self.sport,
            "date": self.date,
            "duration": self.duration,
            "agemin": self.agemin,
            "agemax": self.agemax,
            "payment": self.payment,
            "space": self.space,
            "city": self.city,
            "direction": self.direction,
            # "location": self.location,        //investigando
        }
class Userevents(db.Model):
    id = db.Column(db.Integer, primary_key=True )
    idusuario = db.Column(db.Integer, db.ForeignKey('user.id'))
    idevento  =db.Column(db.Integer, db.ForeignKey('eventos.id')),
    admin = db.Column(db.Boolean)