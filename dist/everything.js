var gameLogic;
(function (gameLogic) {
    /** Returns the initial Hex board, which is a 3x3 matrix containing ''. */
    function getInitialBoard() {
        return [['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']];
    }
    gameLogic.getInitialBoard = getInitialBoard;
    /*
      Checks whether there is a winner for the current board starting from cell rowxcol for the given color
    */
    function checkWinner(board, row, col, color) {
        var sequence = [[row, col]];
        var queue = [];
        queue.push([row, col]);
        var from = {};
        from[getKey(row, col)] = [-1, -1];
        //Perform search in the queue for finding a path
        while (queue.length > 0) {
            var current = queue.shift();
            var cells = getAdjacentCell(board, current[0], current[1]);
            for (var next in cells) {
                var thisKey = getKey(cells[next].row, cells[next].col);
                if (thisKey in from == false) {
                    queue.push([cells[next].row, cells[next].col]);
                    from[thisKey] = current;
                }
            }
        }
        return from;
    }
    function getKey(row, col) {
        return row + "," + col;
    }
    /*
      Checks for a horizontal win for color blue
    */
    function getHorizontalWin(board, row, col, color) {
        var from = checkWinner(board, row, col, color);
        var max = -1;
        var v = Object.keys(from);
        for (var f in v) {
            var x = v[f];
            var keys = x.split(',');
            if (parseInt(keys[1]) == 10) {
                return true;
            }
        }
        return false;
    }
    /*
      Checks for a vertical win for color red
    */
    function getVerticalWin(board, row, col, color) {
        var from = checkWinner(board, row, col, color);
        var max = -1;
        var v = Object.keys(from);
        for (var f in v) {
            var x = v[f];
            var keys = x.split(',');
            if (parseInt(keys[0]) == 10) {
                return true;
            }
        }
        return false;
    }
    /*
       Checks if there is a winner with the current board configuration
    */
    function getWinner(board) {
        for (var i = 0; i < 11; i++) {
            if (board[i][0] == 'B' && getHorizontalWin(board, i, 0, 'B')) {
                return 'B';
            }
        }
        for (var j = 0; j < 11; j++) {
            if (board[0][j] == 'R') {
                if (getVerticalWin(board, 0, j, 'R')) {
                    return 'R';
                }
            }
        }
        return '';
    }
    /*
      Gets the cells adjacent to a given cell with the same color
      Possible adjacent x for cell y. Here (1,y,6) (2,4) and (3,5) belong to a particular column.
  
          1 		2
  
      3 		y 		4
  
          5 		6
  
    */
    function getAdjacentCell(board, row, col) {
        var cells = [];
        if (limits(row - 1) && limits(col) && (board[row - 1][col] === board[row][col])) {
            cells.push({ row: row - 1, col: col });
        }
        if (limits(row - 1) && limits(col + 1) && (board[row - 1][col + 1] === board[row][col])) {
            cells.push({ row: row - 1, col: col + 1 });
        }
        if (limits(row) && limits(col - 1) && (board[row][col - 1] == board[row][col])) {
            cells.push({ row: row, col: col - 1 });
        }
        if (limits(row) && limits(col + 1) && (board[row][col + 1] == board[row][col])) {
            cells.push({ row: row, col: col + 1 });
        }
        if (limits(row + 1) && limits(col - 1) && (board[row + 1][col - 1] == board[row][col])) {
            cells.push({ row: row + 1, col: col - 1 });
        }
        if (limits(row + 1) && limits(col) && (board[row + 1][col] == board[row][col])) {
            cells.push({ row: row + 1, col: col });
        }
        return cells;
    }
    /*
      Check whether the row or column indexed is valid
    */
    function limits(num) {
        if (num >= 0 && num < 11) {
            return true;
        }
        return false;
    }
    /**
     * COMMENTED FOR TESTING PURPOSES
     * Returns all the possible moves for the given board and turnIndexBeforeMove.
     * Returns an empty array if the game is over.
     */
    function getPossibleMoves(board, turnIndexBeforeMove) {
        var possibleMoves = [];
        for (var i = 0; i < 11; i++) {
            for (var j = 0; j < 11; j++) {
                try {
                    possibleMoves.push(createMove(board, i, j, turnIndexBeforeMove));
                }
                catch (e) {
                    console.log("getPossibleMoves!! e=" + e);
                }
            }
        }
        return possibleMoves;
    }
    gameLogic.getPossibleMoves = getPossibleMoves;
    /*
      Creates a move at rowxcol for turnIndex
    */
    function createMove(board, row, col, turnIndexBeforeMove) {
        if (board === undefined) {
            board = getInitialBoard();
        }
        console.log("createMove[1]");
        if (board[row][col] != '') {
            throw new Error('The position is not empty!');
        }
        console.log("createMove[2]");
        if (getWinner(board) != '') {
            throw new Error('The game has ended already!');
        }
        console.log("createMove[3]");
        var boardAfterMove = angular.copy(board);
        boardAfterMove[row][col] = turnIndexBeforeMove === 0 ? 'R' : 'B';
        var winner = getWinner(boardAfterMove);
        var firstOperation;
        //There is no tie in Hex
        if (winner != '') {
            firstOperation = { endMatch: { endMatchScores: (winner === 'R' ? [1, 0] : (winner === 'B' ? [0, 1] : [0, 0])) } };
        }
        else {
            firstOperation = { setTurn: { turnIndex: 1 - turnIndexBeforeMove } };
        }
        return [firstOperation,
            { set: { key: 'board', value: boardAfterMove } },
            { set: { key: 'delta', value: { row: row, col: col } } }];
    }
    gameLogic.createMove = createMove;
    function isMoveOk(params) {
        var move = params.move;
        var turnIndexBeforeMove = params.turnIndexBeforeMove;
        var stateBeforeMove = params.stateBeforeMove;
        // We can assume that turnIndexBeforeMove and stateBeforeMove are legal, and we need
        // to verify that move is legal.
        try {
            // Example move:
            // [{setTurn: {turnIndex : 1},
            /*  {set: {key: 'board', value: [['', '', 'R', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']
            ]}},
            {set: {key: 'delta', value: {row: 0, col: 2}}}]*/
            var deltaValue = move[2].set.value;
            var row = deltaValue.row;
            var col = deltaValue.col;
            var board = stateBeforeMove.board;
            var expectedMove = createMove(board, row, col, turnIndexBeforeMove);
            if (!angular.equals(move, expectedMove)) {
                return false;
            }
        }
        catch (e) {
            return false;
        }
        return true;
    }
    gameLogic.isMoveOk = isMoveOk;
})(gameLogic || (gameLogic = {}));
;var game;
(function (game) {
    var draggingLines;
    var horizontalDraggingLine;
    var verticalDraggingLine;
    var clickToDragPiece;
    var gameArea;
    var rowsNum = 13;
    //extra columns for a square shape
    var colsNum = 11;
    var turnIndex = 0;
    var isYourTurn = false;
    var board = null;
    var msg = "";
    function init() {
        resizeGameAreaService.setWidthToHeight(1);
        dragAndDropService.addDragListener("gameArea", handleDragEvent);
        draggingLines = document.getElementById("draggingLines");
        horizontalDraggingLine = document.getElementById("horizontalDraggingLine");
        verticalDraggingLine = document.getElementById("verticalDraggingLine");
        clickToDragPiece = document.getElementById("clickToDragPiece");
        gameArea = document.getElementById("gameArea");
        gameService.setGame({
            minNumberOfPlayers: 2,
            maxNumberOfPlayers: 2,
            isMoveOk: gameLogic.isMoveOk,
            updateUI: updateUI
        });
    }
    game.init = init;
    function numbersTo(start, end) {
        var res;
        for (var i = start; i < end; i++) {
            res[i] = i;
        }
        return res;
    }
    game.numbersTo = numbersTo;
    function getStyle(row, col) {
        var cell = board[row][col];
        if (cell === 'R') {
            return {
                "-webkit-animation": "moveAnimation 2s",
                "animation": "moveAnimation 2s" };
        }
        if (cell === 'B') {
            return {
                "-webkit-animation": "moveAnimation 2s",
                "animation": "moveAnimation 2s" };
        }
        return {}; // no style
    }
    game.getStyle = getStyle;
    function handleDragEvent(type, clientX, clientY) {
        // Center point in gameArea
        var x = clientX - gameArea.offsetLeft;
        var y = clientY - gameArea.offsetTop;
        console.log('old xy=', x, ',', y);
        var left_hex = document.getElementById('e2e_test_div_0x0').offsetLeft;
        var top_hex = document.getElementById('e2e_test_div_0x0').offsetTop;
        console.log('left top = ', left_hex);
        console.log('left top = ', top_hex);
        x = x - left_hex;
        y = y - top_hex;
        console.log('x,y=', x, ',', y);
        //Use width and height of border image
        var w = document.getElementById('border').clientWidth;
        var h = document.getElementById('border').clientHeight;
        // Is outside gameArea?
        if (x < 0 || y < 0 || x >= w || y >= h || x < left_hex) {
            clickToDragPiece.style.display = "none";
            draggingLines.style.display = "none";
            return;
        }
        clickToDragPiece.style.display = "inline";
        draggingLines.style.display = "inline";
        var size = document.getElementById('hexagon').clientHeight / 2;
        // Inside gameArea. Let's find the containing square's row and col
        var col = Math.floor(colsNum * x / w);
        var row = Math.floor(rowsNum * y / h);
        row = Math.floor((x * Math.sqrt(3) / 3 - y / 3) / size);
        col = Math.floor(y * 2 / 3 / size);
        var RADIUS = document.getElementById('hexagon').clientWidth / 2;
        console.log('RADIUS=', RADIUS);
        var SIDE = 3 / 2 * RADIUS;
        var ci = Math.floor(x / SIDE);
        var HEIGHT = document.getElementById('hexagon').clientHeight;
        var cx = x - SIDE * ci;
        var ty = y - (ci % 2) * HEIGHT / 2;
        var cj = Math.floor(ty / HEIGHT);
        var cy = ty - HEIGHT * cj;
        x = (x - RADIUS) / document.getElementById('hexagon').clientHeight;
        var t1 = y / RADIUS;
        var t2 = Math.floor(x + t1);
        var r = Math.floor((Math.floor(t1 - x) + t2) / 3);
        var q = Math.floor((Math.floor(2 * x + 1) + t2) / 3) - r;
        row = r;
        col = q;
        var columns = getColumn(row, col);
        console.log('row col = ', row, ' ', col);
        if (col > 12 || col <= 0) {
            console.log('wrong col = ', col);
            draggingLines.style.display = "none";
            clickToDragPiece.style.display = "none";
        }
        var centerXY = getSquareCenterXY(row, columns);
        var centerXY4 = getSquareCenterXY(0, columns);
        console.log(centerXY);
        verticalDraggingLine.setAttribute("x1", centerXY.x + "");
        verticalDraggingLine.setAttribute("y1", centerXY4.y + "");
        var centerXY1 = getSquareCenterXY(12, col);
        verticalDraggingLine.setAttribute("x2", centerXY.x + "");
        verticalDraggingLine.setAttribute("y2", centerXY1.y + "");
        var centerXY2 = getSquareCenterXY(row, getColumn(row, 0));
        var centerXY3 = getSquareCenterXY(row, getColumn(row, 12));
        horizontalDraggingLine.setAttribute("x1", centerXY2.x + "");
        horizontalDraggingLine.setAttribute("x2", centerXY3.x + "");
        horizontalDraggingLine.setAttribute("y1", centerXY.y + "");
        horizontalDraggingLine.setAttribute("y2", centerXY.y + "");
        if (turnIndex === 1) {
            horizontalDraggingLine.setAttribute("stroke", "blue");
            verticalDraggingLine.setAttribute("stroke", "blue");
        }
        else {
            horizontalDraggingLine.setAttribute("stroke", "red");
            verticalDraggingLine.setAttribute("stroke", "red");
        }
        //rotate vertical line
        var rot = "rotate(-34.5 " + Math.floor(centerXY.x) + " " + Math.floor(centerXY.y) + ")";
        verticalDraggingLine.setAttribute("transform", rot);
        var topLeft = getSquareTopLeft(row, columns);
        clickToDragPiece.style.left = topLeft.left + "px";
        clickToDragPiece.style.top = topLeft.top + "px";
        if (row < 2 && row > 9) {
            draggingLines.style.display = "none";
            clickToDragPiece.style.display = "none";
            return;
        }
        if (type === "touchend" || type === "touchcancel" || type === "touchleave" || type === "mouseup") {
            // drag ended
            clickToDragPiece.style.display = "none";
            draggingLines.style.display = "none";
            dragDone(row - 1, col - 1);
        }
    }
    function getColumn(row, col) {
        var columns;
        if ((row - 1) === 0) {
            columns = col + 1;
        }
        else if (row - 1 === 1) {
            columns = col + 1;
        }
        else if (row - 1 === 2 || row - 1 === 3) {
            columns = col + 2;
        }
        else if (row - 1 === 4 || row - 1 === 5) {
            columns = col + 3;
        }
        else if (row - 1 === 6 || row - 1 === 7) {
            columns = col + 4;
        }
        else if (row - 1 === 8 || row - 1 === 9) {
            columns = col + 5;
        }
        else {
            columns = col + 6;
        }
        return columns;
    }
    function getSquareWidthHeight() {
        var w = document.getElementById('border').clientWidth - 5;
        var h = document.getElementById('border').clientHeight;
        //Use width of hexagon or calculate square?
        var w1 = document.getElementById('hexagon').clientWidth;
        var h1 = document.getElementById('hexagon').clientHeight;
        return {
            width: w1,
            height: h / rowsNum
        };
    }
    function getSquareTopLeft(row, col) {
        var size = getSquareWidthHeight();
        var left1;
        if (row % 2 === 0) {
            left1 = col * size.width + (size.width / 2);
        }
        else {
            left1 = col * size.width;
        }
        return { top: row * size.height, left: left1 };
    }
    function getSquareCenterXY(row, col) {
        var size1 = getSquareWidthHeight();
        var x1;
        if (row % 2 === 1) {
            x1 = col * size1.width + size1.width / 2;
        }
        else {
            x1 = col * size1.width + size1.width;
        }
        return {
            x: x1,
            y: row * size1.height + size1.height / 2
        };
    }
    function isWhiteSquare(row, col) {
        return ((row + col) % 2) === 0;
    }
    function getIntegersTill(num) {
        var res = [];
        for (var i = 0; i < num; i++) {
            res.push(i);
        }
        return res;
    }
    function sendComputerMove() {
        var possMoves = gameLogic.getPossibleMoves(board, turnIndex);
        //console.log('Possible Moves=',possMoves);
        var randomNo = Math.floor(Math.random() * possMoves.length);
        //console.log('random move=',possMoves[randomNo]);
        gameService.makeMove(possMoves[randomNo]);
        // AI is not smart enough! Don't use it
        //gameService.makeMove(aiService.createComputerMove(board, turnIndex,
        // at most 1 second for the AI to choose a move (but might be much quicker)
        //{millisecondsLimit: 2000, maxDepth: 3}));
    }
    function updateUI(params) {
        board = params.stateAfterMove.board;
        if (board === undefined) {
            board = gameLogic.getInitialBoard();
        }
        isYourTurn = params.turnIndexAfterMove >= 0 &&
            params.yourPlayerIndex === params.turnIndexAfterMove; // it's my turn
        turnIndex = params.turnIndexAfterMove;
        // Is it the computer's turn?
        if (isYourTurn &&
            params.playersInfo[params.yourPlayerIndex].playerId === '') {
            isYourTurn = false; // to make sure the UI won't send another move.
            // Waiting 0.5 seconds to let the move animation finish; if we call aiService
            // then the animation is paused until the javascript finishes.
            $timeout(sendComputerMove, 500);
        }
    }
    // window.e2e_test_stateService = stateService; // to allow us to load any state in our e2e tests.
    function cellClicked(row, col) {
        if (window.location.search === '?throwException') {
            throw new Error("Throwing the error because URL has '?throwException'");
        }
        if (!isYourTurn) {
            return;
        }
        try {
            var move = gameLogic.createMove(board, row, col, turnIndex);
            isYourTurn = false; // to prevent making another move
            gameService.makeMove(move);
        }
        catch (e) {
            console.log("exception!! e=" + e);
            log.info(["Cell is already full in position:", row, col]);
            return;
        }
    }
    game.cellClicked = cellClicked;
    function shouldShowImage(row, col) {
        var cell = board[row][col];
        return cell !== "";
    }
    game.shouldShowImage = shouldShowImage;
    function isPieceR(row, col) {
        return board[row][col] === 'R';
    }
    game.isPieceR = isPieceR;
    function isPieceB(row, col) {
        return board[row][col] === 'B';
    }
    game.isPieceB = isPieceB;
    function getImageSrc(row, col) {
        var cell = board[row][col];
        return cell === "R" ? "imgs/R.png"
            : cell === "B" ? "imgs/B.png" : "";
    }
    game.getImageSrc = getImageSrc;
    // $scope.shouldSlowlyAppear = function (row, col) {
    //   return $scope.delta !== undefined &&
    //       $scope.delta.row === row && $scope.delta.col === col;
    // };
    function getPreviewSrc() {
        return turnIndex === 1 ? "imgs/B.png" : "imgs/R.png";
    }
    game.getPreviewSrc = getPreviewSrc;
    function dragDone(row, col) {
        $rootScope.$apply(function () {
            var msg = "Dragged to " + row + "x" + col;
            log.info(msg);
            msg = msg;
            cellClicked(row, col);
        });
    }
})(game || (game = {}));
angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
    .run(function () {
    $rootScope['game'] = game;
    translate.setLanguage('en', {
        "RULES_OF_HEX": "Rules of HEX",
        "RULES_SLIDE1": "Each player places one stone of their color on the board per turn.",
        "RULES_SLIDE2": "A player wins when they connect stones across the board sides corresponding to their stone colour. Red player won this game by connecting vertically.",
        "RULES_SLIDE3": "In the contrary, blue player won this game by connecting horizontally.",
        "CLOSE": "Close"
    });
    game.init();
});
