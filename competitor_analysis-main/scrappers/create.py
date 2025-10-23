import mysql.connector

# Path to your SQL file
sql_file_path = 'vulse.sql'

# MySQL connection settings
db_config = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "12345678",
    "database": "vulse"
}

# Connect to the MySQL database
try:
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()
    print("✅ Connected to MySQL")

    # Read and split the SQL script
    with open(sql_file_path, 'r') as file:
        sql_script = file.read()

    # Split by semicolon and execute each statement
    statements = [stmt.strip() for stmt in sql_script.split(';') if stmt.strip()]
    for statement in statements:
        try:
            cursor.execute(statement)
        except mysql.connector.Error as err:
            print(f"⚠️ Error in statement:\n{statement}\n→ {err}")

    connection.commit()
    print("✅ SQL script executed successfully")

except mysql.connector.Error as err:
    print(f"❌ Database error: {err}")
finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("🔌 Connection closed")
