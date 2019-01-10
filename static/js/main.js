let dom = {

    create_board: function (board) {
        let boardTemplate = document.querySelector("#boardTemplate");
        let boardClone = document.importNode(boardTemplate.content, true);
        boardClone.querySelector(".board").setAttribute("id",`board_${board.id}`);
        boardClone.querySelector(".board .boardName").textContent = board.name;
        boardClone.querySelector(".board .submitTask").addEventListener("click",function(){
            let task = this.closest(".input-group").querySelector(".taskField").value;
            let boardId = this.closest(".board").id.split("_")[1];
            datamanager.postTask(task,boardId);
        });
        document.querySelector("#boardContainer").appendChild(boardClone);
        let drake = dom.dragulize(board);
        drake.on("drop",function(element,target){
            let id = element.dataset.id;
            let status = target.classList[2];
            datamanager.updateTask(id,status);
        });
    },


    create_task: function(task){
        let cardTemplate = document.querySelector("#taskTemplate");
        let cardClone = document.importNode(cardTemplate.content, true);
        cardClone.querySelector(".taskCard").dataset.id = task.id;
        cardClone.querySelector(".taskCard").textContent = task.task;
        let cardContainer = document.querySelector(`#board_${task.board_id}`).querySelector(`.${task.status}`).appendChild(cardClone);
    },


    dragulize : function(board){
        let newBoard = document.querySelector(`#board_${board.id}`);
        let cardContainer = Array.from(newBoard.querySelectorAll(".cardContainer"));
        return dragula(cardContainer);
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











