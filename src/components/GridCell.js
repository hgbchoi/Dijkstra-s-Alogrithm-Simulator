import React from 'react';


const GridCell = React.memo((props) => {         
  return (       
    <span row={props.row} col={props.column} onClick={props.handleCellClick} className={props.isStartCell ? 
                                                                                        "border startPoint" : props.isEndCell ?                                                                                        
                                                                                        "border endPoint" : props.isShortestPath ?
                                                                                        "border shortestPath" : props.isWall ? 
                                                                                        "border wall" : props.isVisited ?                                                                                                                                                                                 
                                                                                        "border visited" : props.originalWeight > 1 ? 
                                                                                        "border weight" : "border"}>
    {props.originalWeight > 1 && !props.isVisited ? props.originalWeight : ''}                                                                                      
    </span>

                                            
    
    );
});

export default GridCell;