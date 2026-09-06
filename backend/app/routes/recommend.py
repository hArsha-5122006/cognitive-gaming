from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User
from app.models.game_result import GameResult

recommend_bp = Blueprint('recommend', __name__, url_prefix='/api/recommend')

GAME_SKILLS = {
    'Memory Match': 'Memory',
    'Sequence Recall': 'Memory',
    'Digit Span': 'Memory',
    'N‑Back': 'Working Memory',
    'Pattern Memory': 'Working Memory',
    'Target Attention': 'Attention',
    'Stroop Effect': 'Attention',
    'Flanker Task': 'Attention',
    'Visual Search': 'Visual Search',
    'Choice Reaction': 'Processing Speed',
    'Trail Making': 'Processing Speed',
    'Card Sorting': 'Flexibility',
    'Mental Rotation': 'Spatial',
}

@recommend_bp.route('/skills', methods=['GET'])
@jwt_required()
def get_skill_performance():
    user_id = get_jwt_identity()
    results = GameResult.query.filter_by(user_id=user_id).all()
    if not results:
        return jsonify({'message': 'No data yet. Play some games!'}), 200

    skill_scores = {}
    for r in results:
        skill = GAME_SKILLS.get(r.game_name, 'Other')
        if skill not in skill_scores:
            skill_scores[skill] = {'sum': 0, 'count': 0}
        skill_scores[skill]['sum'] += r.score
        skill_scores[skill]['count'] += 1

    averages = {s: data['sum'] / data['count'] for s, data in skill_scores.items()}
    return jsonify(averages), 200

@recommend_bp.route('/daily', methods=['GET'])
@jwt_required()
def get_daily_routine():
    user_id = get_jwt_identity()
    results = GameResult.query.filter_by(user_id=user_id).all()
    if not results:
        default_games = ['Memory Match', 'Target Attention', 'Choice Reaction']
        return jsonify({'routine': default_games, 'message': 'Start with these classic games.'}), 200

    skill_scores = {}
    for r in results:
        skill = GAME_SKILLS.get(r.game_name, 'Other')
        if skill not in skill_scores:
            skill_scores[skill] = {'sum': 0, 'count': 0}
        skill_scores[skill]['sum'] += r.score
        skill_scores[skill]['count'] += 1
    averages = {s: data['sum'] / data['count'] for s, data in skill_scores.items()}

    if averages:
        weakest_skill = min(averages, key=averages.get)
        strongest_skill = max(averages, key=averages.get)
    else:
        weakest_skill = 'Memory'
        strongest_skill = 'Memory'

    skill_to_game = {
        'Memory': 'Memory Match',
        'Working Memory': 'N‑Back',
        'Attention': 'Target Attention',
        'Visual Search': 'Visual Search',
        'Processing Speed': 'Choice Reaction',
        'Flexibility': 'Card Sorting',
        'Spatial': 'Mental Rotation',
    }
    weak_game = skill_to_game.get(weakest_skill, 'Memory Match')
    strong_game = skill_to_game.get(strongest_skill, 'Memory Match')

    all_games = list(skill_to_game.values())
    routine = [weak_game, strong_game]
    for g in all_games:
        if g not in routine:
            routine.append(g)
            break
    routine = routine[:3]

    return jsonify({'routine': routine, 'weakest_skill': weakest_skill, 'strongest_skill': strongest_skill}), 200
