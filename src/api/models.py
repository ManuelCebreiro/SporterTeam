from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(80), unique=False)
    profile_image_url =  db.Column(db.String(250), unique=False)
    age =db.Column(db.Integer,unique=False)
    description =db.Column(db.String)
    # photo = db.Column() investigar
    # location =db.Column()investigar

   
  
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "age": self.age
            # do not serialize the password, its a security breach
        }
class Eventos(db.Model):
    id = db.Column(db.Integer, primary_key=True )
    sport = db.Column(db.String(250))
    date = db.Column(db.Integer)
    duration = db.Column(db.Integer)
    agemin = db.Column(db.Integer)
    agemax = db.Column(db.Integer)
    payment = db.Column(db.Integer(), unique=False, nullable=False)
    space= db.Column(db.Boolean(), unique=False, nullable=False)
    # location =db.Column() investigar
    
    
    
    def __repr__(self):
        return '<Eventos %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "deporte": self.deporte,
            "fecha": self.fecha,
            "duraciónevento": self.duraciónevento,
            "edadminima": self.edadminima,
            "edadmáxima": self.edadmáxima,
            "opciónpago": self.opciónpago,
            "depoairelibrecubiertorte": self.airelibrecubierto,
            "Lugarprovincia": self.Lugarprovincia,
            "depolugarciudadrte": self.lugarciudad,
            "direcionevento": self.direcionevento
        }
class Usereventos(db.Model):
    id = db.Column(db.Integer, primary_key=True )
    idusuario = db.Column(db.Integer, db.ForeignKey('user.id'))
    idevento  =db.Column(db.Integer, db.ForeignKey('eventos.id'))
    admin = db.Column(db.Boolean)