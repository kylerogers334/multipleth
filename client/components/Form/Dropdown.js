import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div(({ selected }) => ({
	alignItems: 'center',
	backgroundColor: selected ? '#000000' : '#FFFFFF',
	color: selected ? '#FFFFFF' : '#000000',
	display: 'flex',
	fontFamily: 'Roboto Slab, serif',
	justifyContent: 'center',
	letterSpacing: '1px',
	marginTop: selected ? '0px' : '1px',
}));

const DropdownContainer = styled.div(({ type }) => ({
	backgroundColor: '#FFFFFF',
	border: '1px solid #000000',
	color: '#000000',
	float: 'left',
	fontSize: '16px',
	listStyle: 'none',
	margin: '2px 0 0',
	position: 'absolute',
	textAlign: 'left',
	zIndex: 1000,
	...(type === 'population'
		? { left: '180px', top: '-40px' }
		: { right: '194px', top: '61px' })
}));

const DropdownItem = styled.div({
	border: 0,
	color: '#292B2C',
	cursor: 'pointer',
	display: 'block',
	fontWeight: 'normal',
	padding: '8px 24px',
	textAlign: 'inherit',
	whiteSpace: 'nowrap',
	'&:hover': {
		backgroundColor: '#000000',
		color: '#FFFFFF'
	}
});

const Dropdown = ({ label, onSelect, selections, selected, type }) => {
	const [open, setOpen] = useState(false);

	return (
		<React.Fragment>
			{open ? (
				<DropdownContainer type={type}>
					{selections.map((selection, idx) => (
						<DropdownItem
							onClick={() => {
								setOpen(false);
								onSelect(selection.category);
							}}
							key={idx}>
							<div style={{ cursor: 'pointer' }}>
								{selection.label}
							</div>
						</DropdownItem>
					))}
				</DropdownContainer>
			) : null}
			<Container onClick={() => setOpen(!open)} selected={selected}>
				{label}
			</Container>
		</React.Fragment>
	);
};

export default Dropdown;
