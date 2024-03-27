import streamlit as st
from src.index_page import app as index_page
from src.chat_page import app as chat_page
from src.home_page import app as home_page

st.set_page_config(page_title="DocAI", page_icon=':robot:', layout="wide")


def main():
    PAGES = {
        "Home": home_page,
        "Index": index_page,
        "Chat": chat_page,
    }

    st.sidebar.title("Select Page")
    selection = st.sidebar.radio("Go to", list(PAGES.keys()))

    page = PAGES[selection]
    page()


if __name__ == '__main__':
    main()
