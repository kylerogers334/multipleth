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

const Form = ({ categoryName, dispatch, enlargedState }) => {
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

	const getDropdown = (type, idx, selected) =>
		type === 'population' ? (
			<Dropdown
				key={idx}
				label="Population"
				onSelect={selection => handleSelection(selection)}
				selections={[
					{ label: 'Total', category: 'population' },
					{ label: 'Asian', category: 'asian' },
					{ label: 'Black', category: 'black' },
					{ label: 'Latino', category: 'latino' },
					{ label: 'White', category: 'white' }
				]}
				selected={selected}
				type={type}
			/>
		) : (
			<Dropdown
				key={idx}
				label="Housing Cost"
				onSelect={selection => handleSelection(selection)}
				selections={[
					{ label: 'Purchase', category: 'housing' },
					{ label: 'Rent', category: 'rent' }
				]}
				selected={selected}
				type={type}
			/>
		);

	return (
		<Container>
			<ColorPicker />
			<SelectionContainer>
				<SelectionItemsContainer>
					{[
						{
							isDropdown: true,
							categories: [
								'population',
								'asian',
								'black',
								'latino',
								'white'
							]
						},
						{ label: 'Unemployment', category: 'unemployment' },
						{ label: 'Income', category: 'income' },
						{ label: 'Age', category: 'age' },
						{ label: 'Education', category: 'education' },
						{
							isDropdown: true,
							categories: ['housing', 'rent']
						},
						{ label: 'Crime', category: 'crime' },
						{ label: '2016 Election', category: 'election' },
						{ label: 'Clear', category: 'clear' }
					].map((category, idx) =>
						category.isDropdown ? (
							getDropdown(
								category.categories[0],
								idx,
								categoryName === category.category ||
									(category.categories &&
										category.categories.includes(
											categoryName
										))
							)
						) : (
							<SelectionItem
								key={idx}
								selected={categoryName === category.category}>
								<a
									onClick={() =>
										handleSelection(category.category)
									}>
									{category.label}
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
