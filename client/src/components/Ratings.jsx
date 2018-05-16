import React from 'react';
import ReactDOM from 'react-dom';
import Style from './styles';
import StarWidget from './StarWidget.jsx';
import Search from './Search.jsx';

export default class Ratings extends React.Component {
    constructor(props) {
        super(props);
        this.renderLeftRatings = this.renderLeftRatings.bind(this);
        this.renderRightRatings = this.renderRightRatings.bind(this);
        this.renderOverallRatings = this.renderOverallRatings.bind(this);
    }
    renderLeftRatings() {
        const leftKeys = ['Accuracy', 'Communication', 'Cleanliness'];
        return leftKeys.map((category, index) => (
            <div key={index} style={Style.categoryRatingItem}>
                <div style={Style.categoryRatingItemLabel}>{category}</div>
                <StarWidget rating={this.props.averageRatings[category] || 0} />
            </div>
        ))
    }
    renderRightRatings() {
        const rightKeys = ['CheckIn', 'Location', 'Value'];
        return rightKeys.map((category, index) => (
            <div key={index} style={Style.categoryRatingItem}>
                <div style={Style.categoryRatingItemLabel}>{category}</div>
                <StarWidget rating={this.props.averageRatings[category] || 0} />
            </div>
        ));
    }
    renderOverallRatings() {
        return <div style={Style.summaryReviewStyling}>
            <div style={Style.summaryReviewTextRatingStyling}>
                <div style={Style.summaryReviewTextStyling}>{this.props.totalReviews} Reviews</div>
                <StarWidget rating={this.props.averageRatings['overallRating'] || 0} />
            </div>
            <Search cb={this.props.searchKeyword} />
        </div>
    }

    render() {
        return (
            <div>
                <div>{this.renderOverallRatings()}</div>
                <div style={Style.categoryRatingStyling}>
                    <div style={Style.categoryRatingLeft}>{this.renderLeftRatings()}</div>
                    <div style={Style.categoryRatingRight}>{this.renderRightRatings()}</div>
                </div>
            </div>
        )
    }
}
