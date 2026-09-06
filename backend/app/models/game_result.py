from app import db
from datetime import datetime

class GameResult(db.Model):
    __tablename__ = 'game_results'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_name = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    accuracy = db.Column(db.Integer, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    response_time = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('results', lazy=True))
