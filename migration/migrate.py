import datetime
import uuid
import psycopg2
import os
import json
from passlib.context import CryptContext
from cryptography.fernet import Fernet

PWD_CONTEXT = CryptContext(schemes=['bcrypt'], deprecated='auto')


def get_password_hash(password):
    return PWD_CONTEXT.hash(password)


def encrypt_data(key, data):
    fernet = Fernet(key)
    encrypted_data = fernet.encrypt(data.encode())
    return encrypted_data


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

        with open(os.path.join(os.getcwd(), 'migrations', 'migration_script.sql'), 'r') as f:
            migration_sql = f.read()
            cursor.execute(migration_sql)

        conn.commit()

        print('Migration completed successfully.')

        admin_email = 'admin.docai@gmail.com'
        select_user_exists_query = f'''SELECT 1 FROM users WHERE email = '{admin_email}' '''
        cursor.execute(select_user_exists_query)
        is_user_exists_result = cursor.fetchone()

        if not is_user_exists_result:
            insert_user_query = f'''INSERT INTO users (user_uuid,
                                                       is_active,
                                                       full_name,
                                                       image_url, 
                                                       password,
                                                       created_at,
                                                       updated_at,
                                                       email) 
                                                       VALUES ('{uuid.uuid4()}',
                                                                          '{1}',
                                                                          '{"Admin"}',
                                                                          '{""}',
                                                                          '{get_password_hash("admin")}',
                                                                          '{datetime.datetime.utcnow()}',
                                                                          '{datetime.datetime.utcnow()}',
                                                                          '{"admin.docai@gmail.com"}');
                                            '''
            cursor.execute(insert_user_query)
            conn.commit()

        with open(os.path.join(os.getcwd(), 'models.json'), 'r') as models_json_file:
            models_data = json.loads(models_json_file.read())
            for model in models_data:
                print("Migrate", f"Insert to models {model.get('target_name')}")
                table_name = 'models'
                select_sql_query = f'''SELECT 1 FROM {table_name} WHERE target_name = '{model.get('target_name')}' '''
                cursor.execute(select_sql_query)
                result = cursor.fetchone()

                if result:
                    delete_sql_query = f'''DELETE FROM {table_name} WHERE target_name = '{model.get('target_name')}' '''
                    cursor.execute(delete_sql_query)
                    conn.commit()
                api_key = encrypt_data(os.getenv('SECRET_KEY'), model.get('api_key')).decode('utf-8')
                insert_sql_query = f'''INSERT INTO {table_name} (
                                                                model_uuid,
                                                                target_name,
                                                                display_name,
                                                                max_new_tokens, 
                                                                max_input_tokens,
                                                                description,
                                                                deployment_url,
                                                                deployment,
                                                                api_version,
                                                                api_key
                                                                ) VALUES (
                                                                '{uuid.uuid4()}',
                                                                '{model.get('target_name')}',
                                                                '{model.get('display_name')}',
                                                                '{model.get('max_new_tokens')}',
                                                                '{model.get('max_input_tokens')}',
                                                                '{model.get('description')}',
                                                                '{model.get('deployment_url')}',
                                                                '{model.get('deployment')}',
                                                                '{model.get('api_version')}',
                                                                '{api_key}');
                                  '''

                cursor.execute(insert_sql_query)
                conn.commit()
                print("Migrate", f"Inserted to models {model.get('target_name')}")
    except Exception as e:
        import traceback
        traceback.print_exc()
        print('Error executing migration script:', e)

    finally:
        cursor.close()
        conn.close()


# Run the migration
if __name__ == "__main__":
    run_migration()
