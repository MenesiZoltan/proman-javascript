import {datamanager} from "./data_manager.js";

export let dom = {

    cloneElement: function(selector) {
        let boardTemplate = document.querySelector(selector);
        return document.importNode(boardTemplate.content, true);

    },

    initCreateTaskBtn: function() {
            let task = this.closest(".input-group").querySelector(".taskField").value;
            let boardId = this.closest(".board").id.split("_")[1];
            datamanager.postTask(task,boardId);
    },

    setBoardClone: function(boardClone, board, callback) {
        boardClone.querySelector(".board").dataset.id = board.id;
        boardClone.querySelector(".board").setAttribute("id",`board_${board.id}`);
        boardClone.querySelector(".board .boardName").textContent = board.name;
        boardClone.querySelector(".board .submitTask").addEventListener("click",callback);
    },


    addBoardCloneToDom: function(boardClone) {
        document.querySelector("#boardContainer").appendChild(boardClone);
    },

    create_board: function (boardData) {
        let boardClone = dom.cloneElement("#boardTemplate");
        let boardContainer = boardClone.querySelector(".board").parentElement;
        dom.setBoardClone(boardClone, boardData, dom.initCreateTaskBtn);
        dom.addBoardCloneToDom(boardClone);
        dom.dragulizeTasks(boardData, dom.tasksDropHandler);
        dom.dragulizeBoard(boardContainer, dom.boardDropHandler);
    },


    create_task: function(task){
        let cardTemplate = document.querySelector("#taskTemplate");
        let cardClone = document.importNode(cardTemplate.content, true);
        cardClone.querySelector(".taskCard").dataset.id = task.id;
        cardClone.querySelector(".taskCard").textContent = task.task;
        document.querySelector(`#board_${task.board_id}`).querySelector(`.${task.status}`).appendChild(cardClone);
    },

    boardDropHandler: function(board, targetContainer) {
        if (targetContainer.id === "trash") {
            let boardId = board.dataset.id;
            datamanager.deleteBoard(boardId);
            board.remove();
        }
    },

    tasksDropHandler: function(task, targetContainer){
        if (targetContainer.id === "trash") {
            datamanager.deleteTask(task.dataset.id);
            task.remove();
        } else {
            let id = task.dataset.id;
            let status = targetContainer.classList[2];
            datamanager.updateTask(id, status);
        }
    },

    dragulizeTasks : function(boardData, dropHandler){
        let newBoard = document.querySelector(`#board_${boardData.id}`);
        let cardContainer = Array.from(newBoard.querySelectorAll(".cardContainer"));
        cardContainer.push(document.querySelector("#trash"));
        let drakeTasks = dragula(cardContainer);
        drakeTasks.on("drop", dropHandler);
    },



    dragulizeBoard : function(dragDiv, dropHandler){
        let containers = [dragDiv, document.querySelector("#trash")];
        let drakeBoard = dragula(containers, {
            moves: function(el, container, handle) {
            return !handle.classList.contains('alert');
        }});

        drakeBoard.on("drop", dropHandler)


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











