🚧 Under Active Development 🚧

# DocAI- A generative AI app with haystack framework.

![App Image](resources/OIG2.eCHkxNCFo2UPskuoK29j.jpg)

RAG application powered by Haystack AI, designed to revolutionize question-answering processes. Harnessing advanced technology, our platform seamlessly integrates with Haystack AI to deliver unparalleled accuracy and efficiency in retrieving and generating responses to a wide array of queries. Whether you're seeking insights into complex topics or quick answers to pressing questions, our RAG application is your go-to solution. Experience the future of information retrieval and generation with our user-friendly interface and cutting-edge algorithms. Say goodbye to tedious searches and hello to instant, reliable answers with our RAG application.


## Key Features 🎯

- **Fast and Efficient**: Designed with speed and efficiency at its core. DocAI ensures rapid access to your data.
- **Secure**: Your data, your control. Always.
- **OS Compatible**: Ubuntu 22 or newer.
- **File Compatibility**: PDF

### Server Specifications
Below are the specifications for the server environment
- RAM: 8 GB
- CPU: 4 core
- Storage: 50 GB

### Prerequisites 📋

Ensure you have the following installed:

- Docker
- Docker Compose

### Installation 💽
    
- **Step 1**: Clone the repository:

  ```bash
  git clone https://github.com/Nikunj3masarani/DocAI && cd DocAI
  ```


- **Step 2**: Copy the `sample.env` files

  ```bash
  cp sample.env .env
  ```

- **Step 3**: Update the `.env` files

  ```bash
  vim .env # or emacs or vscode or nano
  ```
- **Step 4** Create a volume dictionary for elastic search
  
  ```bash 
  mkdir elasticsearch_data
   ```
  
- **Step 5** Create a volume dictionary for backend and download models

  ```bash
  mkdir backend_models && cd backend_models
  ```

- Download Sentence Transformer Model from huggingface

  ```bash
  git lsf clone https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2
  ```

- Download Rank Model from huggingface

  ```bash
  git lsf clone https://huggingface.co/cross-encoder/ms-marco-MiniLM-L-12-v2
  ```


- **Step 6** Start the application with docker 
    ```bash
    docker-compose pull
    docker-compose up
     ```


## License 📄

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details

