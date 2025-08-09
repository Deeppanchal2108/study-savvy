from pydantic import BaseModel
from typing import List, Optional

class Page(BaseModel):
    title: str
    content: str
    viewed: Optional[bool] = False


class Quiz(BaseModel):
    question: str
    options: List[str]
    answer: str
    score: Optional[int] = None



class Flashcard(BaseModel):
    front: str
    back: str



class Summary(BaseModel):
    content: str


class Topic(BaseModel):
    title: str
    pages: List[Page]
    quizzes: List[Quiz]
    flashcards: List[Flashcard]
    summary: Optional[Summary] = None


class Course(BaseModel):
    title: str
    duration: int
    topics: List[Topic]



class TopicSkeleton(BaseModel):
    title: str

class CourseSkeleton(BaseModel):
    title: str
    duration: int
    topics: List[TopicSkeleton]