import React from 'react';

const Scoreboard = ({ scoreboard }) => {
	return <h1>{`${scoreboard[1]} - ${scoreboard[2]}`}</h1>;
};

export default Scoreboard;
