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


CREATE TABLE IF NOT EXISTS users (
    user_uuid UUID PRIMARY KEY,
    email VARCHAR(255),
    user_name VARCHAR(255),
    status VARCHAR(100),
    password VARCHAR(255),
    invited_by UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    invited_at TIMESTAMP DEFAULT null,
    foreign key (invited_by) references users(user_uuid)
);


CREATE TABLE IF NOT EXISTS user_password_reset_codes (
    code_uuid UUID PRIMARY KEY,
    user_uuid UUID REFERENCES users(user_uuid),
    reset_code VARCHAR(255)
);
