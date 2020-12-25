export const numbersToCoords = ({ x, y }, board) => {
	return [
		String.fromCharCode(y + 'A'.charCodeAt()),
		Object.keys(board).length - x,
	];
};
