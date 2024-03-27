CREATE TABLE IF NOT EXISTS prompts (
    prompt_uuid UUID PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP,
    status VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS indexes (
    index_uuid UUID PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP,
    created_by VARCHAR(255),
    status VARCHAR(50),
    index_type VARCHAR(50),
    tags VARCHAR[],
    prompt_uuid UUID REFERENCES prompts(prompt_uuid),
    model VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS documents (
    document_uuid VARCHAR(255) PRIMARY KEY,
    index_uuid VARCHAR(255),
    file_name VARCHAR(255),
    file_ext VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upload_status INT,
    url VARCHAR(255),
    created_by VARCHAR(255) DEFAULT 'Admin'
);

