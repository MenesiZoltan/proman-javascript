from flask import Flask, render_template, request, jsonify
from datamanager import *

app = Flask(__name__)


@app.route("/",methods=['GET'])
def index():
    return render_template('boards.html')


@app.route('/create_board',methods=['PUT'])
def proba():
    return jsonify({'board_id': add_board()})


def main():
    app.run(debug=True)





if __name__ == '__main__':
    main()
