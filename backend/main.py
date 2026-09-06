from flask import Flask, jsonify
from flask_cors import CORS

from database.database import Base, engine
from models.game_result import GameResult
from routes.results import results_bp

# Create database tables
Base.metadata.create_all(bind=engine)

# Create Flask application
app = Flask(__name__)

# Enable CORS for React frontend
CORS(
    app,
    origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ]
)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Cognitive Gaming API is running"
    })


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy"
    })


# Register routes
app.register_blueprint(results_bp)


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )