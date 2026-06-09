from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from database import engine, Base
import models  # noqa: F401 — ensures all models are registered before create_all

from routers import services, case_studies, benefits, process, config

load_dotenv()

# Create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Evalontech API",
    description="Backend API for the Evalontech website",
    version="1.0.0",
)

# ─── CORS ───────────────────────────────────────────────────────
# Allows the React dev server (localhost:5173) to call this API
origins = [
    os.getenv("FRONTEND_ORIGIN", "http://localhost:5173"),
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ────────────────────────────────────────────────────
app.include_router(services.router)
app.include_router(case_studies.router)
app.include_router(benefits.router)
app.include_router(process.router)
app.include_router(config.router)


@app.get("/", tags=["Health"])
def root():
    return {"status": "ok", "message": "Evalontech API is running"}
