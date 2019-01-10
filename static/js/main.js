let dom = {

    create_board: function (board) {
        let boardTemplate = document.querySelector("#boardTemplate");
        let boardClone = document.importNode(boardTemplate.content, true);
        let dragDiv = boardClone.querySelector(".board").parentElement;
        console.log(dragDiv);
        boardClone.querySelector(".board").setAttribute("id",`board_${board.id}`);
        boardClone.querySelector(".board .boardName").textContent = board.name;
        boardClone.querySelector(".board .submitTask").addEventListener("click",function(){
            let task = this.closest(".input-group").querySelector(".taskField").value;
            let boardId = this.closest(".board").id.split("_")[1];
            datamanager.postTask(task,boardId);
        });
        document.querySelector("#boardContainer").appendChild(boardClone);
        let drakeTasks = dom.dragulizeTasks(board);
        drakeTasks.on("drop",function(element, target){
            if (target.id === "trash") {
                datamanager.deleteTask(element.dataset.id);
                element.remove();
            } else {
                let id = element.dataset.id;
                let status = target.classList[2];
                datamanager.updateTask(id, status);
            }
        });

        let drakeBoard = dom.dragulizeBoard(dragDiv);
        drakeBoard.on("drop", function(element, target){
            if (target.id === "trash") {
                let boardId = element.id.split("_")[1];
                datamanager.deleteBoard(boardId);
                element.remove();
            }
        });

    },


    create_task: function(task){
        let cardTemplate = document.querySelector("#taskTemplate");
        let cardClone = document.importNode(cardTemplate.content, true);
        cardClone.querySelector(".taskCard").dataset.id = task.id;
        cardClone.querySelector(".taskCard").textContent = task.task;
        let cardContainer = document.querySelector(`#board_${task.board_id}`).querySelector(`.${task.status}`).appendChild(cardClone);
    },


    dragulizeTasks : function(board){
        let newBoard = document.querySelector(`#board_${board.id}`);
        let cardContainer = Array.from(newBoard.querySelectorAll(".cardContainer"));
        cardContainer.push(document.querySelector("#trash"));
        return dragula(cardContainer);
    },

    dragulizeBoard : function(dragDiv){
        let containers = [dragDiv, document.querySelector("#trash")];
        return dragula(containers, {
            moves: function(el, container, handle) {
            return !handle.classList.contains('alert');
        }});
    }
};



let datamanager = {

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


function main(){
    window.addEventListener("load",datamanager.getBoards);
    let addBoardBtn = document.querySelector("#submitBoard");
    addBoardBtn.addEventListener("click",function(event){
        datamanager.postBoard();
        document.querySelector("#boardField").value = "";
    });

}





main();











