import MinArray from './dataStructure/minArray';

export function dijkstra(grid, startCell, finishCell) {
  const visitedCells = [];
  startCell.isInReach = true;    
  let minArray = new MinArray();
  minArray.Insert(startCell)
  while (!!minArray.GetCount()) {            
    const currentCell = minArray.Pop();      
    if (currentCell.isWall) continue;    
    if (!currentCell.isInReach) return visitedCells;    
    currentCell.isInReach = false;
    currentCell.isVisited = true;
    visitedCells.push(currentCell);
    if (currentCell === finishCell) return visitedCells;
    InsertNeighborsToArray(minArray, currentCell, grid);
  }
  return visitedCells; 
}

const InsertNeighborsToArray = (minArray, currentCell, grid) => {  
  const {row, column} = currentCell;

  if (row > 0 && currentCell && !grid[row-1][column].isVisited){       
    grid[row - 1][column].weight = currentCell.weight + grid[row - 1][column].originalWeight;    
    grid[row - 1][column].isInReach = true; 
    grid[row - 1][column].previousCell = currentCell;
    minArray.Insert(grid[row-1][column]);       
  }
  if (row < grid.length - 1 && !grid[row+1][column].isVisited)
  {   
    grid[row + 1][column].weight = currentCell.weight + grid[row + 1][column].originalWeight;    
    grid[row + 1][column].isInReach = true;    
    grid[row + 1][column].previousCell = currentCell;
    minArray.Insert(grid[row + 1][column]);
  };
  if (column > 0 && !grid[row][column - 1].isVisited )
  {
    grid[row][column - 1].weight = currentCell.weight + grid[row][column - 1].originalWeight;    
    grid[row][column - 1].isInReach = true;    
    grid[row][column - 1].previousCell = currentCell;
    minArray.Insert(grid[row][column - 1]);
  };
  if (column < grid[0].length - 1 && !grid[row][column + 1].isVisited)
  {
    grid[row][column + 1].weight = currentCell.weight + grid[row][column + 1].originalWeight;    
    grid[row][column + 1].isInReach = true;    
    grid[row][column + 1].previousCell = currentCell;
    minArray.Insert(grid[row][column + 1]);
  };
}



