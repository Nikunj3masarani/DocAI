import streamlit as st

def app():
    st.title("DocAI App - AI-Powered Document Retrieval and Question Answering")

    st.write("""
        This Streamlit application is an AI-powered document retrieval and question answering tool, built using the Haystack framework as the backend.
    
        **Key Features:**
    
        1. **AI-Powered Answers**: The application leverages large language models (LLMs) to generate accurate and contextual answers to your questions, providing you with the most relevant information from the uploaded documents.
    
        2. **Supported File Types**: The application supports a wide range of file formats, including PDF, DOC, DOCX, CSV, Excel, and HTML, allowing you to upload and process a variety of document types.
    
        3. **Scalable Backend**: The application is built on top of the Haystack framework, which provides a scalable and flexible document store and retrieval system, making it suitable for handling large volumes of data.
    
        4. **Easy Navigation and Configurations**: The application features a user-friendly interface with a clear navigation menu, allowing you to easily switch between the different functionalities, such as creating a new index, managing existing indexes, and asking questions.
    
        To get started, simply navigate to the "Create Index" page, upload your documents, and configure the index settings. Once the index is created, you can move to the "Chat" page, select the index, and start asking questions about the content of the uploaded documents.
    
        Enjoy the power of AI-driven document retrieval and question answering with this versatile Streamlit application!
        """)


if __name__ == '__main__':
    app()
