"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Evento
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

#ENDPOINT PARA OBTENER EL TOKEN EN EL LOGIN
@api.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email = email).first()
    if user is None:
        return jsonify({"msg":"El usuario no existe"}),401
    elif email != user.email or password != user.password:
        return jsonify({"msg": "La contraseña o usuario es incorrecto o no existe"}), 402
        
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

#ENDPOINT PARA OPTENER TODOS LOS EVENTOS

@api.route('/eventos', methods=["GET"])
def get_eventos():

    try:
        response = [x.serialize() for x in Evento.query.all()]
        return jsonify(response), 200
    except:
        return jsonify("invalid Method "), 401

#endpoint para apuntarse a un evento
@api.route('/joinevent', methods=["POST"])
@jwt_required()
def post_eventos():
    eventId = request.json.get("id")
    identity = get_jwt_identity()           #guardar token en un usuario
    user = User.query.filter_by(email = identity).one_or_none()
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
    evento = Evento(admin = user.id, ciudad = ciudad, payment = payment, space = space, duration = duration, agemin = agemin, agemax = agemax, date = date, sport = sport, description = description, participantmax = participantmax)
    user.participant.append(evento)         #usuario metido en la tabla de participantes
    db.session.add(evento)
    db.session.commit()
    return jsonify({"msg":"evento creado"})




@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200