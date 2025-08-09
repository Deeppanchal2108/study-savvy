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




def create_course():
    model = ChatGoogleGenerativeAI(model="gemini-2.0-flash")
    prompt=course_template.invoke({"topic":"rust", "difficulty":"hard","experience":"almost 2 months"})
    result = model.invoke(prompt)
    print(result.content)
    
create_course()