import uvicorn


def main():
    uvicorn.run(
        "app:get_app",
        workers=1,
        host='localhost',
        port=8053,
        reload=True,
        factory=True,
    )


if __name__ == "__main__":
    main()
