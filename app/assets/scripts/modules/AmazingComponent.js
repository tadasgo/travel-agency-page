import React from 'react';

// there can be only one top level root HTML component in one function
function AmazingComponent() {
	return (
		<div>
			<h1 className="section-title section-title--blue">This is my amazing component</h1>
			<p>Just exploring integration of react with webpack</p>
			<p>Seems to be working great</p>
		</div>
	);
}

export default AmazingComponent;
