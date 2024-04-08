import enum
import os
from pathlib import Path
from tempfile import gettempdir
from typing import Optional
from pydantic import BaseSettings
from yarl import URL

TEMP_DIR = Path(gettempdir())


class LogLevel(str, enum.Enum):  # noqa: WPS600
    """Possible log levels."""

    NOTSET = "NOTSET"
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    FATAL = "FATAL"


class Settings(BaseSettings):
    """
    Application settings.

    These parameters can be configured
    with environment variables.
    """

    host: str = "127.0.0.1"
    port: int = 8080
    # quantity of workers for uvicorn
    workers_count: int = 1
    # Enable uvicorn reloading
    reload: bool = False

    # Current environment
    environment: str = "dev"

    log_level: LogLevel = LogLevel.DEBUG

    # Variables for the database
    postgres_host: str = "localhost"
    postgres_port: int = 3306
    postgres_user: str = "demo_app"
    postgres_password: str = "demo_app"
    postgres_db: str = "demo_app"
    db_echo: bool = False

    chroma_db_host: str = "localhost"
    chroma_db_port: int = 8091

    embedding_model_path: str = ""

    rank_model_path: str = ""
    es_host_url: str = ""
    jwt_secret_key: str = ""
    jwt_algo: str = "HS256"

    @property
    def db_url(self) -> URL:
        """
        Assemble database URL from settings.

        :return: database URL.
        """
        return URL.build(
            scheme="postgresql+asyncpg",
            host=self.postgres_host,
            port=self.postgres_port,
            user=self.postgres_user,
            password=self.postgres_password,
            path=f"/{self.postgres_db}",
        )

    class Config:
        env_file_encoding = "utf-8"


settings = Settings()
