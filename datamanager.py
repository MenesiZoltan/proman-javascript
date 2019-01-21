from db_connection import connection_handler
import bcrypt

def hash_password(plain_text_password):
    # By using bcrypt, the salt is saved into the hash itself
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


@connection_handler
def get_boards(cursor):
    query = ''' SELECT * FROM boards'''
    cursor.execute(query)
    return cursor.fetchall()


@connection_handler
def add_board(cursor,name):
    query = ''' INSERT INTO boards (name,user_id)
                VALUES (%(name)s,69);
                SELECT * FROM boards
                ORDER BY id DESC LIMIT 1; '''
    params = {"name":name}
    cursor.execute(query,params)
    return cursor.fetchone()


@connection_handler
def add_task(cursor,task):
    query = ''' INSERT INTO tasks (task,board_id)
                VALUES (%(task)s,%(board_id)s);
                SELECT * FROM tasks
                ORDER BY id DESC LIMIT 1;'''
    cursor.execute(query,task)
    return cursor.fetchone()


@connection_handler
def get_tasks(cursor):
    query = ''' SELECT * FROM tasks'''
    cursor.execute(query)
    return cursor.fetchall()


@connection_handler
def edit_task(cursor,task):
    query = ''' UPDATE tasks
                SET status=%(status)s
                WHERE id=%(id)s;'''
    cursor.execute(query,task)


@connection_handler
def remove_task(cursor, id):
    query = ''' DELETE FROM tasks
                WHERE id = %(id)s;'''
    cursor.execute(query, id)


@connection_handler
def remove_board(cursor, id):
    query = ''' DELETE FROM boards
                WHERE id = %(id)s;'''
    cursor.execute(query, id)


@connection_handler
def register_user(cursor, password, email):
    query = '''
            INSERT INTO users (password, email)
            VALUES(%(password)s, %(email)s);
            '''
    params = {'password': password, 'email': email}
    cursor.execute(query, params)


@connection_handler
def user_data(cursor, email):
    query = '''
            SELECT * FROM users
            WHERE email = %(email)s;
            '''
    params = {'email': email}
    cursor.execute(query, params)
    return cursor.fetchone()