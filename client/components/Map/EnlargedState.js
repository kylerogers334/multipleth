import React from 'react';
import { connect } from 'react-redux';

import { countyHelper } from '../../helpers/countyHelpers';
import { fetchCategoryCounty } from '../../actions/actionHandleData';

export class EnlargedState extends React.Component {
	componentDidUpdate() {
		if (this.props.categoryCountyData) {
			countyHelper(this.props.categoryName)(
				this.props.categoryCountyData
			);
		} else if (this.props.categoryCountyData === null) {
			countyHelper('clear')();
		}
	}

	componentDidMount() {
		if (this.props.categoryName) {
			this.props.dispatch(
				fetchCategoryCounty(
					this.props.categoryName,
					this.props.enlargedState.attributes[2].value
				)
			);
		}

		// Always show an empty state;
		countyHelper('blankLoad').call(this);
	}

	render() {
		return (
			<path
				d={this.props.enlargedState.attributes[0].value}
				className="state-enlarged"
				id={this.props.enlargedState.id}
			/>
		);
	}
}

const mapStateToProps = state => ({
	categoryCountyData: state.categoryCountyData,
	categoryName: state.categoryName,
	color: state.color,
	enlargedState: state.enlargedState,
	usStatesLineData: state.usStatesLineData
});

export default connect(mapStateToProps)(EnlargedState);
