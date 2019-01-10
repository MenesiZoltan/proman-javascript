from flask import Flask, render_template, request, jsonify
from datamanager import *

app = Flask(__name__)


@app.route("/",methods=['GET'])
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


if __name__ == '__main__':
    app.run(debug=True)
