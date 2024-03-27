import streamlit as st
from apis.index_api_service import get_all_index, create_index, delete_index
from apis.document_api_service import upload_document


def app():

    option = st.selectbox("Select index to populate",
                          options=["Select an option", "Create index", "Delete index", "Index document"])
    if option and option != "Select an option":
        if option == "Create index":
            all_index = get_all_index()
            index_to_create = st.text_input("Enter index name")
            if index_to_create and index_to_create not in list(all_index.keys()):
                create_index_status = create_index(index_to_create)
                if create_index_status:
                    st.success("Index created successfully")
                else:
                    st.error("Error while creating index")
        elif option == "Delete index":
            all_index = get_all_index()
            index_titles = ['Choose Index']+list(all_index.keys())
            index_to_delete = st.selectbox("Select index to delete", options=index_titles)
            if index_to_delete and index_to_delete != 'Choose Index':
                print(all_index, index_to_delete)
                response_status = delete_index(all_index[index_to_delete])
                if response_status:
                    st.success("Index deleted successfully")
                else:
                    st.error("Error while deleting index")
        elif option == "Index document":
            all_index = get_all_index()
            index_titles = ['Choose Index'] + list(all_index.keys())
            selected_index = st.selectbox("Select index to populate", options=index_titles)

            if selected_index and selected_index != 'Choose Index':
                uploaded_files = st.file_uploader("Upload a file", accept_multiple_files=True, type=["pdf", 'docx', 'txt', 'pptx'])
                if uploaded_files:
                    status_code, message = upload_document(uploaded_files, all_index.get(selected_index))

                    if status_code == 200:
                        success_document = message.get('success')
                        failed_documents = message.get('failed')
                        not_supported_documents = message.get('not_allowed')
                        if success_document:
                            st.success(f"Successfully uploaded documents: **{', '.join(success_document)}**")
                        if failed_documents:
                            st.error(f"Error while uploading documents: **{', '.join(failed_documents)}**")
                        if not_supported_documents:
                            st.error(f"Document type are not allowed: **{', '.join(failed_documents)}**")

                    else:
                        st.error(message)
            elif not all_index or len(all_index) == 1:
                st.error('No index found. please create index.')


if __name__ == '__main__':
    app()
