from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

participant = db.Table('participant',
                       db.Column('user_id', db.Integer, db.ForeignKey(
                           'user.id'), primary_key=True),
                       db.Column('evento_id', db.Integer, db.ForeignKey(
                           'evento.id'), primary_key=True)
                       )


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(80), unique=False)
    profile_image_url =  db.Column(db.String(250), unique=False)
    age =db.Column(db.Integer,unique=False)
    description =db.Column(db.String)
    participant = db.relationship('Evento',secondary=participant, lazy='subquery', backref=db.backref('users', lazy=True))#cambiarle el nombre
    eventospendientes = db.relationship("Association")
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        eventosp= list(map(lambda x:x.serialize(),self.eventospendientes))
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "age": self.age,
            "description" : self.description,
            "participant" : self.participant,
            "eventosp":eventosp
# do not serialize the password, its a security breach
        }
    

    def serializeWithoutParticipant(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "age": self.age,
            "description" : self.description,
            # do not serialize the password, its a security breach
        }

class Evento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sport = db.Column(db.String(250))
    date = db.Column(db.String)  # cambiarla a string?
    duration = db.Column(db.Integer)
    agemin = db.Column(db.Integer)
    agemax = db.Column(db.Integer)
    payment = db.Column(db.Integer(), unique=False, nullable=False)
    space= db.Column(db.Boolean(), unique=False, nullable=False)
    participantmax = db.Column(db.Integer,unique=False)
    ciudad = db.Column(db.String)
    description =db.Column(db.String(250))
    admin = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=True)
    estadoEvento =db.Column(db.String(80)) #Abierto(buscando participantes) ,Cerrado(ya tiene todos los participantes),Finalizado(El evento ya se acabo), Cancelado(Evento cancelado)
    usuariospendientes = db.relationship("Association")

    def __repr__(self):
        return '<Eventos %r>' % self.id

    def serialize(self):
        eventosp= list(map(lambda x:x.serialize(),self.usuariospendientes))
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
            "admin" : self.admin,
            "description":self.description,
            "estadoEvento":self.estadoEvento,
            "eventosp":eventosp
            # "Lugarprovincia": self.Lugarprovincia,
            # "depolugarciudadrte": self.lugarciudad,
            # "direcionevento": self.direcionevento
        }

class Association(db.Model):
    __tablename__ = 'association'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('evento.id'), primary_key=True)
    peticion = db.Column(db.String(50))
    user = db.relationship("User")
    evento =db.relationship("Evento")

    def __repr__(self):
        return '<association %r>' % self.user_id
    
    def serialize(self):
        return {
            "user_id":self.user_id,
            "event_id":self.event_id,
            "peticion":self.peticion,
        }
