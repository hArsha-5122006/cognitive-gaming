from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime

from database.database import Base


class GameResult(Base):
    __tablename__ = "game_results"

    id = Column(Integer, primary_key=True, index=True)

    game_type = Column(String, nullable=False)

    score = Column(Integer, nullable=False)

    accuracy = Column(Float, nullable=False)

    mistakes = Column(Integer, nullable=False)

    attempts = Column(Integer, nullable=False)

    completion_time = Column(Float, nullable=False)

    reaction_time = Column(Float, nullable=True)

    difficulty = Column(Integer, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )