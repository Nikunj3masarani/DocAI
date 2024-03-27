import psycopg2
import os


# Function to execute migration SQL
def run_migration():
    try:
        # Connect to the database
        conn = psycopg2.connect(
            host=os.getenv('POSTGRES_HOST'),
            port=int(os.getenv('POSTGRES_PORT')),
            user=os.getenv('POSTGRES_USER'),
            password=os.getenv('POSTGRES_PASSWORD'),
            database=os.getenv('POSTGRES_DB')
        )
        cursor = conn.cursor()

        # Execute migration SQL statements
        with open(os.path.join(os.getcwd(), 'migrations', 'migration_script.sql'), 'r') as f:
            migration_sql = f.read()
            cursor.execute(migration_sql)

        # Commit changes and close connection
        conn.commit()
        print('Migration completed successfully.')

    except Exception as e:
        print('Error executing migration script:', e)

    finally:
        cursor.close()
        conn.close()


# Run the migration
if __name__ == "__main__":
    run_migration()
