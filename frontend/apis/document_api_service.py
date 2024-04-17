import os
import requests

backend_url = os.getenv('BACKEND_URL', 'http://localhost:8080')


def upload_document(uploaded_files, index_uuid):
    try:
        headers = {
            'accept': 'application/json',
        }

        files = [
            ('documents', (file.name, file.read(), 'application/pdf')) for file in uploaded_files]

        response = requests.post(url=f"{backend_url}/api/documents/upload?index_uuid={index_uuid}",
                                 headers=headers,
                                 files=files)
        output = response.json()
        if response.status_code == 200:
            return 200, response.json().get("payload").get("status")
        return 500, output
    except Exception as e:
        import traceback
        traceback.print_exc()
        return 500, "Error while indexing documents"
