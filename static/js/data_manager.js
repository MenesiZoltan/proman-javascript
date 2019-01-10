import {dom} from "./main.js";

export let datamanager = {

    postBoard : function(){
        let formdata = new FormData();
        let boardName = document.querySelector("#boardField").value;
        formdata.append("name",boardName);
        fetch('http://127.0.0.1:5000/create_board',{method:'POST',body:formdata})
	        .then(response => response.json())
	        .then(board => {
	            dom.create_board(board);
            });
    },


    postTask : function(task,boardId){
        let formdata = new FormData();
        formdata.append("task",task);
        formdata.append("board_id",boardId);
        fetch('http://127.0.0.1:5000/create_task',{method:'POST',body:formdata})
            .then(response => response.json())
            .then(task =>{
                dom.create_task(task);
            })
    },


    getBoards : function(){
        fetch("http://127.0.0.1:5000/load_boards",{method:'GET'})
            .then(response => response.json())
            .then(data =>{
                for(let board of data.boards){
                    dom.create_board(board);
                }
                for(let task of data.tasks ){
                    dom.create_task(task);
                }
            })
    },


    updateTask : function (id,status) {
        let formdata = new FormData();
        formdata.append("id",id);
        formdata.append("status",status);
        fetch("http://127.0.0.1:5000/update_task",{method:'PUT',body:formdata})
            .then(response => response.json())
            .then(data => console.log(data))
    },

    deleteTask : function (id) {
        let formdata = new FormData();
        formdata.append("id", id);
        fetch("http://127.0.0.1:5000/delete_task", {method: 'DELETE', body: formdata})
            .then(response => response.json())
            .then(data => console.log(data))
    },

    deleteBoard : function (id) {
        let formdata = new FormData();
        formdata.append("id", id);
        fetch("http://127.0.0.1:5000/delete_board", {method: 'DELETE', body: formdata})
            .then(response => response.json())
            .then(data => console.log(data))
    }
};