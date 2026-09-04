from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from models.game_result import GameResult


router = APIRouter(
    prefix="/results",
    tags=["Game Results"]
)


@router.post("/")
def save_game_result(
    result: dict,
    db: Session = Depends(get_db)
):
    new_result = GameResult(
        game_type=result.get("game_type"),
        score=result.get("score"),
        accuracy=result.get("accuracy"),
        mistakes=result.get("mistakes"),
        attempts=result.get("attempts"),
        completion_time=result.get("completion_time"),
        reaction_time=result.get("reaction_time"),
        difficulty=result.get("difficulty")
    )

    db.add(new_result)
    db.commit()
    db.refresh(new_result)

    return {
        "message": "Game result saved successfully",
        "result_id": new_result.id
    }


@router.get("/")
def get_game_results(
    db: Session = Depends(get_db)
):
    results = (
        db.query(GameResult)
        .order_by(GameResult.created_at.desc())
        .all()
    )

    return [
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
            "created_at": result.created_at
        }
        for result in results
    ]