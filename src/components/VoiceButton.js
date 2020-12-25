import React from 'react';

// icons
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';

const VoiceButton = ({ voiceOn, listen, stopListening }) => {
	return !voiceOn ? (
		<MicOffIcon onClick={listen} className='voice-button' />
	) : (
		<MicIcon onClick={stopListening} className='voice-button' />
	);
};

export default VoiceButton;
