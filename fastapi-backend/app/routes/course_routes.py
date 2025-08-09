from fastapi import APIRouter, Query
from app.services.course_generate import build_whole_fucking_course

router = APIRouter(prefix="/courses", tags=["courses"])

@router.get("/")
def create_course(
    topic: str = Query(..., description="Topic to create the course for"),
    difficulty: str = Query(..., description="Difficulty level, e.g. beginner, intermediate, advanced"),
    experience: str = Query(..., description="Experience duration, e.g. '2 months', '1 year'")
):
    """
    Create a course based on topic, difficulty, and experience.
    """
    output_json = build_whole_fucking_course(topic, difficulty, experience)
    return {"output": output_json}
