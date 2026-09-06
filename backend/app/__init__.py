from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'super-secret-key-change-in-production'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 86400

    db.init_app(app)
    bcrypt.init_app(app)
    jwt = JWTManager(app)
    CORS(app, origins="*")

    from app.routes.auth import auth_bp
    from app.routes.game import game_bp
    from app.routes.recommend import recommend_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(game_bp)
    app.register_blueprint(recommend_bp)

    with app.app_context():
        db.create_all()

    return app
