from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Recipe, FavoriteRecipe

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key_here'  
    CORS(app)
    db.init_app(app)
    migrate = Migrate(app, db)
    
    return app

app = create_app()

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.json
    if not data:
        return jsonify({'message': 'Invalid request'}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        return jsonify({'message': 'Invalid request'}), 400

    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.password == password:
        # Set user_id in session
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401



if __name__ == '__main__':
    app.run(debug=True, port=5555)