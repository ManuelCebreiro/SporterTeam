"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import cloudinary
import cloudinary.uploader

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



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
@api.route('/upload', methods=['POST'])
@jwt_required()
def handle_upload():
    identity = get_jwt_identity()     #pide el token
    user1 = User.query.filter_by(email = identity).one_or_none()
    result = cloudinary.uploader.upload(request.files['profile_image'])

    user1.profile_image_url = result['secure_url']
    db.session.add(user1)
    db.session.commit()
    
    return jsonify(result), 200