from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from datamanager import *

app = Flask(__name__)
app.secret_key = 'hello'


@app.route("/boards",methods=['GET'])
def index():
    return render_template('boards.html')


@app.route('/load_boards')
def load_boards():
    boards = get_boards()
    tasks = get_tasks()
    return jsonify({"boards":boards,"tasks":tasks})


@app.route('/createBoard',methods=['POST'])
def create_board():
    new_board = add_board(request.form.get("name"))
    return jsonify(new_board)


@app.route('/createTask',methods=['POST'])
def create_task():
    new_task = add_task(request.form)
    return jsonify(new_task)


@app.route('/update_task',methods=['PUT'])
def update_task():
    edit_task(request.form)
    return jsonify({"message":"task is updated"})


@app.route('/delete_task', methods=['DELETE'])
def delete_task():
    remove_task(request.form)
    return jsonify({"message": "task is deleted"})


@app.route('/delete_board', methods=['DELETE'])
def delete_board():
    remove_board(request.form)
    return jsonify({"message": "board has been deleted"})


@app.route('/')
def index_page():
    return render_template('index_page.html')


@app.route('/registration', methods=['POST'])
def registration():
    try:
        user_input = request.form.to_dict()
        user_input['password'] = hash_password(user_input['password'])
        register_user(user_input['password'], user_input['email'])
        return redirect(url_for('index_page'))
    except Exception:
        return 'Reg failed!'


@app.route('/login', methods=['POST'])
def login():
    user_input = request.form.to_dict()
    user_details = user_data(user_input['email'])
    if user_details and verify_password(user_input['password'], user_details['password']):
        session['user_id'] = user_details['id']
        return redirect(url_for('index'))
    return redirect(url_for('login'))



if __name__ == '__main__':
    app.run(debug=True)
