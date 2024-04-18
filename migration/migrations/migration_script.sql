CREATE TABLE IF NOT EXISTS prompts (
    prompt_uuid UUID PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP,
    status VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS models (
    model_uuid UUID PRIMARY KEY,
    display_name VARCHAR(255),
    target_name VARCHAR(255),
    deployment VARCHAR(255),
    max_new_tokens INTEGER,
    description TEXT,
    deployment_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    max_input_tokens INTEGER,
    api_version VARCHAR(255),
    api_key VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS indexes (
    index_uuid UUID PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP,
    created_by VARCHAR(255),
    status VARCHAR(50),
    index_type VARCHAR(50),
    tags TEXT[],
    prompt_uuid UUID REFERENCES prompts(prompt_uuid),
    model_uuid UUID REFERENCES models(model_uuid)
);

CREATE TABLE IF NOT EXISTS documents (
    document_uuid UUID PRIMARY KEY,
    index_uuid UUID REFERENCES indexes(index_uuid),
    file_name VARCHAR(255),
    file_ext VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upload_status INTEGER,
    url VARCHAR(255),
    created_by VARCHAR(255) DEFAULT 'Admin'
);


CREATE TABLE IF NOT EXISTS chat (
    chat_uuid UUID PRIMARY KEY,
    chat_title VARCHAR,
    created_by VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    index_uuid UUID REFERENCES indexes(index_uuid),
    model_uuid UUID REFERENCES models(model_uuid),
    prompt_uuid UUID REFERENCES prompts(prompt_uuid)
);

CREATE TABLE IF NOT EXISTS chat_history (
    message_uuid UUID PRIMARY KEY,
    user_message VARCHAR,
    assistant_message VARCHAR,
    chat_uuid UUID REFERENCES chat(chat_uuid),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    feedback_status INTEGER,
    feedback VARCHAR
);

CREATE TABLE IF NOT EXISTS users (
    user_uuid UUID PRIMARY KEY,
    is_active INTEGER,
    full_name VARCHAR(255),
    image_url TEXT DEFAULT NULL,
    password VARCHAR(255),
    email varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invitations (
    invite_uuid UUID PRIMARY KEY,
    status INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    token TEXT,
    invite_action INTEGER,
    invited_by UUID,
    user_uuid UUID REFERENCES users(user_uuid)
);

CREATE TABLE IF NOT EXISTS index_user_mapping (
      uuid UUID PRIMARY KEY,
      user_uuid UUID REFERENCES users(user_uuid),
      index_uuid UUID REFERENCES indexes(index_uuid),
      role INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

