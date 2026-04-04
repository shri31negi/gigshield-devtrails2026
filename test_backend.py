"""
test_backend.py
───────────────
Quick backend health check script.
"""

import asyncio
import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent))


async def test_imports():
    """Test if all modules can be imported."""
    print("🔍 Testing imports...")
    try:
        from config import settings
        print("✅ Config loaded")
        print(f"   Environment: {settings.APP_ENV}")
        print(f"   Database: {settings.DATABASE_URL}")
        
        from database.db import init_db, engine
        print("✅ Database module loaded")
        
        import models
        print("✅ Models loaded")
        
        import agents
        print("✅ Agents loaded")
        
        import services
        print("✅ Services loaded")
        
        return True
    except Exception as e:
        print(f"❌ Import failed: {e}")
        return False


async def test_database():
    """Test database connection."""
    print("\n🔍 Testing database connection...")
    try:
        from database.db import init_db, engine
        
        # Initialize database
        await init_db()
        print("✅ Database initialized successfully")
        
        # Test connection
        async with engine.connect() as conn:
            print("✅ Database connection successful")
        
        return True
    except Exception as e:
        print(f"❌ Database test failed: {e}")
        return False


async def test_api_keys():
    """Check if API keys are configured."""
    print("\n🔍 Checking API keys...")
    from config import settings
    
    keys = {
        "OpenAI": settings.OPENAI_API_KEY,
        "Weather": settings.WEATHER_API_KEY,
        "AQI": settings.AQI_API_KEY,
    }
    
    for name, key in keys.items():
        if key and key != "":
            print(f"✅ {name} API key configured")
        else:
            print(f"⚠️  {name} API key missing (optional for basic testing)")


async def main():
    """Run all tests."""
    print("=" * 60)
    print("GigShield Backend Health Check")
    print("=" * 60)
    
    imports_ok = await test_imports()
    if not imports_ok:
        print("\n❌ Backend has import errors. Fix them before proceeding.")
        return False
    
    db_ok = await test_database()
    if not db_ok:
        print("\n❌ Database connection failed.")
        return False
    
    await test_api_keys()
    
    print("\n" + "=" * 60)
    print("✅ Backend is ready!")
    print("=" * 60)
    print("\nTo start the server, run:")
    print("  python main.py")
    print("or")
    print("  uvicorn main:app --reload")
    
    return True


if __name__ == "__main__":
    success = asyncio.run(main())
    sys.exit(0 if success else 1)
