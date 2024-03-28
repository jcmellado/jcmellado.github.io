
var CFT_GRID_ROWS = 11;
var CFT_GRID_COLS = 7;
var CFT_GRID_TICK_ANIMATION = 1000;
var CFT_GRID_ANIMATED_TOKENS = 5;
var CFT_CELL_WIDTH = 30;
var CFT_CELL_HEIGHT = 30;

function Grid(div){
  this.div = div;

  this.cells = this.createCells();
  this.freeRow = new Array();
  this.rockThem = false;

  this.idTask = scheduler.createTask(this, "onTick", CFT_GRID_TICK_ANIMATION);
}

Grid.prototype.createCells = function(){
  var cells = new Array(CFT_GRID_ROWS);
  for (var row = 0; row < CFT_GRID_ROWS; ++ row){
    cells[row] = new Array(CFT_GRID_COLS);
  }
  return cells;
}

Grid.prototype.clear = function(){
  this.clearFreeRow();
  this.clearCells();
}  

Grid.prototype.clearFreeRow = function(){
  for (var col = 0; col < this.freeRow.length; ++ col){
    var token = this.freeRow[col];
    token.destroy();
    this.removeToken(token);
    this.freeRow[col] = null;
  }
}

Grid.prototype.clearCells = function(){
  for (var row = 0; row < CFT_GRID_ROWS; ++ row){
    for (var col = 0; col < CFT_GRID_COLS; ++ col){
      if (this.cells[row][col] != null){
        var token = this.cells[row][col];
	token.destroy();
	this.removeToken(token);
        this.cells[row][col] = null;
      }
    }
  }
}

Grid.prototype.clearBooms = function(){
  for (var row = 0; row < CFT_GRID_ROWS; ++ row){
    for (var col = 0; col < CFT_GRID_COLS; ++ col){
      if (this.cells[row][col] != null){
        var token = this.cells[row][col];
	if (token instanceof Boom){
	  token.destroy();
	  this.removeToken(token);
          this.cells[row][col] = null;
	}
      }
    }
  }
}

Grid.prototype.onTick = function(task){
  this.animate();
}

Grid.prototype.animate = function(){
  for (var i = 0; i < CFT_GRID_ANIMATED_TOKENS; ++ i){
    var row = randomIndex(CFT_GRID_ROWS - 1);
    var col = randomIndex(CFT_GRID_COLS - 1);
    if (null != this.cells[row][col]){
        this.cells[row][col].animate();
    }
  }
}

Grid.prototype.pregenerateRow = function(row){
  var x = 0;
  var y = row * CFT_CELL_HEIGHT;
  for (var col = 0; col < CFT_GRID_COLS; ++ col){
    var token = this.generateFace(x, y);
    this.cells[row][col] = token;
    this.appendToken(token);
    x += CFT_CELL_WIDTH;
  }
}

Grid.prototype.generateFreeToken = function(specialToken){
  var x = this.freeRow.length * CFT_CELL_WIDTH;
  var y = 0;
  var token = this.generateFreeRockToken(x, y, specialToken);
  this.freeRow.push(token);
  this.appendToken(token);
}

Grid.prototype.generateFreeRockToken = function(x, y, specialToken){
  return this.rockThem? this.generateRock(x, y): this.generateToken(x, y, specialToken);
}

Grid.prototype.generateToken = function(x, y, specialToken){
  return specialToken? this.generateSpecialToken(x, y): this.generateFace(x, y);
}

Grid.prototype.generateSpecialToken = function(x, y){
  return random(100) < 80? this.generateBomb(x, y): this.generateRock(x, y);
}

Grid.prototype.generateFace = function(x, y){
  return new Face(x, y, Face.generateColor(), Face.getDefaultStage() );
}

Grid.prototype.generateRock = function(x, y){
  return new Rock(x, y);
}

Grid.prototype.generateBomb = function(x, y){
  return new Bomb(x, y, Bomb.generateColor() );
}

Grid.prototype.generateBoom = function(x, y){
  return new Boom(x, y);
}

Grid.prototype.update = function(specialToken){
  this.clearBooms();
  this.fallRows();
  
  if ( this.isFreeRowFull() ){
    this.fallFreeRow();
  }
  else{
    this.generateFreeToken(specialToken);
  }
}
  
Grid.prototype.fallFreeRow = function(){
  this.rockThem = false;

  for (var col = 0; col < CFT_GRID_COLS; ++ col){
    this.cells[0][col] = this.freeRow[col];
  }
  this.freeRow = new Array();
  this.fallRows();
}

Grid.prototype.fallRows = function(){
  for (var col = 0; col < CFT_GRID_COLS; ++ col){
    for (var row = CFT_GRID_ROWS - 1; row > 0; -- row){
      if (null == this.cells[row][col]){
        this.fallOver(row, col);
      }
    }
  }
}

Grid.prototype.fallOver = function(row, col){
  for (var y = row - 1; y >= 0; -- y){
    if (null != this.cells[y][col]){
      this.cells[y][col].fall(row * CFT_CELL_HEIGHT);
      this.cells[row][col] = this.cells[y][col];
      this.cells[y][col] = null;
      break;
    }
  }
}

Grid.prototype.changeFreeTokenToRock = function(){
  this.rockThem = true;

  for (var col = 0; col < this.freeRow.length; ++ col){
    var token = this.freeRow[col];
    token.destroy();
    this.removeToken(token);
    
    this.freeRow[col] = this.generateRock(token.x, token.y);
    this.appendToken( this.freeRow[col] );
  }
}

Grid.prototype.clickToken = function(token){
  var exploited = 0;

  for (var row = 0; row < CFT_GRID_ROWS; ++ row){
    for (var col = 0; col < CFT_GRID_COLS; ++ col){
      if (token == this.cells[row][col]){
      
        if (token instanceof Face){
          exploited = this.exploitFace(row, col, token);
        }
        if (token instanceof Bomb){
          exploited = this.exploitBomb(token);
        }
        if (exploited > 0){
          this.fallRows();
        }
	break;
      }
    }
  }
  
  return exploited;
}

Grid.prototype.exploitFace = function(row, col, token){
  var exploited = 0;

  if ( this.hasNeighbours(row, col, token.sprite.color) ){
    exploited = this.removeNeighbours(row, col, token.sprite.color);
  }

  return exploited;
}

Grid.prototype.hasNeighbours = function(row, col, color){
  return ( (col > 0                           ) && ( this.sameColor(row, col - 1, color) ) ) ||
            ( (col < CFT_GRID_COLS - 1  ) && ( this.sameColor(row, col + 1, color) ) ) ||
            ( (row > 0                          ) && ( this.sameColor(row - 1, col, color) ) ) ||
            ( (row < CFT_GRID_ROWS - 1) && ( this.sameColor(row + 1, col, color) ) );
}

Grid.prototype.sameColor = function(row, col, color){
  var token = this.cells[row][col]
  return (token != null) && (token instanceof Face) && token.sameColor(color);
}

Grid.prototype.removeNeighbours = function(row, col, color){
  var exploited = 0;

  var y0 = row;
  while( (y0 > 0) && this.sameColor(y0 - 1, col, color) ){
    this.removeCell(-- y0, col);
    ++ exploited;
  }

  this.removeCell(row, col);
  ++ exploited;
    
  var y1 = row;
  while( (y1 < CFT_GRID_ROWS - 1) && this.sameColor(y1 + 1, col, color) ){
    this.removeCell(++ y1, col);
    ++ exploited;
  }
  
  for (var y = y0; y <= y1; ++ y) {
    if ( (col > 0) &&  this.sameColor(y, col - 1, color) ){
      exploited += this.removeNeighbours(y, col - 1, color);
    }
    if ( (col < CFT_GRID_COLS - 1) && this.sameColor(y, col + 1, color) ){
      exploited += this.removeNeighbours(y, col + 1, color);
    }
  }
  
  return exploited;
}

Grid.prototype.exploitBomb = function(bomb){
  var exploited = 0;

  for (var col = 0; col < CFT_GRID_COLS; ++ col){
    for (var row = 0; row < CFT_GRID_ROWS; ++ row){
      if ( this.cells[row][col] != null){
        if ( (this.cells[row][col] == bomb) || this.cells[row][col].sameColor(bomb.sprite.color) ){
          this.removeCell(row, col);
          ++ exploited;
        }
      }
    }
  }

  return exploited;
}

Grid.prototype.removeCell = function(row, col){
  this.cells[row][col].destroy();
  this.removeToken( this.cells[row][col] );
  
  var token = this.generateBoom(this.cells[row][col].x, this.cells[row][col].y);
  this.appendToken(token);
  this.cells[row][col] = token;
}

Grid.prototype.appendToken = function(token){
    this.div.appendChild( token.sprite.div.getDiv() );
}

Grid.prototype.removeToken = function(token){
    this.div.removeChild( token.sprite.div.getDiv() );
}

Grid.prototype.isFreeRowFull = function(){
  return this.freeRow.length == CFT_GRID_COLS;
}

Grid.prototype.isGameOver = function(){
  return this.isFreeRowFull() && this.isGridFull();
}

Grid.prototype.isGridFull = function(){
  for (var col = 0; col < CFT_GRID_COLS; ++ col){
    if ( this.cells[1][col] != null){
      return true;
    }
  }
  return false;
}
