import sys
import os
from sqlmodel import Session, select

# Add current directory to path so we can import backend modules
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from backend.database import engine, create_db_and_tables
from backend.models import User
from backend.auth import get_password_hash

def create_default_user():
    # Ensure tables actully exist before trying to query/insert
    create_db_and_tables()
    
    with Session(engine) as session:
        username = "admin"
        existing_user = session.exec(select(User).where(User.username == username)).first()
        
        if existing_user:
            print(f"User '{username}' already exists.")
            print("Password: password123 (if not changed)")
            return

        print("Creating default admin user...")
        user = User(
            username=username,
            email="admin@vitalguard.com",
            hashed_password=get_password_hash("password123"), # Default password
            role="doctor",
            is_active=True
        )
        session.add(user)
        session.commit()
        print("--------------------------------------------------")
        print("User Created Successfully!")
        print(f"Username: {username}")
        print(f"Password: password123")
        print("--------------------------------------------------")

if __name__ == "__main__":
    create_default_user()
