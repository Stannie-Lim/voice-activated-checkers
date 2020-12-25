import React, { useState } from 'react';
import { useCheckers } from 'react-checkers';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';

// components
import Rules from './Rules';
import PlayerTurn from './PlayerTurn';
import Scoreboard from './Scoreboard';
import VoiceButton from './VoiceButton';
import CheckersBoard from './CheckersBoard';

// css
import './Board.css';

const Board = () => {
	const {
		board,
		handleMove,
		handlePick,
		playerTurn,
		scoreboard,
		rules,
	} = useCheckers(8);

	const [moving, setMoving] = useState({});
	const [voiceOn, setVoiceOn] = useState(false);
	const [highlighted, setHighlighted] = useState(new Set());

	const getHighlightedPoints = (square) => {
		if (square.occupiedBy !== playerTurn) return;

		const { isKinged, x, y } = square.position;
		const possibilities = [
			[1, 1],
			[-1, 1],
			[-1, -1],
			[1, -1],
		];
		const set = new Set();

		for (const [xDirection, yDirection] of possibilities) {
			const newX = x + xDirection;
			const newY = y + yDirection;
			if (
				newX >= 0 &&
				newY >= 0 &&
				newX < board[0].length &&
				newY < board[0].length &&
				!board[newX][newY].occupiedBy
			) {
				const key = `${newX}, ${newY}`;
				set.add(key);
			}
		}

		setHighlighted(set);
	};

	const pickSquare = (square) => {
		setMoving(square);
		getHighlightedPoints(square);
		handlePick(square);
	};

	const moveSquare = (square) => {
		setHighlighted(new Set());
		handleMove(square);
	};

	const commands = [
		{
			command: 'pick',
			callback: () => {
				console.log('hello');
				const xposition = 0;
				const yposition = 2;
				const square = board[xposition][yposition];
				pickSquare(square);

				stopListening();
			},
		},
		{
			command: 'move',
			callback: () => {
				const newx = 1;
				const newy = 3;
				const newsquare = board[newx][newy];
				moveSquare(newsquare);

				stopListening();
			},
		},
	];
	const { transcript, resetTranscript } = useSpeechRecognition({ commands });

	console.log(transcript);

	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		return null;
	}

	const listen = () => {
		SpeechRecognition.startListening({ continuous: true });
		setVoiceOn(true);
	};

	const stopListening = () => {
		SpeechRecognition.stopListening();
		setVoiceOn(false);
	};

	return (
		<div>
			<PlayerTurn playerTurn={playerTurn} />

			<CheckersBoard
				board={board}
				pickSquare={pickSquare}
				moveSquare={moveSquare}
				highlighted={highlighted}
			/>

			<Rules rules={rules} />

			<VoiceButton
				listen={listen}
				stopListening={stopListening}
				voiceOn={voiceOn}
			/>

			<Scoreboard scoreboard={scoreboard} />
		</div>
	);
};

export default Board;
