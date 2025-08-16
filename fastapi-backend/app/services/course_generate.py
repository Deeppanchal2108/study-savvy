from app.schemas.course_schema import Course, Topic, CourseSkeleton
from langchain.output_parsers import PydanticOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()

# Parsers
parser_course_skeleton = PydanticOutputParser(pydantic_object=CourseSkeleton)
parser_course = PydanticOutputParser(pydantic_object=Course)
parser_topic = PydanticOutputParser(pydantic_object=Topic)

# Prompt for course skeleton
course_template = PromptTemplate(
    template="""
You are an expert course designer.  
You will be given:
- A course title
- A difficulty level (beginner, intermediate, advanced)
- The learner’s prior experience in years with that technology
- The learner’s prior knowledge background

Based on this, design a course that fits the provided Pydantic model exactly.

Course Title: {course_title}
Description: {description}
Knowledge: {knowledge}
Difficulty: {difficulty}
Experience (years): {experience}

{format_instruction}
""",
    input_variables=["course_title", "description", "knowledge", "difficulty", "experience"],
    partial_variables={"format_instruction": parser_course_skeleton.get_format_instructions()}
)

# Prompt for single topic
topic_template = PromptTemplate(
    template="""
You are an expert educator creating structured learning materials.

You will be given:
- A topic title
- The course description
- The learner's knowledge
- The course difficulty
- The learner's prior experience

Generate ONLY one topic object that matches the following schema:
{format_instructions}

Topic Title: {topic_title}  
Description: {description}  
Knowledge: {knowledge}  
Difficulty: {difficulty}  
Experience: {experience}
""",
    input_variables=["topic_title", "description", "knowledge", "difficulty", "experience"],
    partial_variables={"format_instructions": parser_topic.get_format_instructions()},
)


# Create course skeleton
def create_course(course_title: str, description: str, knowledge: str, difficulty: str, experience: str):
    model = ChatGoogleGenerativeAI(model="gemini-2.0-flash")
    prompt = course_template.invoke({
        "course_title": course_title,
        "description": description,
        "knowledge": knowledge,
        "difficulty": difficulty,
        "experience": experience,
    })
    result = model.invoke(prompt)
    course_data = parser_course_skeleton.parse(result.content)
    return course_data


# Create topic content
def create_topic(topic_title: str, description: str, knowledge: str, difficulty: str, experience: str):
    model = ChatGoogleGenerativeAI(model="gemini-2.0-flash")
    prompt = topic_template.invoke({
        "topic_title": topic_title,
        "description": description,
        "knowledge": knowledge,
        "difficulty": difficulty,
        "experience": experience,
    })
    result = model.invoke(prompt)
    topic_data = parser_topic.parse(result.content)
    return topic_data


# Build full course
def build_whole_fucking_course(course_title: str, description: str, knowledge: str, difficulty: str, experience: str):
    course_json = create_course(
        course_title=course_title,
        description=description,
        knowledge=knowledge,
        difficulty=difficulty,
        experience=experience,
    )

    final_topics = []
    for topic in course_json.topics:
        topic_detail = create_topic(
            topic_title=topic.title,  # ✅ now clearly topic-level
            description=description,
            knowledge=knowledge,
            difficulty=difficulty,
            experience=experience,
        )
        final_topics.append(topic_detail)

    final_course = Course(
        title=course_json.title,
        duration=course_json.duration,
        topics=final_topics,
    )

    return final_course.model_dump_json(indent=2)
