import React from 'react';
import { connect } from 'react-redux';

import { legendHelper } from '../../helpers/legendHelper';

export class StateLegend extends React.Component {
	componentDidUpdate() {
		const categoryHelper = legendHelper(this.props.categoryName);

		if (this.props.categoryName === null) {
			categoryHelper();
			return;
		}

		// Election category is a special case, its legend is much different.
		if (this.props.categoryName === 'election') {
			// election is a completely different dataset requiring
			// a completely different legend
			categoryHelper('election');
			return;
		}

		const adjustedRange = legendHelper('range-adjust')(
			'state',
			this.props.categoryName,
			categoryHelper(this.props.categoryStateData)
		);

		legendHelper('load')(adjustedRange, this.props.categoryName, 'state');
	}

	render() {
		return <g className="state-legend" />;
	}
}

const mapStateToProps = state => ({
	categoryName: state.categoryName,
	categoryStateData: state.categoryStateData,
	color: state.color
});

export default connect(mapStateToProps)(StateLegend);
