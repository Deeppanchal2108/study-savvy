from app.schemas.course_schema import Course, Topic , Page , Quiz , Flashcard , Summary, CourseSkeleton
from langchain.output_parsers import PydanticOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()


parser_course_skeleton=PydanticOutputParser(pydantic_object=CourseSkeleton)
parser_course=PydanticOutputParser(pydantic_object=Course)
parser_topic=PydanticOutputParser(pydantic_object=Topic)
parser_page=PydanticOutputParser(pydantic_object=Page)
parser_quiz=PydanticOutputParser(pydantic_object=Quiz)
parser_flashcard=PydanticOutputParser(pydantic_object=Flashcard)
parser_summary=PydanticOutputParser(pydantic_object=Summary)


course_template = PromptTemplate(
    template="""
You are an expert course designer.  
You will be given:
- A topic name
- A difficulty level (beginner, intermediate, advanced)
- The learner’s prior experience in years with that technology

Based on this, design a course that fits the provided model.  
Adjust the content depth, scope, and total duration based on difficulty and experience.  
Ensure the topics are logically ordered and cover all key learning outcomes.

Topic: {topic}
Difficulty: {difficulty}
Experience (years): {experience}

{format_instruction}
""",
    input_variables=["topic", "difficulty", "experience"],
    partial_variables={"format_instruction": parser_course_skeleton.get_format_instructions()}
)

topic_template = PromptTemplate(
    template="""
You are an expert educator creating structured learning materials.

You will be given:
- A topic title
- The course difficulty
- The learner's prior experience in years

Generate ONLY one topic object that matches the following Pydantic model:
{format_instructions}

**Guidelines:**
- - Each page must have:
    - A descriptive `title` (max 10 words)
    - `content` between 200 and 300 words (enough to explain the concept fully but concisely)
    - Written in clear, instructional language with examples if needed
- Add 3-5 quizzes. Each quiz must have multiple-choice `options` and exactly one correct `answer`.
- Add 3-5 flashcards. Each flashcard must have a `front` (question/term) and `back` (answer/explanation).
- Provide a short but informative `summary` for the topic.
- Do not include unrelated topics or general introduction outside this topic.
- Ensure JSON is valid and follows the schema exactly.

Topic Title: {topic_title}  
Difficulty: {difficulty}  
Experience (years): {experience}
""",
    input_variables=["topic_title", "difficulty", "experience"],
    partial_variables={"format_instructions": parser_topic.get_format_instructions()}
)


def create_course():
    model = ChatGoogleGenerativeAI(model="gemini-2.0-flash")
    prompt=course_template.invoke({"topic":"rust", "difficulty":"hard","experience":"almost 2 months"})
    result = model.invoke(prompt)
    course_data = parser_course_skeleton.parse(result.content)
    return course_data



# the thing is we will loop over each topic given by the create_course nd then ggenerate its part alright 

    
def create_topic(title):
    model = ChatGoogleGenerativeAI(model="gemini-2.0-flash")
    prompt = topic_template.invoke({
        "topic_title": title,
        "difficulty": "hard",
        "experience": "2 month"
    })
    result = model.invoke(prompt)
    topic_data = parser_topic.parse(result.content)
    # topic_json=topic_data.model_dump_json(indent=2)
    return topic_data 

def build_whole_fucking_course():
    course_json=create_course()

    final_topics = []

    for topic in course_json.topics:
        topic_detail = create_topic(topic.title)  
        # print(topic_detail)
        final_topics.append(topic_detail)


    final_course = Course(
        title=course_json.title,
        duration=course_json.duration,
        topics=final_topics
    )  

    print(final_course.model_dump_json(indent=2))


build_whole_fucking_course()
