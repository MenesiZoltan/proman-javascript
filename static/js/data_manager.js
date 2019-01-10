import {dom} from "./dom.js";


export let datamanager = {

    baseUrl: 'http://127.0.0.1:5000',

    postBoard : function(){
        let formdata = new FormData();
        let boardName = document.querySelector("#boardField").value;
        formdata.append("name",boardName);
        fetch(datamanager.baseUrl + '/createBoard',{method:'POST',body:formdata})
	        .then(response => response.json())
	        .then(board => dom.createBoard(board))
    },


    postTask : function(task,boardId){
        let formdata = new FormData();
        formdata.append("task",task);
        formdata.append("board_id",boardId);
        fetch(datamanager.baseUrl + '/createTask',{method:'POST',body:formdata})
            .then(response => response.json())
            .then(task =>dom.createTask(task))
    },


    getBoards : function(){
        fetch(datamanager.baseUrl + "/load_boards",{method:'GET'})
            .then(response => response.json())
            .then(data =>{
                data.boards.forEach(dom.createBoard);
                data.tasks.forEach(dom.createTask);
            })
    },


    updateTask : function (id,status) {
        let formdata = new FormData();
        formdata.append("id",id);
        formdata.append("status",status);
        fetch(datamanager.baseUrl + "/update_task",{method:'PUT',body:formdata})
            .then(response => response.json())
            .then(data => console.log(data))
    },


    deleteTask : function (id) {
        let formdata = new FormData();
        formdata.append("id", id);
        fetch(datamanager.baseUrl + "/delete_task", {method: 'DELETE', body: formdata})
            .then(response => response.json())
            .then(data => console.log(data))
    },


    deleteBoard : function (id) {
        let formdata = new FormData();
        formdata.append("id", id);
        fetch(datamanager.baseUrl + "/delete_board", {method: 'DELETE', body: formdata})
            .then(response => response.json())
            .then(data => console.log(data))
    }
};