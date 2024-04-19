from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.services.db.base import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime, ARRAY
from sqlalchemy.sql import func
from datetime import datetime


class Prompt(Base):
    __tablename__ = 'prompts'

    prompt_uuid = Column(UUID(as_uuid=True), primary_key=True)
    title = Column(String(255))
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50))


class Index(Base):
    __tablename__ = 'indexes'

    index_uuid = Column(UUID(as_uuid=True), primary_key=True)
    title = Column(String(255))
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    created_by = Column(String(255))
    status = Column(String(50))
    index_type = Column(String(50))
    tags = Column(ARRAY(String))
    prompt_uuid = Column(UUID(as_uuid=True), ForeignKey('prompts.prompt_uuid'))
    model_uuid = Column(UUID(as_uuid=True), ForeignKey('models.model_uuid'))


class Documents(Base):
    __tablename__ = 'documents'

    document_uuid = Column(UUID(as_uuid=True), primary_key=True)
    index_uuid = Column(UUID(as_uuid=True), ForeignKey('indexes.index_uuid'))
    source_id = Column(String(255))
    file_name = Column(String(255))
    file_ext = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    upload_status = Column(Integer)
    url = Column(String(255))
    created_by = Column(String(255), default='Admin')


class Model(Base):
    __tablename__ = 'models'

    model_uuid = Column(UUID(as_uuid=True), primary_key=True)
    display_name = Column(String(255))
    target_name = Column(String(255))
    deployment = Column(String(255))
    max_new_tokens = Column(Integer)
    description = Column(Text)
    deployment_url = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    max_input_tokens = Column(Integer)
    api_version = Column(String(255))
    api_key = Column(String(255))


class Chat(Base):
    __tablename__ = 'chat'

    chat_uuid = Column(UUID(as_uuid=True), primary_key=True)
    chat_title = Column(String)
    created_by = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    index_uuid = Column(UUID(as_uuid=True), ForeignKey('indexes.index_uuid'))
    model_uuid = Column(UUID(as_uuid=True), ForeignKey('models.model_uuid'))
    prompt_uuid = Column(UUID(as_uuid=True), ForeignKey('prompts.prompt_uuid'), nullable=True)
    chat_history = relationship("ChatHistory", cascade="delete", backref="chat")


class ChatHistory(Base):
    __tablename__ = 'chat_history'

    message_uuid = Column(UUID(as_uuid=True), primary_key=True)
    user_message = Column(String)
    assistant_message = Column(String)
    chat_uuid = Column(UUID(as_uuid=True), ForeignKey('chat.chat_uuid'))
    created_at = Column(DateTime, default=datetime.utcnow)
    feedback_status = Column(Integer)
    feedback = Column(String)


class Invitation(Base):
    __tablename__ = 'invitations'

    invite_uuid = Column(UUID(as_uuid=True), primary_key=True)
    status = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    token = Column(Text)
    invite_action = Column(Integer)
    invited_by = Column(UUID(as_uuid=True))
    user_uuid = Column(UUID(as_uuid=True), ForeignKey('users.user_uuid'))


class User(Base):
    __tablename__ = 'users'

    user_uuid = Column(UUID(as_uuid=True), primary_key=True)
    is_active = Column(Integer)
    full_name = Column(String(255))
    image_url = Column(Text, default=None)
    password = Column(String(255))
    email = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)


class IndexUserMapping(Base):
    __tablename__ = 'index_user_mapping'

    uuid = Column(UUID(as_uuid=True), primary_key=True)
    user_uuid = Column(UUID(as_uuid=True), nullable=False)
    index_uuid = Column(UUID(as_uuid=True), nullable=False)
    role = Column(Integer, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
