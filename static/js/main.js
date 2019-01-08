let dom = {
    create_board: function (board_id) {
        let boardTemplate = document.querySelector("#boardTemplate");
        let boardClone = document.importNode(boardTemplate.content, true);
        boardClone.querySelector(".board").setAttribute("id",`board_${board_id}`);
        document.querySelector("#boardContainer").appendChild(boardClone);
    }
};



let datamanager = {
    putBoard : function(){
        fetch('http://127.0.0.1:5000/create_board',{method:'PUT'})
	        .then(response => response.json())
	        .then(board => {
	            dom.create_board(board.board_id);
	            let newBoard = document.querySelector(`#board_${board.board_id}`);
                let cardContainer = Array.from(newBoard.querySelectorAll(".cardContainer"));
                dragula(cardContainer);
            });
    }
};




let addBoardBtn = document.querySelector("#addBoard");
addBoardBtn.addEventListener("click",function(event){
    datamanager.putBoard();
});


