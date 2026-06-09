from pydantic import BaseModel
from typing import Optional, List, Any


# ─── Service ────────────────────────────────────────────────────
class ServiceBase(BaseModel):
    title: str
    description: str
    image_url: Optional[str] = None
    icon_name: Optional[str] = None
    order_index: int = 0

class ServiceCreate(ServiceBase):
    pass

class ServiceResponse(ServiceBase):
    id: int
    class Config:
        from_attributes = True


# ─── Case Study ─────────────────────────────────────────────────
class CaseStudyBase(BaseModel):
    title: str
    category: str
    description: str
    image_url: Optional[str] = None
    stats: Optional[List[Any]] = []
    order_index: int = 0

class CaseStudyCreate(CaseStudyBase):
    pass

class CaseStudyResponse(CaseStudyBase):
    id: int
    class Config:
        from_attributes = True


# ─── Benefit ────────────────────────────────────────────────────
class BenefitBase(BaseModel):
    title: str
    description: str
    icon_name: Optional[str] = None
    order_index: int = 0

class BenefitCreate(BenefitBase):
    pass

class BenefitResponse(BenefitBase):
    id: int
    class Config:
        from_attributes = True


# ─── Process Step ───────────────────────────────────────────────
class ProcessStepBase(BaseModel):
    number: str
    title: str
    description: str
    icon_name: Optional[str] = None
    order_index: int = 0

class ProcessStepCreate(ProcessStepBase):
    pass

class ProcessStepResponse(ProcessStepBase):
    id: int
    class Config:
        from_attributes = True


# ─── Site Config ────────────────────────────────────────────────
class SiteConfigBase(BaseModel):
    key: str
    value: str

class SiteConfigCreate(SiteConfigBase):
    pass

class SiteConfigResponse(SiteConfigBase):
    id: int
    class Config:
        from_attributes = True


# ─── Testimonial ────────────────────────────────────────────────
class TestimonialBase(BaseModel):
    name: str
    role: Optional[str] = None
    company: Optional[str] = None
    avatar_url: Optional[str] = None
    rating: int = 5
    review: str
    is_visible: bool = True

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialResponse(TestimonialBase):
    id: int
    class Config:
        from_attributes = True
