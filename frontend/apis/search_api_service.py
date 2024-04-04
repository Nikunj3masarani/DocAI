import os
import time
import json
import requests

backend_url = os.getenv('BACKEND_URL', 'http://localhost:8080')


def search(index_uuid, query):
    try:
        start_time = time.time()
        url = f"{backend_url}/api/inference/"

        payload = json.dumps(
            {
                "index_uuid": index_uuid,
                "query": query
            }
        )

        with requests.post(url, data=payload, stream=True) as resp:
            text = ""
            for chunk in resp.iter_content(1024):  # or, for line in r.iter_lines():
                decoded_line = chunk.decode('utf-8')
                text += str(decoded_line)
                yield text

        text += f"\n\n **Time taken** {time.time() - start_time}"
        yield text
    except Exception as e:
        print(f"Error generated: {e}")
        yield e
