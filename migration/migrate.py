import datetime
import uuid

import psycopg2
import os
import json
from passlib.context import CryptContext

PWD_CONTEXT = CryptContext(schemes=['bcrypt'], deprecated='auto')


def get_password_hash(password):
    return PWD_CONTEXT.hash(password)


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

        insert_model_query = f'''INSERT INTO models (
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
                                        'gpt-4',
                                        'GPT-4',
                                        512,
                                        32256,
                                        'GPT model',
                                        '',
                                        '',
                                        '',
                                        ''
                                );
                                
                            '''
        cursor.execute(insert_model_query)
        conn.commit()
    except Exception as e:
        print('Error executing migration script:', e)

    finally:
        cursor.close()
        conn.close()


# Run the migration
if __name__ == "__main__":
    run_migration()
