import React, {useState} from 'react';
import Grid from './Grid';
import Navbar from './Navbar'

const gridDimensions = [25,75]

const PathFinder = (props) => {  
  
  //0: Start Point
  //1: End Point
  //2: Wall
  //3: Weight
  const [actionState, setActionState] = useState(0);

  const handleActionStateClick = (e) => {
    setActionState(e.target.getAttribute("action"));
  }


  return (        
    <div>
      <Navbar action={actionState} handleActionStateClick={handleActionStateClick}/>
      <Grid action={actionState} gridDimensions={gridDimensions}/>
    </div>
    );  
}

export default PathFinder;