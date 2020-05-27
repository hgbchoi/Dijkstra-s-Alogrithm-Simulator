import React, {useEffect, useState, useCallback} from 'react';
import GridCell from './GridCell'
import {dijkstra} from '../dijkstra';

const INITIAL_START_CELL = [10,15];
const INITIAL_END_CELL = [10,50];

const Grid = (props) => {  
  
  const [grid, setGrid] = useState([]);  
  const [start, setStart] = useState(INITIAL_START_CELL);
  const [end, setEnd] = useState(INITIAL_END_CELL);
  const [isComplete, setIsComplete] = useState(false);
  const [isResetEnabled, setIsResetEnabled] = useState(false);

  useEffect(() => {    
    if(!grid.length){      
      initGrid()
    }
  })

  const setCellKey = (prevGrid, row, col, key, val) => {
    return prevGrid.map(r => {
      return r.map(cell => {
        if(cell.row == row && cell.column == col){
          if(val <= 5){
            return {...cell, [key]:val}          
          } else {
            return {...cell, [key]:1}
          }
        } else {
          return cell;
        }
      })
    })
  }

  const setCellKeyUnique = (prevGrid, row, col, key, val) => {
    return prevGrid.map(r => {
      return r.map(cell => {
        if(cell.row == row && cell.column == col){
          return {...cell, [key]:val}          
        } else {
          return {...cell, [key]:!val}
        }
      })
    })
  }

  const setCellWallToggle = (prevGrid, row, col) => {
    return prevGrid.map(r => {
      return r.map(cell => {
        if(cell.row == row && cell.column == col && cell.isWall){          
          return {...cell, isWall:false}          
        } else if (cell.row == row && cell.column == col && !cell.isWall){
          return {...cell, isWall:true}
        } else {
          return cell;
        }
      })
    })
  }

  const handleCellClick = useCallback((e) =>  {    
    setIsResetEnabled(true);

    let rowNum = e.target.getAttribute("row");
    let column = e.target.getAttribute("col");      
    if(props.action == 0){
      setStart([rowNum, column]);
      setGrid(g => setCellKeyUnique(g, rowNum, column, "isStartCell", true));                                        
    } else if (props.action == 1){
      setEnd([rowNum, column]);
      setGrid(g => setCellKeyUnique(g, rowNum, column, "isEndCell", true));                                        
    } else if (props.action == 2){
      setGrid(g => setCellWallToggle(g, rowNum, column));                                            
    } else {
     setGrid(g => setCellKey(g, rowNum, column, "originalWeight", ++g[rowNum][column].originalWeight));                                            
    } 
  }, [props.action]);
     
  const initGrid = () => {
    let gridRows = [];  
    for(let i = 0; i < props.gridDimensions[0]; i++){    
      gridRows.push([]);
      for(let j = 0; j < props.gridDimensions[1]; j++){      
          gridRows[i].push(initCell(i, j));    
        }
      }
    setGrid(gridRows);
  }
  
  const initCell = (i, j) => {
    return ({
      row: i,
      column: j,
      isStartCell : i == INITIAL_START_CELL[0] && j == INITIAL_START_CELL[1]? true : false,
      isShortestPath : false,
      isEndCell : i == INITIAL_END_CELL[0] && j == INITIAL_END_CELL[1]? true : false,
      isWall : false,
      isVisited : false,
      weight : Infinity,
      originalWeight: 1,
      isInReach: false,
      previousCell: null
    })
  }  

  const runAlgorithm = () => {
    setIsResetEnabled(false);

    let gridCopy = JSON.parse(JSON.stringify(grid));
    let visitedCellsArr = dijkstra(gridCopy, gridCopy[start[0]][start[1]], gridCopy[end[0]][end[1]]);        
    let shortestPathArr = getShortestPathArr(visitedCellsArr);

    for(let i = 0; i < visitedCellsArr.length; i++){            
      setTimeout(() =>{                  
      setGrid(prevGrid => setCellKey(prevGrid, visitedCellsArr[i].row, visitedCellsArr[i].column, "isVisited", true));
      if(i === visitedCellsArr.length - 1){
        setIsResetEnabled(true);
        for(let j = 0; j < shortestPathArr.length; j++)  {
          setTimeout(() =>{                        
            setGrid(prevGrid => setCellKey(prevGrid, shortestPathArr[j].row, shortestPathArr[j].column, "isShortestPath", true));
            }, 25 * j);      
        }        
      }
      }, 25 * i);      
    }                

    setIsComplete(1);    
  }  
  
  const reset = () => {
    initGrid();
    setStart(INITIAL_START_CELL);
    setEnd(INITIAL_END_CELL);
    setIsResetEnabled(false);
    setIsComplete(0);    

  }

  const getShortestPathArr = (arr) => {
    var shortestPathArr = [];        
    var currentCell = arr[arr.length-1];
    while(currentCell != null){
      shortestPathArr.unshift(currentCell);
      currentCell = currentCell.previousCell
    }
    return shortestPathArr;
  }

      
  return (        
    <div>
      <button onClick={runAlgorithm}>Run Algorithm</button>
      <button disabled={!isResetEnabled} onClick={reset}>Reset Grid</button>
      <div className = "grid">
          {grid.map((row) => (
            <div className = "row">
            {row.map(cell => <GridCell isShortestPath={cell.isShortestPath} handleCellClick={!isComplete ? handleCellClick : null} isVisited={cell.isVisited} originalWeight={cell.originalWeight} row={cell.row} column={cell.column} isStartCell={cell.isStartCell} isEndCell={cell.isEndCell} isWall={cell.isWall}/>)}          
            </div>
          ))}                
      </div>
      <div class='legend'>
        <span class='border startPoint'></span><span class='description'>Start Cell</span>
        <span class='border endPoint'></span><span class='description'>End Cell</span>
        <span class='border wall'></span><span class='description'>Wall</span>
        <span class='border weight'></span><span class='description'>Weighted Cell</span>
      </div>
    </div>
    );  
};

export default Grid;