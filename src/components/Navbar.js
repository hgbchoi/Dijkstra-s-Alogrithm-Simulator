import React from 'react';

const actionNames = ['Start Cell', 'End Cell', 'Wall', 'Weight']
const Navbar = (props) => {  
      
  return (    
    <div className = "nav-bar">
      <button onClick={props.handleActionStateClick} action={0}>Start Point</button>
      <button onClick={props.handleActionStateClick} action={1}>End Point</button>
      <button onClick={props.handleActionStateClick} action={2}>Wall</button>      
      <button onClick={props.handleActionStateClick} action={3}>Weight</button>   
  <span>Currently selected: {actionNames[props.action]}</span>         
    </div>
    );  
}

export default Navbar;