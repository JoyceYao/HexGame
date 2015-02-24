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




  it("placing R in 0x0 from initial state is legal", function() {
    expectMoveOk(0, {},
      [{setTurn: {turnIndex : 1}},
        {set: {key: 'board', value:
          [['R', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']]}},
        {set: {key: 'delta', value: {row: 0, col: 0}}}]);
  });

  it("placing B in 0x1 after R placed R in 0x0 is legal", function() {
    expectMoveOk(1,
      {board:
        [['R', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']], delta: {row: 0, col: 0}},
      [{setTurn: {turnIndex : 0}},
        {set: {key: 'board', value:
          [['R', 'B', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']]}},
        {set: {key: 'delta', value: {row: 0, col: 1}}}]);
  });

  it("placing an B in a non-empty position is illegal", function() {
    expectIllegalMove(1,
      {board:
        [['R', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']], delta: {row: 0, col: 0}},
      [{setTurn: {turnIndex : 0}},
        {set: {key: 'board', value:
          [['B', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']]}},
        {set: {key: 'delta', value: {row: 0, col: 0}}}]);
  });


  it("placing an illegal character X on board is illegal", function() {
    expectIllegalMove(1,
      {board:
        [['R', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']], delta: {row: 0, col: 0}},
      [{setTurn: {turnIndex : 0}},
        {set: {key: 'board', value:
          [['R', 'X', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']]}},
        {set: {key: 'delta', value: {row: 0, col: 1}}}]);
  });


  it("cannot move after the game is over", function() {
    expectIllegalMove(1,
      {board:
        [['', '', 'R', '', '', '', '', '', 'B', 'R', ''], ['', '', 'R', '', '', '', '', 'B', 'R', '', ''], ['', 'R', '', '', 'B', 'B', '', '', '', '', ''],
    ['', 'R', '', 'B', '', 'B', 'B', 'B', '', '', ''], ['', 'R', 'B', '', '', '', '', 'B', '', '', ''], ['B', 'R', 'R', '', '', '', '', 'B', 'B', 'B', 'B'],
    ['', '', 'R', 'R', '', '', '', '', '', '', ''], ['', '', '', 'R', '', '', '', '', '', '', ''], ['', '', 'R', '', '', '', '', '', '', '', ''], 
    ['', '', 'R', '', '', '', '', '', '', '', ''], ['', '', 'R', '', '', '', '', '', '', '', '']] , delta: {row: 10, col: 2}},
      [{setTurn: {turnIndex : 0}},
        {set: {key: 'board', value:
          [['', '', 'R', '', '', '', '', '', 'B', 'R', ''], ['', '', 'R', '', '', '', '', 'B', 'R', '', ''], ['', 'R', '', '', 'B', 'B', '', '', '', '', ''],
    ['', 'R', '', 'B', '', 'B', 'B', 'B', '', '', ''], ['', 'R', 'B', '', '', '', '', 'B', '', '', ''], ['B', 'R', 'R', '', '', '', '', 'B', 'B', 'B', 'B'],
    ['', '', 'R', 'R', '', '', '', '', '', '', ''], ['', '', '', 'R', '', '', '', '', '', '', ''], ['', '', 'R', '', '', '', '', '', '', '', ''], 
    ['', '', 'R', '', '', '', '', '', '', '', ''], ['', '', 'R', 'B', '', '', '', '', '', '', '']]  }},
        {set: {key: 'delta', value: {row: 10, col: 3}}}]);
  });

  it("R wins by placing R in 10x2 is legal", function() {
    expectMoveOk(0,
      {board:
       [['', '', 'R', '', '', '', '', '', 'B', 'R', ''], ['', '', 'R', '', '', '', '', 'B', 'R', '', ''], ['', 'R', '', '', 'B', 'B', '', '', '', '', ''],
    ['', 'R', '', 'B', '', 'B', 'B', 'B', '', '', ''], ['', 'R', 'B', '', '', '', '', 'B', '', '', ''], ['B', 'R', 'R', '', '', '', '', 'B', 'B', 'B', 'B'],
    ['', '', 'R', 'R', '', '', '', '', '', '', ''], ['', '', '', 'R', '', '', '', '', '', '', ''], ['', '', 'R', '', '', '', '', '', '', '', ''], 
    ['', '', 'R', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']], delta: {row: 5, col:10 }},
      [{endMatch: {endMatchScores: [1, 0]}},
            {set: {key: 'board', value:
              [['', '', 'R', '', '', '', '', '', 'B', 'R', ''], ['', '', 'R', '', '', '', '', 'B', 'R', '', ''], ['', 'R', '', '', 'B', 'B', '', '', '', '', ''],
    ['', 'R', '', 'B', '', 'B', 'B', 'B', '', '', ''], ['', 'R', 'B', '', '', '', '', 'B', '', '', ''], ['B', 'R', 'R', '', '', '', '', 'B', 'B', 'B', 'B'],
    ['', '', 'R', 'R', '', '', '', '', '', '', ''], ['', '', '', 'R', '', '', '', '', '', '', ''], ['', '', 'R', '', '', '', '', '', '', '', ''], 
    ['', '', 'R', '', '', '', '', '', '', '', ''], ['', '', 'R', '', '', '', '', '', '', '', '']],}},
            {set: {key: 'delta', value: {row: 10, col: 2}}}]);
  });


  it("B wins by placing B in 5x1 is legal", function() {
    expectMoveOk(1,
      {board:
        [['', '', 'R', '', '', '', '', '', 'B', 'R', ''], ['', '', 'R', '', '', '', '', 'B', 'R', '', ''], ['R', 'R', '', '', 'B', 'B', '', '', '', '', ''],
    ['', 'R', '', 'B', '', 'B', 'B', 'B', '', '', ''], ['', 'R', 'B', '', '', '', '', 'B', '', '', ''], ['B', '', 'R', '', '', '', '', 'B', 'B', 'B', 'B'],
    ['', '', 'R', 'R', '', '', '', '', '', '', ''], ['', '', '', 'R', '', '', '', '', '', '', ''], ['', '', 'R', '', '', '', '', '', '', '', ''], 
    ['', '', 'R', '', '', '', '', '', '', '', ''], ['', '', 'R', '', '', '', '', '', '', '', '']]  , delta: {row: 10, col: 2}},
      [{endMatch: {endMatchScores: [0, 1]}},
            {set: {key: 'board', value:
              [['', '', 'R', '', '', '', '', '', 'B', 'R', ''], ['', '', 'R', '', '', '', '', 'B', 'R', '', ''], ['R', 'R', '', '', 'B', 'B', '', '', '', '', ''],
    ['', 'R', '', 'B', '', 'B', 'B', 'B', '', '', ''], ['', 'R', 'B', '', '', '', '', 'B', '', '', ''], ['B', 'B', 'R', '', '', '', '', 'B', 'B', 'B', 'B'],
    ['', '', 'R', 'R', '', '', '', '', '', '', ''], ['', '', '', 'R', '', '', '', '', '', '', ''], ['', '', 'R', '', '', '', '', '', '', '', ''], 
    ['', '', 'R', '', '', '', '', '', '', '', ''], ['', '', 'R', '', '', '', '', '', '', '', '']]}},
            {set: {key: 'delta', value: {row: 5, col: 1}}}]);
  });  


  it("placing B in 2x2 is legal", function() {
    expectMoveOk(1,
      {board:
        [['', '', 'R', '', '', '', '', '', 'B', 'R', ''], ['', '', 'R', '', '', '', '', 'B', 'R', '', ''], ['R', 'R', '', '', 'B', 'B', '', '', '', '', ''],
    ['', 'R', '', 'B', '', 'B', 'B', 'B', '', '', ''], ['', 'R', 'B', '', '', '', '', 'B', '', '', ''], ['B', '', 'R', '', '', '', '', 'B', 'B', 'B', 'B'],
    ['', '', 'R', 'R', '', '', '', '', '', '', ''], ['', '', '', 'R', '', '', '', '', '', '', ''], ['', '', 'R', '', '', '', '', '', '', '', ''], 
    ['', '', 'R', '', '', '', '', '', '', '', ''], ['', '', 'R', '', '', '', '', '', '', '', '']] ,
         delta: {row: 2, col: 1}},
      [{setTurn: {turnIndex : 0}},
        {set: {key: 'board', value:
         [['', '', 'R', '', '', '', '', '', 'B', 'R', ''], ['', '', 'R', '', '', '', '', 'B', 'R', '', ''], ['R', 'R', 'B', '', 'B', 'B', '', '', '', '', ''],
    ['', 'R', '', 'B', '', 'B', 'B', 'B', '', '', ''], ['', 'R', 'B', '', '', '', '', 'B', '', '', ''], ['B', '', 'R', '', '', '', '', 'B', 'B', 'B', 'B'],
    ['', '', 'R', 'R', '', '', '', '', '', '', ''], ['', '', '', 'R', '', '', '', '', '', '', ''], ['', '', 'R', '', '', '', '', '', '', '', ''], 
    ['', '', 'R', '', '', '', '', '', '', '', ''], ['', '', 'R', '', '', '', '', '', '', '', '']] }},
        {set: {key: 'delta', value: {row: 2, col: 2}}}]);
  });
  
  it("null move is illegal", function() {
    expectIllegalMove(0, {}, null);
  });

  it("move without board is illegal", function() {
    expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}}]);
  });

  it("move without delta is illegal", function() {
    expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}},
      {set: {key: 'board', value:
     [['R', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']]
       }}]);
  });

  it("placing R outside the board (in 11x0) is illegal", function() {
    expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}},
      {set: {key: 'board', value:
        [['R', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']]}},
      {set: {key: 'delta', value: {row: 11, col: 0}}}]);
  });

    it("placing R in 0x0 but setTurn to yourself is illegal", function() {
    expectIllegalMove(0, {}, [{setTurn: {turnIndex : 0}},
      {set: {key: 'board', value:
        [['R', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']]}},
      {set: {key: 'delta', value: {row: 0, col: 0}}}]);
  });


   it("placing R in 0x0 but setting the board wrong is illegal", function() {
    expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}},
      {set: {key: 'board', value:
        [['R', 'R', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '']]}},
      {set: {key: 'delta', value: {row: 0, col: 0}}}]);
  });
 
});
