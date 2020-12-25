import React, { useState } from 'react';

// bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Rules = ({ rules }) => {
	const [showRules, setShowRules] = useState(false);
	return (
		<div>
			<Button variant='primary' onClick={() => setShowRules(true)}>
				Rules
			</Button>

			<div>
				<Modal
					show={showRules}
					onHide={() => setShowRules(false)}
					size='lg'
					aria-labelledby='contained-modal-title-vcenter'
					centered>
					<Modal.Header closeButton>
						<Modal.Title id='contained-modal-title-vcenter'>Rules</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div>
							{rules.map((rule, i) => (
								<div key={i}>
									{i + 1}. {rule}
								</div>
							))}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => setShowRules(false)}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
};

export default Rules;
