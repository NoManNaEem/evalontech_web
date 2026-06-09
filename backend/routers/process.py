from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/process-steps", tags=["Process Steps"])


@router.get("/", response_model=List[schemas.ProcessStepResponse])
def get_process_steps(db: Session = Depends(get_db)):
    return db.query(models.ProcessStep).order_by(models.ProcessStep.order_index).all()


@router.post("/", response_model=schemas.ProcessStepResponse)
def create_process_step(step: schemas.ProcessStepCreate, db: Session = Depends(get_db)):
    db_step = models.ProcessStep(**step.model_dump())
    db.add(db_step)
    db.commit()
    db.refresh(db_step)
    return db_step


@router.put("/{step_id}", response_model=schemas.ProcessStepResponse)
def update_process_step(step_id: int, step: schemas.ProcessStepCreate, db: Session = Depends(get_db)):
    db_step = db.query(models.ProcessStep).filter(models.ProcessStep.id == step_id).first()
    for key, value in step.model_dump().items():
        setattr(db_step, key, value)
    db.commit()
    db.refresh(db_step)
    return db_step


@router.delete("/{step_id}")
def delete_process_step(step_id: int, db: Session = Depends(get_db)):
    db.query(models.ProcessStep).filter(models.ProcessStep.id == step_id).delete()
    db.commit()
    return {"message": "Deleted"}
