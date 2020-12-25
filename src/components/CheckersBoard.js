import React from 'react';

// picture
import Crown from '../assets/crown.png';

const CheckersBoard = ({ board, pickSquare, moveSquare, highlighted }) => {
	const rowCoordinate = Array(9)
		.fill(0)
		.map((_, index) =>
			index === 0 ? ' ' : String.fromCharCode(index + 'A'.charCodeAt() - 1)
		);

	return (
		<div className='checkers-board'>
			<div className='row'>
				{rowCoordinate.map((letter) => (
					<div className='coordinates' key={letter}>
						{letter}
					</div>
				))}
			</div>
			{Object.keys(board).map((row, index) => {
				return (
					<div key={index} className='row'>
						<div className='coordinates'>
							{Object.keys(board).length - index}
						</div>
						{Object.keys(board[row]).map((positionIndex) => {
							const square = board[row][positionIndex];
							const isEvenPosition =
								(square.position.x + 1 * square.position.y) % 2 === 0;

							const occupiedBy =
								square.occupiedBy === 1
									? 'one'
									: square.occupiedBy === 2
									? 'two'
									: '';

							const key = `${square.position.x}, ${square.position.y}`;
							const black =
								(index % 2 === 0 && positionIndex % 2 === 0) ||
								(index % 2 === 1 && positionIndex % 2 === 1);

							// console.log(square.occupiedBy === playerTurn);
							return (
								<div
									id={key}
									key={key}
									onClick={() => {
										if (!square.occupiedBy) {
											moveSquare(square);
										}
									}}
									className={`cell ${!black ? 'black' : ''}`}>
									{square.occupiedBy !== null &&
									isEvenPosition &&
									square.isKinged ? (
										<div
											onClick={() => {
												pickSquare(square);
											}}
											className={`${occupiedBy} king`}>
											<img src={Crown} className='crown' alt='Crown' />
										</div>
									) : square.occupiedBy !== null &&
									  isEvenPosition &&
									  !square.isKinged ? (
										<div
											onClick={() => {
												pickSquare(square);
											}}
											className={occupiedBy}></div>
									) : highlighted.has(key) ? (
										<div className='highlighted'></div>
									) : (
										<div></div>
									)}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default CheckersBoard;
