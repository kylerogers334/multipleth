import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div({
	backgroundColor: '#FFFFFF',
	border: '1px solid black',
	borderColor: '#FFFFFF',
	color: '#292B2C',
	cursor: 'pointer',
	fontFamily: 'Roboto Slab, serif',
	marginBottom: '-10px',
	marginLeft: '75px',
	marginTop: '10px'
});

const DropdownContainer = styled.div({
	backgroundColor: '#FFFFFF',
	border: '1px solid rgba(0, 0, 0, 0.15)',
	borderRadius: '0.25rem',
	color: '#292B2C',
	float: 'left',
	fontSize: '1rem',
	left: 0,
	listStyle: 'none',
	margin: '0.125rem 0 0',
	minWidth: '10rem',
	padding: '0.5rem 0',
	position: 'absolute',
	textAlign: 'left',
	top: '100%',
	zIndex: 1000,
	'&:after': {
		display: 'inline-block',
		width: 0,
		height: 0,
		marginLeft: '0.3em',
		verticalAlign: 'middle',
		content: '',
		borderTop: '0.3em solid',
		borderRight: '0.3em solid transparent',
		borderLeft: '0.3em solid transparent'
	}
});

const DropdownItem = styled.div({
	background: 'none',
	border: 0,
	color: '#292B2C',
	display: 'block',
	fontWeight: 'normal',
	padding: '3px 1.5rem',
	textAlign: 'inherit',
	whiteSpace: 'nowrap',
	width: '100%'
});

const Dropdown = ({ label, onSelect, selections }) => {
	const [open, setOpen] = useState(false);

	return (
		<React.Fragment>
			{open ? (
				<DropdownContainer>
					{selections.map((selection, idx) => (
						<DropdownItem
							onClick={() =>
								onSelect(
									selection === 'Total'
										? 'population'
										: selection.toLowerCase()
								)
							}
							key={idx}>
							{selection}
						</DropdownItem>
					))}
				</DropdownContainer>
			) : null}
			<Container onClick={() => setOpen(!open)}>{label}</Container>
		</React.Fragment>
	);
};

export default Dropdown;
