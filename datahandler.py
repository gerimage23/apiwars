import psycopg2
from werkzeug import security

CONNECTION_STRING = "dbname='starwars' user='gergoszabo23' host='localhost' password='Kelkaposzta23'"


def init_db_connection(connection_string=CONNECTION_STRING):

    try:

        conn = psycopg2.connect

        conn.autocommit = True

        cursor = conn.cursor()

    except psycopg2.DatabaseError as e:
        print(e)
        return [[e]]

    return cursor


def insert_user(username, password):
    password = security.generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)
    try:
        cursor = init_db_connection(connection_string=CONNECTION_STRING)
        cursor.execute("""INSERT INTO users (username, password) VALUES (%s, %s)
                        ;""", (username, password))
        return True

    except psycopg2.ProgrammingError as e:
        print(e)
        return False

    except psycopg2.IntegrityError as e:
        print(e)
        return False


def check_user(username, password):
        try:
            cursor = init_db_connection(connection_string=CONNECTION_STRING)
            cursor.execute("""SELECT username, password
                            FROM users
                            WHERE username=%s;""", (username,))

            try:
                results = cursor.fetchall()[0]

            except IndexError as e:
                print(e)
                return False

            if username == username and security.check_password_hash(results[1], password):
                return True

        except Exception as e:
            print(e)
            return [[e]]
