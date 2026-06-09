from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Dict
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/site-config", tags=["Site Config"])


@router.get("/", response_model=Dict[str, str])
def get_site_config(db: Session = Depends(get_db)):
    """Returns all config key/value pairs as a flat dict for easy frontend use."""
    rows = db.query(models.SiteConfig).all()
    return {row.key: row.value for row in rows}


@router.post("/", response_model=schemas.SiteConfigResponse)
def upsert_config(config: schemas.SiteConfigCreate, db: Session = Depends(get_db)):
    """Create or update a config key."""
    existing = db.query(models.SiteConfig).filter(models.SiteConfig.key == config.key).first()
    if existing:
        existing.value = config.value
        db.commit()
        db.refresh(existing)
        return existing
    db_config = models.SiteConfig(**config.model_dump())
    db.add(db_config)
    db.commit()
    db.refresh(db_config)
    return db_config


@router.delete("/{key}")
def delete_config(key: str, db: Session = Depends(get_db)):
    db.query(models.SiteConfig).filter(models.SiteConfig.key == key).delete()
    db.commit()
    return {"message": "Deleted"}
