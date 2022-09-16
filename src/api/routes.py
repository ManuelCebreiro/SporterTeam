"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Evento ,Association
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import cloudinary
import cloudinary.uploader

api = Blueprint('api', __name__)

# ENDPOINT REGISTRO DE USUARIO NUEVO Y CHECK SI EXISTE


@api.route("/register", methods=["POST"])
def create_user():
    username = request.json.get("username")
    email = request.json.get("email")
    password = request.json.get("password")
    age = request.json.get("age")
    user = User(email=email, password=password, username=username, age=age)
    user_email = User.query.filter_by(email=email).one_or_none()
    user_username = User.query.filter_by(username=username).one_or_none()
    if user_email or user_username:
        return jsonify({"msg": "El usuario ya existe"}), 401
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "user register"}), 200


# ENDPOINT PARA CAMBIAR DATOS DEL PERFIL DEL USUARIO

@api.route("/edituser", methods=["POST"])
@jwt_required()
def edit_user():
    new_username = request.json.get("new_username")
    new_email = request.json.get("new_email")
    new_password = request.json.get("new_password")
    new_age = request.json.get("new_age")
    new_description = request.json.get("new_description")
    current_user = User.query.filter_by(email=get_jwt_identity()).first()

    user_new_email = User.query.filter_by(email=new_email).one_or_none()
    user_new_username = User.query.filter_by(
        username=new_username).one_or_none()
    print(user_new_username)
    print(user_new_email)
    if user_new_username or user_new_email:
        return jsonify({"msg": "username o email ya existen"}), 401
    if new_username:
        current_user.username = new_username
    if new_email:
        current_user.email = new_email
    if new_password:
        current_user.password = new_password
    if new_age:
        current_user.age = new_age
    if new_description:
        current_user.description = new_description

    db.session.commit()

    return jsonify({"msg": "Perfil actualizado"}), 200


# ENDPOINT PARA OBTENER EL TOKEN EN EL LOGIN
@api.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "El usuario no existe"}), 401
    elif email != user.email or password != user.password:
        return jsonify({"msg": "La contraseña o usuario es incorrecto o no existe"}), 402

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

# Endpoint obtener datos usuario


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    identity = get_jwt_identity()  # pide el token
    user1 = User.query.filter_by(email=identity).one_or_none()
    response = user1.serialize()

    return jsonify({"username": user1.username, "description": user1.description, "email": user1.email, "age": user1.age, "id": user1.id, }), 200

# CARGAR IMAGEN EN LA BASE DE DATOS


@api.route('/upload', methods=['POST'])
@jwt_required()
def handle_upload():
    identity = get_jwt_identity()  # pide el token
    user1 = User.query.filter_by(email=identity).one_or_none()
    result = cloudinary.uploader.upload(request.files['profile_image'])
    user1.profile_image_url = result['secure_url']
    db.session.add(user1)
    db.session.commit()

    return jsonify(user1.profile_image_url), 200
    # return jsonify(user1.profile_image_url), 200


@api.route('/upload', methods=['DELETE'])
@jwt_required()
def handle_deleteimage():
    identity = get_jwt_identity()  # pide el token
    user1 = User.query.filter_by(email=identity).one_or_none()
    user1.profile_image_url = "https://img.freepik.com/vector-premium/perfil-hombre-dibujos-animados_18591-58482.jpg?w=200"
    db.session.commit()

    return jsonify(user1.profile_image_url), 200
    # return jsonify(user1.profile_image_url), 200

# ENDPOINT PARA TRAER LA IMAGEN DE PERFIL DE LA BASE DE DATOS


@api.route('/load', methods=['GET'])
@jwt_required()
def handle_load():
    identity = get_jwt_identity()
    user = User.query.filter_by(email=identity).one_or_none()

    return jsonify(user.profile_image_url), 200
# ENDPOINT PARA OPTENER TODOS LOS EVENTOS


@api.route('/eventos', methods=["GET"])
def get_eventos():

    try:
        response = [x.serialize() for x in Evento.query.all()]
        return jsonify(response), 200
    except:
        return jsonify("invalid Method "), 401
# endpoint para apuntarse a un evento


@api.route('/joinevent/<int:userid>', methods=["POST"])

def post_eventos(userid):
    eventId = request.json.get("id")
             
    user = User.query.filter_by(id = userid).one_or_none()
    event = Evento.query.filter_by(id =eventId).one_or_none()
    user.participant.append(event)
    db.session.commit()

    return jsonify("participant add"),200

@api.route('/crearevento', methods=["POST"])
@jwt_required()
def create_evento():
    identity = get_jwt_identity()
    user = User.query.filter_by(email = identity).one_or_none()     #usuario filtrado
    payment = request.json.get("payment")
    space = request.json.get("space")
    duration = request.json.get("duration")
    agemin = request.json.get("agemin")
    agemax = request.json.get("agemax")
    date = request.json.get("date")
    sport = request.json.get("sport")
    description = request.json.get("description")
    participantmax = request.json.get("participantmax")
    ciudad = request.json.get("ciudad")
    evento = Evento(admin = user.id, ciudad = ciudad, payment = payment, space = space, duration = duration, agemin = agemin, agemax = agemax, date = date, sport = sport, description = description, participantmax = participantmax,estadoEvento = "Abierto")
    user.participant.append(evento)         #usuario metido en la tabla de participantes
    db.session.add(evento)
    db.session.commit()
    return jsonify({"msg":"evento creado"})


#sacar los datos de un evento
@api.route('/lookevent/<int:id>', methods=["GET"])
def get_event(id):
    try:
        event = Evento.query.filter_by(id=id).one_or_none()
        return jsonify(event.serialize()),200
    except:
        return jsonify("invalid Method "), 400
#sacar todos los usuarios
@api.route('/playerEvents/<int:id>', methods=["GET"])
def get_users(id):
    try:
        event = Evento.query.filter_by(id=id).one_or_none()
        eventoUser = User.query.with_parent(event).all()
        response =[x.serializeWithoutParticipant() for x in eventoUser]
        return jsonify(response), 200
    except:
        return jsonify("Data fail")

#echar usuario del evento
@api.route('/exitEvents/<int:id>', methods=["DELETE"])
def delete_usersEvent(id):
    idUser = request.json.get("idUser")
    user = User.query.filter_by(id = idUser).one_or_none()
    event = Evento.query.filter_by(id=id).one_or_none()
    user.participant.remove(event)
    db.session.commit()
    return jsonify("Usuario expulsado")





@api.route('/Userdataparticipant', methods=["GET"])
@jwt_required()
def get_userdataParticipant():
    try:
        identity = get_jwt_identity()       
        user = User.query.filter_by(email = identity).one_or_none() 
        userpar = user.participant
        response =[x.serialize() for x in userpar] 
        return jsonify(response),200
    except:
        return jsonify( "Data fail"),400

#usuario hace peticion para unirse al evento
@api.route('/peticionUnion/<int:iduser>/<int:idevent>', methods=["POST"])
def hacerpeticion(iduser,idevent):
    usuario = User.query.get(iduser)
    evento = Evento.query.get(idevent)
    peticion = Association(user_id = usuario.id, event_id = evento.id, peticion = "Pendiente")
    usuario.eventospendientes.append(peticion)
    evento.usuariospendientes.append(peticion)
    db.session.commit()
    return jsonify("peticion realizada con exito"),200

#mostrar eventos pendientes de un usuario
@api.route('/mostrareventospendientes/<int:iduser>', methods=["GET"])
def mostrareventospendientes(iduser):
    eventoUser = Association.query.filter_by(user_id = iduser).all()
    pendientes = list(filter(lambda x : x.peticion == "Pendiente", eventoUser))
    data = [x.serialize() for x in pendientes]
    eventodata = list(map(lambda x:Evento.query.get(x["event_id"]),data))
    eventos = [x.serialize() for x in eventodata]
    return jsonify(eventos),200

#mostrar usuarios pendientes de un evento
@api.route('/mostrarusuariospendientes/<int:idevento>', methods=["GET"])
def mostrarusuariospendientes(idevento):
    eventoUser = Association.query.filter_by(event_id = idevento).all()
    pendientes = list(filter(lambda x : x.peticion == "Pendiente", eventoUser))
    data = [x.serialize() for x in pendientes]
    userdata = list(map(lambda x:User.query.get(x["user_id"]),data))
    usuarios = [x.serializeWithoutParticipant() for x in userdata]
    return jsonify(usuarios),200

@api.route('/administrasusuarios/<int:idevento>/<int:iduser>', methods=["DELETE"])
def adminusers(idevento,iduser):
    evento = Evento.query.get(idevento)
    user = User.query.get(iduser)
    association = Association.query.filter_by(user_id = iduser,event_id = idevento).first()
    db.session.delete(association)
    db.session.commit()
    
    return jsonify("response")

    

@api.route('/modificarevento', methods=["PUT"])
def modificar_evento():
    eventoNew = request.json.get("evento")
    joder = eventoNew["id"]
    eventoOld = Evento.query.filter_by(id = joder).one_or_none()
    # eventoOld(ciudad = eventoNew["ciudad"], payment = eventoNew["payment"], space = eventoNew["space"], duration = eventoNew["duration"], agemin = eventoNew["agemin"], agemax = eventoNew["agemax"], date = eventoNew["date"], sport = eventoNew["sport"], description = eventoNew["description"], participantmax = eventoNew["participantmax"], estadoEvento = eventoNew["estadoEvento"] )
    
    if eventoNew["ciudad"]:
        eventoOld.ciudad = eventoNew["ciudad"]
    if eventoNew["payment"]:
        eventoOld.payment = eventoNew["payment"]
    if eventoNew["space"]:
        eventoOld.space = eventoNew["space"]
    if eventoNew["duration"]:
        eventoOld.duration = eventoNew["duration"]
    if eventoNew["agemin"]:
        eventoOld.agemin = eventoNew["agemin"]
    if eventoNew["agemax"]:
        eventoOld.agemax = eventoNew["agemax"]
    if eventoNew["date"]:
        eventoOld.date = eventoNew["date"]
    if eventoNew["sport"]:
        eventoOld.sport = eventoNew["sport"]
    if eventoNew["description"]:
        eventoOld.description = eventoNew["description"]
    if eventoNew["participantmax"]:
        eventoOld.participantmax = eventoNew["participantmax"]
    if eventoNew["estadoEvento"]:
        eventoOld.estadoEvento = eventoNew["estadoEvento"]
    
    db.session.commit()
    return jsonify({"msg":"evento modificado"})
