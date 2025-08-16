from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from app.services.course_generate import build_whole_fucking_course

router = APIRouter()

@router.get("/courses/")
async def create_course(request: Request):
    """
    Endpoint to generate a full course based on query parameters.
    Expected query params:
    - title
    - description
    - knowledge
    - difficulty
    - experience
    """
    # Extract query params
    title = request.query_params.get("title")
    description = request.query_params.get("description")
    knowledge = request.query_params.get("knowledge", "beginner")
    difficulty = request.query_params.get("difficulty", "beginner")
    experience = request.query_params.get("experience", "0")

    print(f"REQ CAME: {title} {description} {knowledge} {difficulty} {experience}")

    try:
        output_json = build_whole_fucking_course(
            course_title=title,       
            description=description,
            knowledge=knowledge,
            difficulty=difficulty,
            experience=experience,
        )

        return JSONResponse(content={"course": output_json})

    except Exception as e:
        print(f"ERROR: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)
