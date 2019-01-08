from db_connection import connection_handler

@connection_handler
def add_board(cursor):
    query = ''' INSERT INTO boards (name,user_id)
                VALUES (69,69);
                
                SELECT id FROM boards
                ORDER BY id DESC LIMIT 1;
                '''
    cursor.execute(query)
    return cursor.fetchone()['id']