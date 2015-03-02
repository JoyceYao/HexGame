describe("In Hex Game", function() {
  var _gameLogic;

  beforeEach(module("myApp"));

  beforeEach(inject(function (gameLogic) {
    _gameLogic = gameLogic;
  }));

  function expectMoveOk(turnIndexBeforeMove, stateBeforeMove, move) {
    expect(_gameLogic.isMoveOk({turnIndexBeforeMove: turnIndexBeforeMove,
      stateBeforeMove: stateBeforeMove,
      move: move})).toBe(true);
  }

  function expectIllegalMove(turnIndexBeforeMove, stateBeforeMove, move) {
    expect(_gameLogic.isMoveOk({turnIndexBeforeMove: turnIndexBeforeMove,
      stateBeforeMove: stateBeforeMove,
      move: move})).toBe(false);
  }

  it("R wins by placing R in 8x1 is legal", function() {
	  var board=_gameLogic.getInitialBoard();
	board= [['', 'R', '', 'B', '', '', '', '', '', '', ''], ['', 'R', '', 'B', '', '', '', '', '', '', ''], ['', 'R', '', 'B', '', '', '', '', '', '', ''],
	        ['', 'R', '', 'B', '', '', '', '', '', '', ''], ['', 'R', '', 'B', '', '', '', '', '', '', ''], ['', 'R', '', 'B', '', '', '', '', '', '', ''],
	        ['', 'R', '', 'B', '', '', '', '', '', '', ''], ['', 'R', '', 'B', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
	        ['', 'R', '', 'B', '', '', '', '', '', '', ''], ['', 'R', '', 'B', '', '', '', '', '', '', '']] ;

	 	 var nextBoard=[['', 'R', '', 'B', '', '', '', '', '', '', ''], ['', 'R', '', 'B', '', '', '', '', '', '', ''], ['', 'R', '', 'B', '', '', '', '', '', '', ''],
	 	        ['', 'R', '', 'B', '', '', '', '', '', '', ''], ['', 'R', '', 'B', '', '', '', '', '', '', ''], ['', 'R', '', 'B', '', '', '', '', '', '', ''],
		        ['', 'R', '', 'B', '', '', '', '', '', '', ''], ['', 'R', '', 'B', '', '', '', '', '', '', ''], ['', 'R', '', '', '', '', '', '', '', '', ''], 
		        ['', 'R', '', 'B', '', '', '', '', '', '', ''], ['', 'R', '', 'B', '', '', '', '', '', '', '']] ;
	    expectMoveOk(0,
	      {board:board  , delta: {row: 0, col: 4}},
	      [{endMatch: {endMatchScores: [1, 0]}},
	            {set: {key: 'board', value:nextBoard}},
	            {set: {key: 'delta', value: {row: 8, col: 1}}}]);
	  });  
  
  it("placing R outside the board (in 11x0) is illegal", function() {
	    expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}},
	      {set: {key: 'board', value:
	        [['R', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
	    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
	    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
	    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']]}},
	      {set: {key: 'delta', value: {row: 0, col: 11}}}]);
	  });

  it("B can get a DIAGONAL win", function() {
	  var board=_gameLogic.getInitialBoard();
	board=  [['B', 'R', '', '', '', '', '', '', '', '', ''], ['', 'B', 'R', '', '', '', '', '', '', '', ''], ['', '', 'B', 'R', '', '', '', '', '', '', ''],
	 	    ['', '', '', 'B', 'R', '', '', '', '', '', ''], ['', '', '', '', 'B', 'R', '', '', '', '', ''], ['', '', '', '', '', 'B', 'R', '', '', '', ''],
		    ['', '', '', '', '', '', 'B', 'R', '', '', ''], ['', '', '', '', '', '', '', 'B', 'R', '', ''], ['', '', '', '', '', '', '', '', 'B', 'R', ''], 
		    ['', '', '', '', '', '', '', '', '', 'B', 'R'], ['', '', '', '', '', '', '', '', '', '', '']];
		
	 	 var nextBoard= [['B', 'R', '', '', '', '', '', '', '', '', ''], ['', 'B', 'R', '', '', '', '', '', '', '', ''], ['', '', 'B', 'R', '', '', '', '', '', '', ''],
	 	    	 	    ['', '', '', 'B', 'R', '', '', '', '', '', ''], ['', '', '', '', 'B', 'R', '', '', '', '', ''], ['', '', '', '', '', 'B', 'R', '', '', '', ''],
	 	   		    ['', '', '', '', '', '', 'B', 'R', '', '', ''], ['', '', '', '', '', '', '', 'B', 'R', '', ''], ['', '', '', '', '', '', '', '', 'B', 'R', ''], 
	 	   		    ['', '', '', '', '', '', '', '', '', 'B', 'R'], ['', '', '', '', '', '', '', '', '', '', 'B']];
	 	   	    expectMoveOk(1,
	      {board:board  , delta: {row: 0, col: 1}},
	      [{endMatch: {endMatchScores: [0, 1]}},
	            {set: {key: 'board', value:nextBoard}},
	            {set: {key: 'delta', value: {row: 10, col: 10}}}]);
	  });

  it("R can get a DIAGONAL win", function() {
	  var board=_gameLogic.getInitialBoard();
	board=  [['R', 'B', '', '', '', '', '', '', '', '', ''], ['', 'R', 'B', '', '', '', '', '', '', '', ''], ['', '', 'R', 'B', '', '', '', '', '', '', ''],
	 	    ['', '', '', 'R', 'B', '', '', '', '', '', ''], ['', '', '', '', 'R', 'B', '', '', '', '', ''], ['', '', '', '', '', 'R', 'B', '', '', '', ''],
		    ['', '', '', '', '', '', 'R', 'B', '', '', ''], ['', '', '', '', '', '', '', 'R', 'B', '', ''], ['', '', '', '', '', '', '', '', 'R', 'B', ''], 
		    ['', '', '', '', '', '', '', '', '', 'R', 'B'], ['', '', '', '', '', '', '', '', '', '', '']];
		
	 	 var nextBoard= [['R', 'B', '', '', '', '', '', '', '', '', ''], ['', 'R', 'B', '', '', '', '', '', '', '', ''], ['', '', 'R', 'B', '', '', '', '', '', '', ''],
	 	    	 	    ['', '', '', 'R', 'B', '', '', '', '', '', ''], ['', '', '', '', 'R', 'B', '', '', '', '', ''], ['', '', '', '', '', 'R', 'B', '', '', '', ''],
	 	   		    ['', '', '', '', '', '', 'R', 'B', '', '', ''], ['', '', '', '', '', '', '', 'R', 'B', '', ''], ['', '', '', '', '', '', '', '', 'R', 'B', ''], 
	 	   		    ['', '', '', '', '', '', '', '', '', 'R', 'B'], ['', '', '', '', '', '', '', '', '', '', 'R']];
	 	   	    expectMoveOk(1,
	      {board:board  , delta: {row: 0, col: 1}},
	      [{endMatch: {endMatchScores: [0, 1]}},
	            {set: {key: 'board', value:nextBoard}},
	            {set: {key: 'delta', value: {row: 10, col: 10}}}]);
	  });

  it("B can get a vertical win", function() {
	  var board=_gameLogic.getInitialBoard();
	board= [['', 'B', '', 'R', '', '', '', '', '', '', ''], ['', 'B', '', 'R', '', '', '', '', '', '', ''], ['', 'B', '', 'R', '', '', '', '', '', '', ''],
	        ['', 'B', '', 'R', '', '', '', '', '', '', ''], ['', 'B', '', 'R', '', '', '', '', '', '', ''], ['', 'B', '', 'R', '', '', '', '', '', '', ''],
	        ['', 'B', '', 'R', '', '', '', '', '', '', ''], ['', 'B', '', 'R', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
	        ['', 'B', '', 'R', '', '', '', '', '', '', ''], ['', 'B', '', 'R', '', '', '', '', '', '', '']] ;

	 	 var nextBoard=[['', 'B', '', 'R', '', '', '', '', '', '', ''], ['', 'B', '', 'R', '', '', '', '', '', '', ''], ['', 'B', '', 'R', '', '', '', '', '', '', ''],
	 	        ['', 'B', '', 'R', '', '', '', '', '', '', ''], ['', 'B', '', 'R', '', '', '', '', '', '', ''], ['', 'B', '', 'R', '', '', '', '', '', '', ''],
		        ['', 'B', '', 'R', '', '', '', '', '', '', ''], ['', 'B', '', 'R', '', '', '', '', '', '', ''], ['', 'B', '', '', '', '', '', '', '', '', ''], 
		        ['', 'B', '', 'R', '', '', '', '', '', '', ''], ['', 'B', '', 'R', '', '', '', '', '', '', '']] ;
	    expectMoveOk(0,
	      {board:board  , delta: {row: 0, col: 4}},
	      [{endMatch: {endMatchScores: [0, 1]}},
	            {set: {key: 'board', value:nextBoard}},
	            {set: {key: 'delta', value: {row: 8, col: 1}}}]);
	  });
  
  it("R can get a Horizontal win", function() {
	  var board=_gameLogic.getInitialBoard();
	board= [['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
	        ['B', 'B', 'B', 'B', 'B', 'B', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
	        ['B', 'B', 'B', 'B', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
	        ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']];

	 	 var nextBoard=[['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
	 	   	        ['B', 'B', 'B', 'B', 'B', 'B', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
	 		        ['B', 'B', 'B', 'B', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
	 		        ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']];
    expectMoveOk(1,
	      {board:board  , delta: {row: 4, col: 0}},
	      [{endMatch: {endMatchScores: [1, 0]}},
	            {set: {key: 'board', value:nextBoard}},
	            {set: {key: 'delta', value: {row: 8, col: 1}}}]);
	  });
});