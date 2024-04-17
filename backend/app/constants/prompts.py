RAG_PROMPT = """
                    Given the following information, answer the question.
                    
                    Context:
                    {% for document in documents %}
                        {{ document.content }}
                    {% endfor %}

                    Question: {{question}}
                    Answer:
                """