import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../../actions/actionInfoModal';
import {
	CloseButton,
	CloseIcon,
	Container,
	Content,
	TextContainer,
	Title
} from './styledComponents';

const HelpContent = () => (
	<React.Fragment>
		<p>
			The purpose of this app is to view several datasets about the United
			States in a visual and colorful way.
		</p>
		<p>
			Select something you'd like to know about the US from the bottom and
			it will display the data for each state.
		</p>
		<p>If you want to know more about a specific state, click on it!</p>
		<p>Mouseover an area to see exact data.</p>
		<p>You can even change the display color.</p>
	</React.Fragment>
);

const AboutContent = () => (
	<React.Fragment>
		<p>Thank you for visiting Multipleth!</p>
		<p>
			If you are unsure how to use this app, please click on the help
			button on the top left.
		</p>
		<p>
			The name is derived from multiple + choropleth, which is a map whose
			areas are shaded and/or proportioned to a dataset.
		</p>
		<p>
			Data is taken from the <span> </span>
			<a
				target="_blank"
				href="https://data.census.gov/cedsci/">
				Census Bureau
			</a>
			.
		</p>
		<p>
			Curious how this was made? Check out the source code
			<span> </span>
			<a
				target="_blank"
				href="https://github.com/kylerogers334/multipleth">
				here!
			</a>
		</p>
	</React.Fragment>
);

export const InfoModal = ({ dispatch, type }) => (
	<Container>
		<Content>
			<CloseButton>
				<a onClick={() => dispatch(hideModal())}>
					<CloseIcon />
				</a>
			</CloseButton>
			<Title>{type === 'about' ? 'About' : 'Help'}</Title>
			<TextContainer>
				{type === 'about' ? <AboutContent /> : <HelpContent />}
			</TextContainer>
		</Content>
	</Container>
);

const mapStateToProps = state => ({
	showInfoModal: state.showInfoModal
});

export default connect(mapStateToProps)(InfoModal);
