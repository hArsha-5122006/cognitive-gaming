from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User
from app.models.game_result import GameResult

mentor_bp = Blueprint('mentor', __name__, url_prefix='/api/mentor')

@mentor_bp.route('/patients', methods=['GET'])
@jwt_required()
def get_patients():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'mentor':
        return jsonify({'message': 'Only mentors can access this'}), 403
    patients = User.query.filter_by(mentor_id=user_id).all()
    return jsonify([p.to_dict() for p in patients]), 200

@mentor_bp.route('/patient/<int:patient_id>/stats', methods=['GET'])
@jwt_required()
def get_patient_stats(patient_id):
    user_id = get_jwt_identity()
    mentor = User.query.get(user_id)
    if not mentor or mentor.role != 'mentor':
        return jsonify({'message': 'Only mentors can access this'}), 403
    patient = User.query.get(patient_id)
    if not patient or patient.mentor_id != user_id:
        return jsonify({'message': 'Patient not found or not under your care'}), 404
    results = GameResult.query.filter_by(user_id=patient_id).order_by(GameResult.created_at.desc()).all()
    return jsonify([{
        'game_name': r.game_name,
        'score': r.score,
        'accuracy': r.accuracy,
        'stars': r.stars,
        'difficulty': r.difficulty,
        'response_time': r.response_time,
        'created_at': r.created_at.isoformat()
    } for r in results]), 200
