from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/benefits", tags=["Benefits"])


@router.get("/", response_model=List[schemas.BenefitResponse])
def get_benefits(db: Session = Depends(get_db)):
    return db.query(models.Benefit).order_by(models.Benefit.order_index).all()


@router.post("/", response_model=schemas.BenefitResponse)
def create_benefit(benefit: schemas.BenefitCreate, db: Session = Depends(get_db)):
    db_benefit = models.Benefit(**benefit.model_dump())
    db.add(db_benefit)
    db.commit()
    db.refresh(db_benefit)
    return db_benefit


@router.put("/{benefit_id}", response_model=schemas.BenefitResponse)
def update_benefit(benefit_id: int, benefit: schemas.BenefitCreate, db: Session = Depends(get_db)):
    db_benefit = db.query(models.Benefit).filter(models.Benefit.id == benefit_id).first()
    for key, value in benefit.model_dump().items():
        setattr(db_benefit, key, value)
    db.commit()
    db.refresh(db_benefit)
    return db_benefit


@router.delete("/{benefit_id}")
def delete_benefit(benefit_id: int, db: Session = Depends(get_db)):
    db.query(models.Benefit).filter(models.Benefit.id == benefit_id).delete()
    db.commit()
    return {"message": "Deleted"}
