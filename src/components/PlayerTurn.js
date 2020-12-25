import React, { useEffect, useState } from 'react';

const PlayerTurn = ({ playerTurn }) => {
	const [blink, setBlink] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setBlink(!blink);
		}, 1500);
	}, [blink]);

	return (
		<h1 className={`turn ${blink ? 'blink-1' : ''}`}>
			Player {playerTurn}'s move
		</h1>
	);
};

export default PlayerTurn;
