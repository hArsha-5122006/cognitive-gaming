from flask import Blueprint, jsonify, request
from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.game_result import GameResult


# Create Flask Blueprint
results_bp = Blueprint(
    "results",
    __name__,
    url_prefix="/results"
)


# Save game result
@results_bp.route("/", methods=["POST"])
def save_game_result():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No data provided"
        }), 400

    db: Session = SessionLocal()

    try:
        new_result = GameResult(
            game_type=data.get("game_type"),
            score=data.get("score"),
            accuracy=data.get("accuracy"),
            mistakes=data.get("mistakes"),
            attempts=data.get("attempts"),
            completion_time=data.get("completion_time"),
            reaction_time=data.get("reaction_time"),
            difficulty=data.get("difficulty")
        )

        db.add(new_result)
        db.commit()
        db.refresh(new_result)

        return jsonify({
            "message": "Game result saved successfully",
            "result_id": new_result.id
        }), 201

    except Exception as e:
        db.rollback()

        return jsonify({
            "error": str(e)
        }), 500

    finally:
        db.close()


# Get all game results
@results_bp.route("/", methods=["GET"])
def get_game_results():

    db: Session = SessionLocal()

    try:
        results = (
            db.query(GameResult)
            .order_by(GameResult.created_at.desc())
            .all()
        )

        return jsonify([
            {
                "id": result.id,
                "game_type": result.game_type,
                "score": result.score,
                "accuracy": result.accuracy,
                "mistakes": result.mistakes,
                "attempts": result.attempts,
                "completion_time": result.completion_time,
                "reaction_time": result.reaction_time,
                "difficulty": result.difficulty,
                "created_at": result.created_at.isoformat()
                if result.created_at else None
            }
            for result in results
        ])

    finally:
        db.close()