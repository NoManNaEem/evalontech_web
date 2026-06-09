"""
seed.py — Populates the database with the current hardcoded website data.
Run once after setting up the backend:
    cd backend
    python seed.py
"""

from database import SessionLocal, engine, Base
import models

Base.metadata.create_all(bind=engine)

db = SessionLocal()


def seed():
    # ─── Clear existing data (safe to re-run) ───────────────────
    db.query(models.Service).delete()
    db.query(models.CaseStudy).delete()
    db.query(models.Benefit).delete()
    db.query(models.ProcessStep).delete()
    db.query(models.SiteConfig).delete()
    db.commit()

    # ─── Services ───────────────────────────────────────────────
    services = [
        models.Service(
            title="ERP Solutions",
            description="Manage your entire business with a fully integrated Odoo ERP system. Streamline operations from finance and HR to inventory and sales.",
            image_url="/images/erp-dashboard.jpg",
            icon_name="Grid3X3",
            order_index=0,
        ),
        models.Service(
            title="AI & Automation",
            description="Automate workflows and unlock smarter decision-making. Harness AI to predict outcomes and surface insights that drive strategy.",
            image_url="/images/ai-automation.jpg",
            icon_name="Sparkles",
            order_index=1,
        ),
        models.Service(
            title="Web & App Development",
            description="Build scalable digital products tailored to your needs. Fast, scalable web and mobile applications built with modern frameworks.",
            image_url="/images/web-dev.jpg",
            icon_name="Code2",
            order_index=2,
        ),
        models.Service(
            title="Support & Optimization",
            description="Ensure performance with continuous support and improvements. We stay with you beyond delivery for long-term success.",
            image_url="/images/case-study-logistics.jpg",
            icon_name="ShieldCheck",
            order_index=3,
        ),
    ]
    db.add_all(services)

    # ─── Case Studies ───────────────────────────────────────────
    case_studies = [
        models.CaseStudy(
            title="Global Logistics Network",
            category="ERP Implementation",
            description="Transformed a mid-size logistics company with a fully integrated Odoo ERP system, reducing operational overhead by 40% and improving delivery tracking accuracy to 99.8%.",
            image_url="/images/case-study-logistics.jpg",
            stats=[
                {"label": "Efficiency Gain", "value": "+40%"},
                {"label": "Tracking Accuracy", "value": "99.8%"},
            ],
            order_index=0,
        ),
        models.CaseStudy(
            title="E-Commerce Platform",
            category="Web Development",
            description="Built a scalable e-commerce platform with seamless checkout, inventory management, and AI-powered recommendations that increased conversion rates by 65%.",
            image_url="/images/case-study-retail.jpg",
            stats=[
                {"label": "Conversion Rate", "value": "+65%"},
                {"label": "Page Load Time", "value": "<1s"},
            ],
            order_index=1,
        ),
        models.CaseStudy(
            title="Smart Factory Automation",
            category="AI & Automation",
            description="Implemented IoT sensors, robotic process automation, and predictive maintenance AI that reduced downtime by 55% and increased production efficiency.",
            image_url="/images/case-study-manufacturing.jpg",
            stats=[
                {"label": "Downtime Reduced", "value": "-55%"},
                {"label": "Production Efficiency", "value": "+35%"},
            ],
            order_index=2,
        ),
    ]
    db.add_all(case_studies)

    # ─── Benefits (Why Choose Us) ────────────────────────────────
    benefits = [
        models.Benefit(
            title="Reliability",
            description="When we agree to a deadline, we engineer everything around hitting it. No excuses, no last-minute surprises.",
            icon_name="Shield",
            order_index=0,
        ),
        models.Benefit(
            title="Innovation",
            description="We continuously integrate AI, cloud, and modern engineering practices so every solution is future-proof from day one.",
            icon_name="Lightbulb",
            order_index=1,
        ),
        models.Benefit(
            title="Clarity",
            description="Every decision is documented, every stage is communicated, and you always know exactly where things stand.",
            icon_name="Eye",
            order_index=2,
        ),
        models.Benefit(
            title="Excellence",
            description="We hold every deliverable — engineering, design, and communication — to a standard that reflects long-term quality.",
            icon_name="Award",
            order_index=3,
        ),
    ]
    db.add_all(benefits)

    # ─── Process Steps ──────────────────────────────────────────
    steps = [
        models.ProcessStep(number="01", title="Discovery", description="We dive deep into your business processes, challenges, and goals to understand exactly what you need.", icon_name="Search", order_index=0),
        models.ProcessStep(number="02", title="Strategy", description="We design a tailored solution architecture that aligns with your business objectives and growth plans.", icon_name="Lightbulb", order_index=1),
        models.ProcessStep(number="03", title="Development", description="Our engineers build your solution with precision, following agile methodologies for transparency.", icon_name="Code2", order_index=2),
        models.ProcessStep(number="04", title="Deployment", description="We launch your solution with comprehensive testing, training, and a smooth transition plan.", icon_name="Rocket", order_index=3),
        models.ProcessStep(number="05", title="Support", description="Continuous monitoring, optimization, and dedicated support to ensure long-term success.", icon_name="Headphones", order_index=4),
    ]
    db.add_all(steps)

    # ─── Site Config ────────────────────────────────────────────
    configs = [
        models.SiteConfig(key="email", value="info@evalontech.com"),
        models.SiteConfig(key="phone", value="+92-336-5361778"),
        models.SiteConfig(key="whatsapp_number", value="923365361778"),
        models.SiteConfig(key="cta_headline", value="Ready to Transform Your Business?"),
        models.SiteConfig(key="cta_subtext", value="Let's discuss how our ERP, AI, and automation solutions can drive your business forward. Get a free consultation today."),
        models.SiteConfig(key="response_time", value="Within an hour during business hours"),
    ]
    db.add_all(configs)

    db.commit()
    print("✅ Database seeded successfully!")


if __name__ == "__main__":
    seed()
    db.close()
