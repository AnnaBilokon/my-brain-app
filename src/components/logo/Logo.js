import React from 'react';
import brain from './brain.png';
import './logo.css';


const Logo = () => {
	return (
		<div className='tilt ma4 mt0 pa3 br2 shadow-2' style={{ height: 150, width: 150 }}>
          <img style={{paddingTop: '5px'}} alt='logo' src={brain}/>
		</div>
	)
}

export default Logo;