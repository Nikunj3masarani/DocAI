from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.services.db.base import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Text, TIMESTAMP, ARRAY
from sqlalchemy.sql import func


class Prompt(Base):
    __tablename__ = 'prompts'

    prompt_uuid = Column(UUID(as_uuid=True), primary_key=True)
    title = Column(String(255))
    content = Column(Text)
    created_at = Column(TIMESTAMP)
    status = Column(String(50))


class Index(Base):
    __tablename__ = 'indexes'

    index_uuid = Column(UUID(as_uuid=True), primary_key=True)
    title = Column(String(255))
    description = Column(Text)
    created_at = Column(TIMESTAMP)
    created_by = Column(String(255))
    status = Column(String(50))
    index_type = Column(String(50))
    tags = Column(ARRAY(String))
    prompt_uuid = Column(UUID(as_uuid=True), ForeignKey('prompts.prompt_uuid'))
    prompt = relationship("Prompt", back_populates="indexes")
    model = Column(String(255))


class Documents(Base):
    __tablename__ = 'documents'

    document_uuid = Column(String(255), primary_key=True)
    index_uuid = Column(String(255), ForeignKey('indexes.index_uuid'))
    file_name = Column(String(255))
    file_ext = Column(String(255))
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())
    updated_at = Column(TIMESTAMP, server_default=func.current_timestamp())
    upload_status = Column(Integer)
    url = Column(String(255))
    created_by = Column(String(255), server_default='Admin')


Prompt.indexes = relationship("Index", back_populates="prompt")

