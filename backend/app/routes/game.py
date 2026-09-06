from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.game_result import GameResult

game_bp = Blueprint('game', __name__, url_prefix='/api/game')

@game_bp.route('/save', methods=['POST'])
@jwt_required()
def save_result():
    data = request.get_json()
    user_id = get_jwt_identity()
    result = GameResult(
        user_id=user_id,
        game_name=data['game_name'],
        score=data['score'],
        accuracy=data['accuracy'],
        stars=data['stars'],
        difficulty=data['difficulty'],
        response_time=data.get('response_time')
    )
    db.session.add(result)
    db.session.commit()
    return jsonify({'message': 'Result saved'}), 201

@game_bp.route('/history', methods=['GET'])
@jwt_required()
def get_history():
    user_id = get_jwt_identity()
    results = GameResult.query.filter_by(user_id=user_id).order_by(GameResult.created_at.desc()).all()
    return jsonify([{
        'game_name': r.game_name,
        'score': r.score,
        'accuracy': r.accuracy,
        'stars': r.stars,
        'difficulty': r.difficulty,
        'response_time': r.response_time,
        'created_at': r.created_at.isoformat()
    } for r in results]), 200
