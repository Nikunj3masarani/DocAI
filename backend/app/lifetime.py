from typing import Awaitable, Callable
from fastapi import FastAPI
from app.services.chroma.lifetime import init_chroma, shutdown_chroma
from app.settings import settings
from asyncio import current_task
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_scoped_session,
    create_async_engine,
)
from sqlalchemy.orm import sessionmaker
from app.services.db.base import Base
from app.services.embeddings.lifetime import init_embeddings, remove_embeddings
from app.services.es.lifetime import init_es_client, shutdown_es_client


def _setup_db(app: FastAPI) -> None:  # pragma: no cover
    """
    Creates connection to the database.

    This function creates SQLAlchemy engine instance,
    session_factory for creating sessions
    and stores them in the application's state property.

    :param app: fastAPI application.
    """

    engine = create_async_engine(str(settings.db_url), echo=settings.db_echo)

    session_factory = async_scoped_session(
        sessionmaker(
            engine,
            expire_on_commit=False,
            class_=AsyncSession,
        ),
        scopefunc=current_task,
    )
    app.state.db_engine = engine
    app.state.db_session_factory = session_factory


def register_startup_event(
        app: FastAPI,
) -> Callable[[], Awaitable[None]]:  # pragma: no cover
    """
    Actions to run on application startup.

    This function uses fastAPI app to store data
    inthe state, such as db_engine.

    :param app: the fastAPI application.
    :return: function that actually performs actions.
    """

    @app.on_event("startup")
    async def _startup() -> None:  # noqa: WPS430
        _setup_db(app)
        # init_chroma(app)
        init_embeddings(app)
        init_es_client(app)
        # noqa: WPS420

    return _startup


def register_shutdown_event(
        app: FastAPI,
) -> Callable[[], Awaitable[None]]:  # pragma: no cover
    """
    Actions to run on application's shutdown.

    :param app: fastAPI application.
    :return: function that actually performs actions.
    """

    @app.on_event("shutdown")
    async def _shutdown() -> None:  # noqa: WPS430
        await app.state.db_engine.dispose()
        # await shutdown_chroma(app)
        remove_embeddings(app)
        await shutdown_es_client(app)
        # noqa: WPS420

    return _shutdown
