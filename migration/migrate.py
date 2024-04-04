import uuid

import psycopg2
import os
import json


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

        with open(os.path.join(os.getcwd(), 'models.json'), 'r') as models_json_file:
            models_data = json.loads(models_json_file.read())
            for model in models_data:
                print("Migrate", f"Insert to models {model.get('target_name')}")
                table_name = 'models'
                select_sql_query = f'''SELECT 1 FROM {table_name} WHERE target_name = '{model.get('target_name')}' '''
                cursor.execute(select_sql_query)
                result = cursor.fetchone()
                if not result:
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
                                                              '{model.get('api_key')}');
                                '''

                    cursor.execute(insert_sql_query)
                    conn.commit()
                    print("Migrate", f"Inserted to models {model.get('target_name')}")

    except Exception as e:
        print('Error executing migration script:', e)

    finally:
        cursor.close()
        conn.close()


# Run the migration
if __name__ == "__main__":
    run_migration()
