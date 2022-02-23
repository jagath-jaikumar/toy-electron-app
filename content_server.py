from starlette.responses import FileResponse
from fastapi import FastAPI
import uvicorn


app = FastAPI()


@app.get("/")
async def read_index():
    return FileResponse("index.html")


if __name__ == "__main__":
    uvicorn.run(app, port=3000)
