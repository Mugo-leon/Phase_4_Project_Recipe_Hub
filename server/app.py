from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Recipe, FavoriteRecipe

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "https://nine-project-recipe-hub.onrender.com"}})
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key_here'
    
    db.init_app(app)
    migrate = Migrate(app, db)
    
    return app

app = create_app()

@app.route('/get_user_recipes/<username>', methods=['GET'])
def get_user_recipes(username):
    try:
        user = User.query.filter_by(username=username).first()
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        recipes = Recipe.query.filter_by(user_id=user.id).all()

        if not recipes:
            return jsonify({'message': 'No recipes found for this user'}), 404

        output = []
        for recipe in recipes:
            recipe_data = {
                'id': recipe.id,
                'name': recipe.name,
                'description': recipe.description,
                'user_id': recipe.user_id
            }
            output.append(recipe_data)

        return jsonify({'recipes': output}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error fetching user recipes'}), 500
    
@app.route('/')
def index():
    return 'WELCOME TO MY TASTY WORLD'

@app.route('/get_recipe/<int:user_id>/<int:recipe_id>', methods=['GET'])
def get_recipe(user_id, recipe_id):
    try:
        recipe = Recipe.query.filter_by(id=recipe_id, user_id=user_id).first()

        if not recipe:
            return jsonify({'message': 'Recipe not found'}), 404

        recipe_data = {
            'id': recipe.id,
            'name': recipe.name,
            'description': recipe.description,
            'user_id': recipe.user_id
        }

        return jsonify(recipe_data), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error fetching recipe details'}), 500
    
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

    if user and user.password == password:  # Implement password checking
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    output = []
    for user in users:
        user_data = {'id': user.id, 'username': user.username}
        output.append(user_data)
    return jsonify({'users': output}), 200

@app.route('/create_recipe', methods=['POST'])
def create_recipe():
    data = request.json
    user_id = session.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'User ID not provided in session'}), 400

    name = data.get('name')
    description = data.get('description')

    if not name or not description:
        return jsonify({'error': 'Name or description missing in request'}), 400

    new_recipe = Recipe(name=name, description=description, user_id=user_id)
    db.session.add(new_recipe)
    db.session.commit()

    return jsonify({'message': 'Recipe created successfully'}), 201

@app.route('/recipes', methods=['GET'])
def get_recipes():
    recipes = Recipe.query.all()
    output = []
    for recipe in recipes:
        recipe_data = {'id': recipe.id, 'name': recipe.name, 'description': recipe.description, 'user_id': recipe.user_id}
        output.append(recipe_data)
    return jsonify({'recipes': output}), 200

@app.route('/edit_recipe/<int:recipe_id>', methods=['PUT'])
def edit_recipe(recipe_id):
    data = request.json
    name = data.get('name')
    description = data.get('description')
    
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({'error': 'User ID not provided in session'}), 400

    recipe = Recipe.query.filter_by(id=recipe_id, user_id=user_id).first()

    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404

    recipe.name = name
    recipe.description = description
    db.session.commit()

    return jsonify({'message': 'Recipe updated successfully'}), 200

@app.route('/delete_recipe/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404

    db.session.delete(recipe)
    db.session.commit()

    return jsonify({'message': 'Recipe deleted successfully'}), 200

@app.route('/favorite_recipe/<int:recipe_id>', methods=['POST'])
def favorite_recipe(recipe_id):
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({'error': 'User ID not provided in session'}), 400

    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return jsonify({'error': 'Recipe not found'}), 404

    existing_favorite = FavoriteRecipe.query.filter_by(user_id=user_id, recipe_id=recipe_id).first()
    if existing_favorite:
        return jsonify({'message': 'Recipe already favorited'}), 200

    new_favorite = FavoriteRecipe(user_id=user_id, recipe_id=recipe_id)
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify({'message': 'Recipe favorited successfully'}), 201
    
@app.route('/favorite_recipes', methods=['GET'])
def get_favorite_recipes():
    try:
        user_id = session.get('user_id')

        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404

        favorite_recipes = user.favorite_recipes
        if not favorite_recipes:
            return jsonify({'message': 'No favorite recipes found for this user'}), 404

        favorite_recipe_details = []
        for fav_recipe in favorite_recipes:
            recipe = Recipe.query.get(fav_recipe.recipe_id)
            if recipe:
                recipe_data = {
                    'id': recipe.id,
                    'name': recipe.name,
                    'description': recipe.description,
                    'user_id': recipe.user_id
                }
                favorite_recipe_details.append(recipe_data)

        return jsonify({'favorite_recipes': favorite_recipe_details}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error fetching favorite recipes'}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5555, debug=True)
