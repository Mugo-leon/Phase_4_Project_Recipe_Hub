from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    recipes = db.relationship('Recipe', backref='author', lazy=True)
    favorite_recipes = db.relationship('FavoriteRecipe', backref='user', lazy=True)