type Board = string[][];

interface ICell {
  row: number;
  col: number;
}

interface IState {
  board?: Board;
}

module gameLogic {

  /** Returns the initial Hex board, which is a 3x3 matrix containing ''. */
  export function getInitialBoard() {
    return [['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']];
  }

  /*
	Checks whether there is a winner for the current board starting from cell rowxcol for the given color
  */
  function checkWinner(board: Board, row: number, col: number, color: string){
  	var sequence = [[row,col]];
  	var queue: number[][] = [];
  	queue.push([row,col]);
  	var from : {[key: string]: number[]} = {}
  	from[getKey(row, col)]=[-1,-1];

  	//Perform search in the queue for finding a path
  	while (queue.length > 0) {
  		var current = queue.shift();
  		var cells = getAdjacentCell(board,current[0],current[1]);
  		for (var next in cells) {
        var thisKey = getKey(cells[next].row, cells[next].col);
  		 	if (thisKey in from == false){
  				queue.push([cells[next].row, cells[next].col]);
  				from[thisKey] = current;
  			}
  		}
  	}
  	return from;
  }

  function getKey(row: number, col: number): string {
    return row + "," + col;
  }

  /*
	Checks for a horizontal win for color blue
  */
  function getHorizontalWin(board: Board, row: number, col: number, color: string): boolean {
    var from = checkWinner(board,row,col,color);
    var max = -1;
    var v = Object.keys(from);
    for (var f in v){
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
  function getVerticalWin(board: Board, row: number, col: number, color: string): boolean {
	  var from = checkWinner(board,row,col,color)
	  var max = -1;
	  var v = Object.keys(from);
	  for (var f in v){
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
  function getWinner(board: Board): string {
    for (var i=0;i<11;i++) {
  		if (board[i][0]=='B' && getHorizontalWin(board,i,0,'B')) {
  			return 'B';
  		}
  	}

  	for (var j=0;j<11;j++) {
  		if (board[0][j]=='R'){
  			if (getVerticalWin(board,0,j,'R')) {
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
  function getAdjacentCell(board: Board, row: number, col: number): ICell[] {
  	var cells: ICell[] = [];
  	if (limits(row-1) && limits(col) && (board[row-1][col] === board[row][col])) {
  		cells.push({row: row-1, col: col});
  	}
  	if (limits(row-1) && limits(col+1) && (board[row-1][col+1] === board[row][col])) {
  		cells.push({row: row-1, col: col+1});
  	}
  	if (limits(row) && limits(col-1) && (board[row][col-1] == board[row][col])) {
  		cells.push({row: row, col: col-1});
  	}
  	if (limits(row) && limits(col+1) && (board[row][col+1] == board[row][col])) {
  		cells.push({row: row, col: col+1});
  	}
  	if (limits(row+1) && limits(col-1) && (board[row+1][col-1] == board[row][col])) {
  		cells.push({row: row+1, col: col-1});
  	}
  	if (limits(row+1) && limits(col) && (board[row+1][col] == board[row][col])) {
  		cells.push({row: row+1, col: col});
  	}
  	return cells;
  }

  /*
	Check whether the row or column indexed is valid
  */
  function limits(num: number): boolean {
  	if(num >= 0 && num <11){
  		return true;
  	}
  	return false;
  }

  /**
   * COMMENTED FOR TESTING PURPOSES
   * Returns all the possible moves for the given board and turnIndexBeforeMove.
   * Returns an empty array if the game is over.
   */
  export function getPossibleMoves(board: Board, turnIndexBeforeMove: number): IMove[] {
    var possibleMoves: IMove[] = [];
    for (var i = 0; i < 11; i++) {
      for (var j = 0; j < 11; j++) {
        try {
          possibleMoves.push(createMove(board, i, j, turnIndexBeforeMove));
        } catch (e) {
          console.log("getPossibleMoves!! e=" + e);
          // The cell in that position was full.
        }
      }
    }
    return possibleMoves;
  }

  /*
	Creates a move at rowxcol for turnIndex
  */
  export function createMove(board: Board, row: number, col: number, turnIndexBeforeMove: number): IMove {
  	if(board === undefined){
  		board = getInitialBoard();
  	}

    console.log("createMove[1]");

  	if(board[row][col]!=''){
  		throw new Error('The position is not empty!');
  	}

    console.log("createMove[2]");

  	if(getWinner(board)!=''){
  		throw new Error('The game has ended already!');
  	}

    console.log("createMove[3]");

  	var boardAfterMove = angular.copy(board);
  	boardAfterMove[row][col] = turnIndexBeforeMove === 0? 'R':'B';

  	var winner = getWinner(boardAfterMove);
  	var firstOperation: IOperation;

  	//There is no tie in Hex
  	if (winner!=''){
  		firstOperation = {endMatch: {endMatchScores: (winner === 'R' ? [1, 0] : (winner === 'B' ? [0, 1] : [0, 0]))}}
  	} else {
  		firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};
  	}

  	return [firstOperation,
  	{set:{key:'board',value:boardAfterMove}},
  	{set:{key:'delta',value:{row: row,col:col}}}]
  }

  export function isMoveOk(params: IIsMoveOk): boolean {
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
    } catch (e) {
      return false;
    }
    return true;
  }

}
