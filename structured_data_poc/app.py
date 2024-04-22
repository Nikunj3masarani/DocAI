import os
import time

import pandas as pd

from pandasai import Agent
from pandasai.llm import OpenAI
import streamlit as st
import os

os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY')
llm = OpenAI()

st.title("👨‍💻 Chat with your CSV")

st.write("Please upload your CSV file below.")

data = st.file_uploader("Upload a CSV", type=["csv"])


def update_image_path(original_file_path):
    new_file_path = original_file_path.replace('temp_chart.png', f'temp_chart_{time.time()}.png')
    os.rename(original_file_path, new_file_path)
    return new_file_path


def check_response_type(response):
    if isinstance(response, int):
        return 'Int'
    if isinstance(response, str) and '.png' in response and os.path.exists(response):

        return "Image"
    elif isinstance(response, pd.DataFrame):
        return "Df"
    return "Str"


if data:
    df = pd.read_csv(data)
    agent = Agent(df, config={"llm": llm})
    if 'messages' not in st.session_state:
        st.session_state.messages = []

    if query := st.chat_input("Enter your query"):
        for message in st.session_state.messages:

            with st.chat_message(message["role"]):
                content = message['content']
                response_type = check_response_type(content)
                if response_type == 'Image':
                    st.image(content)
                elif response_type == 'Df':
                    st.table(content)
                else:
                    st.markdown(content)

        with st.chat_message(name="user"):
            st.markdown(query)

        st.session_state.messages.append({"role": "user", "content": query})

        with st.chat_message("assistant"):
            text_placeholder = st.empty()
            response = agent.chat(query)
            response_type = check_response_type(response)
            if response_type == 'Image':
                # response = update_image_path(response)
                text_placeholder.image(response)
            elif response_type == 'Df':
                text_placeholder.table(response)
            else:
                text_placeholder.markdown(response)
            st.session_state.messages.append({"role": "assistant", "content": response})
