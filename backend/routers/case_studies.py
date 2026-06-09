from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/case-studies", tags=["Case Studies"])


@router.get("/", response_model=List[schemas.CaseStudyResponse])
def get_case_studies(db: Session = Depends(get_db)):
    return db.query(models.CaseStudy).order_by(models.CaseStudy.order_index).all()


@router.post("/", response_model=schemas.CaseStudyResponse)
def create_case_study(case_study: schemas.CaseStudyCreate, db: Session = Depends(get_db)):
    db_cs = models.CaseStudy(**case_study.model_dump())
    db.add(db_cs)
    db.commit()
    db.refresh(db_cs)
    return db_cs


@router.put("/{cs_id}", response_model=schemas.CaseStudyResponse)
def update_case_study(cs_id: int, case_study: schemas.CaseStudyCreate, db: Session = Depends(get_db)):
    db_cs = db.query(models.CaseStudy).filter(models.CaseStudy.id == cs_id).first()
    for key, value in case_study.model_dump().items():
        setattr(db_cs, key, value)
    db.commit()
    db.refresh(db_cs)
    return db_cs


@router.delete("/{cs_id}")
def delete_case_study(cs_id: int, db: Session = Depends(get_db)):
    db.query(models.CaseStudy).filter(models.CaseStudy.id == cs_id).delete()
    db.commit()
    return {"message": "Deleted"}
