"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash,generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, get_jwt, jwt_required
import jwt 
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = '568754'

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['POST'])
def signup():
   try:
        data = request.get_json()
        email = data['email']
        password = data['password']
        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({"message": "User already exists"}), 400
        new_user = User(email=email, password=generate_password_hash(password))
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created"}), 201
   except Exception as e:
        return jsonify({"Msg": "Error creating user", "Error": str(e)}), 500


@api.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  print(data)
  if not data or 'email' not in data or 'password' not in data:
    return jsonify({"message": "Email and Password are required"}), 400
  email = data["email"]
  password = data["password"]
  user=User.query.filter_by(email=email).first()

  if user and check_password_hash(user.password, password):
        token = jwt.encode({'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, app.config['SECRET_KEY'])
        return jsonify({"token": token})
  return jsonify({"message": "Invalid credentials"}), 401
  