from sqlalchemy import Column, Integer, String, Boolean, JSON, Text
from database import Base


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String, nullable=True)
    icon_name = Column(String, nullable=True)
    order_index = Column(Integer, default=0)


class CaseStudy(Base):
    __tablename__ = "case_studies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String, nullable=True)
    stats = Column(JSON, default=list)   # e.g. [{"label": "Efficiency", "value": "+40%"}]
    order_index = Column(Integer, default=0)


class Benefit(Base):
    __tablename__ = "benefits"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    icon_name = Column(String, nullable=True)
    order_index = Column(Integer, default=0)


class ProcessStep(Base):
    __tablename__ = "process_steps"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(String, nullable=False)   # "01", "02", etc.
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    icon_name = Column(String, nullable=True)
    order_index = Column(Integer, default=0)


class SiteConfig(Base):
    __tablename__ = "site_config"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, nullable=False)
    value = Column(Text, nullable=False)


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=True)
    company = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    rating = Column(Integer, default=5)
    review = Column(Text, nullable=False)
    is_visible = Column(Boolean, default=True)
