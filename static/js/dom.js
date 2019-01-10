import {datamanager} from "./data_manager.js";


export let dom = {

    loadBoardsOnStartup: function() {
        window.addEventListener("load",datamanager.getBoards);
    },


    initSubmitBoardBtn: function() {
        let addBoardBtn = document.querySelector("#submitBoard");
        addBoardBtn.addEventListener("click",function(){
            datamanager.postBoard();
            document.querySelector("#boardField").value = "";
        });
    },


    cloneTemplate: function(selector) {
        let boardTemplate = document.querySelector(selector);
        return document.importNode(boardTemplate.content, true);
    },


    initCreateTaskBtn: function() {
        let taskField = this.closest(".input-group").querySelector(".taskField");
        let boardId = this.closest(".board").dataset.id;
        datamanager.postTask(taskField.value,boardId);
        taskField.value = "";
    },


    setBoardClone: function(boardClone, boardData, callback) {
        boardClone.querySelector(".board").dataset.id = boardData.id;
        boardClone.querySelector(".board").setAttribute("id",`board_${boardData.id}`);
        boardClone.querySelector(".board .boardName").textContent = boardData.name;
        boardClone.querySelector(".board .submitTask").addEventListener("click",callback);
    },


    addBoardCloneToDom: function(boardClone) {
        document.querySelector("#boardContainer").appendChild(boardClone);
    },


    createBoard: function (boardData) {
        let boardClone = dom.cloneTemplate("#boardTemplate");
        let boardContainer = boardClone.querySelector(".board").parentElement;
        dom.setBoardClone(boardClone, boardData, dom.initCreateTaskBtn);
        dom.addBoardCloneToDom(boardClone);
        dom.dragulizeTasks(boardData, dom.tasksDropHandler);
        dom.dragulizeBoard(boardContainer, dom.boardDropHandler);
    },


    createTask: function(task){
        let taskClone = dom.cloneTemplate("#taskTemplate");
        taskClone.querySelector(".taskCard").dataset.id = task.id;
        taskClone.querySelector(".taskCard").textContent = task.task;
        let board = document.querySelector(`#board_${task.board_id}`);
        board.querySelector(`.${task.status}`).appendChild(taskClone);
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
            let status = targetContainer.dataset.status;
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


    dragulizeBoard : function(boardContainer, dropHandler){
        let containers = [boardContainer, document.querySelector("#trash")];
        let drakeBoard = dragula(containers, {
            moves: function(el, container, handle) {
            return !handle.classList.contains('alert');
        }});
        drakeBoard.on("drop", dropHandler);
    }
};