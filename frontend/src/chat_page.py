import streamlit as st
import uuid
from apis.index_api_service import get_all_index
from apis.search_api_service import search


def app():
    all_index = get_all_index()
    all_index_title = ['Choose Index'] + list(all_index.keys())
    index_to_search = st.selectbox("Select index for searching", options=all_index_title)

    if index_to_search and index_to_search != "Choose Index":
        if index_to_search != st.session_state.get('index'):
            st.session_state['index'] = index_to_search
            st.session_state.messages = []
            st.session_state.chat_id = str(uuid.uuid4())

        if query := st.chat_input("Enter your query"):

            for message in st.session_state.messages:
                with st.chat_message(message["role"]):
                    st.markdown(message["content"])

            with st.chat_message(name="user"):
                st.markdown(query)

            st.session_state.messages.append({"role": "user", "content": query})

            with st.chat_message("assistant"):
                text_placeholder = st.empty()
                final_text = None
                response_generator = search(all_index.get(index_to_search), query)
                for text in response_generator:
                    text_placeholder.markdown(text)
                    final_text = text

                st.session_state.messages.append({"role": "assistant", "content": final_text})


if __name__ == '__main__':
    app()
