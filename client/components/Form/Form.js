import React from 'react';
import { connect } from 'react-redux';

import Dropdown from './Dropdown';
import {
	Container,
	SelectionContainer,
	SelectionItem,
	SelectionItemsContainer
} from './formComponents';
import ColorPicker from './ColorPicker';

import { clearMap, fetchCategoryState } from '../../actions/actionHandleData';
import { fetchCategoryCounty } from '../../actions/actionHandleData';

const Form = ({ dispatch, enlargedState }) => {
	const handleSelection = selection => {
		selection === 'clear'
			? dispatch(clearMap())
			: !enlargedState
			? dispatch(fetchCategoryState(selection))
			: (() => {
					dispatch(fetchCategoryState(selection));
					dispatch(
						fetchCategoryCounty(
							selection,
							enlargedState.attributes[2].value
						)
					);
			  })();
	};

	const getDropdown = (type, idx) =>
		type === 'population' ? (
			<Dropdown
				key={idx}
				label="Population"
				onSelect={selection => handleSelection(selection)}
				selections={['Total', 'White', 'Asian', 'Latino', 'Black']}
			/>
		) : (
			<Dropdown
				key={idx}
				label="Housing Cost"
				onSelect={selection => handleSelection(selection)}
				selections={['Purchase', 'Rent']}
			/>
		);

	return (
		<Container>
			<ColorPicker />
			<SelectionContainer>
				<SelectionItemsContainer>
					{[
						'Unemployment',
						'Dropdown-population',
						'income',
						'age',
						'education',
						'Dropdown-housing',
						'crime',
						'election',
						'clear'
					].map((category, idx) =>
						category.includes('Dropdown') ? (
							getDropdown(category.split('-')[1], idx)
						) : (
							<SelectionItem key={idx}>
								<a
									onClick={() =>
										handleSelection(category.toLowerCase())
									}>
									{category === 'election'
										? '2016 Election'
											? category === 'clear'
											: 'Clear Map'
										: category}
								</a>
							</SelectionItem>
						)
					)}
				</SelectionItemsContainer>
			</SelectionContainer>
		</Container>
	);
};

const mapStateToProps = state => ({
	categoryCountyData: state.categoryCountyData,
	categoryName: state.categoryName,
	categoryStateData: state.categoryStateData,
	enlargedState: state.enlargedState
});

export default connect(mapStateToProps)(Form);
