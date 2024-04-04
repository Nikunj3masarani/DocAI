import os
import requests
import logging
logger = logging.getLogger(__name__)
backend_url = os.getenv('BACKEND_URL', 'http://localhost:8080')


def get_all_index():
    all_index = {}
    try:
        response = requests.post(
            url=f"{backend_url}/api/index/list"
        )
        print("RESPONSE", response.status_code, response.text)
        if response and response.status_code == 200:
            all_index = response.json()['payload']
            all_index = {index.get('title'): index.get('index_uuid') for index in all_index}
    except Exception as e:
        print(f"Cannot fetch index list: {e}")

    return all_index


def delete_index(index_id):
    try:
        print("DELETE INDEX", index_id)
        response = requests.delete(
            url=f"{backend_url}/api/index?index_uuid={index_id}"
        )
        if response and response.status_code == 200:
            return True
    except Exception as e:
        print(f"Cannot fetch index list: {e}")
        return False
    return True


def create_index(title, description= ''):
    try:
        data = {
            "title": title,
            "description": description,
        }
        response = requests.post(
            url=f"{backend_url}/api/index", json=data
        )
        if response and response.status_code == 200:
            return True
    except Exception as e:
        print(f"Cannot fetch index list: {e}")
        return False
    return True
