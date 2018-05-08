import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Style from './styles';
import ReviewItem from './ReviewItem.jsx'
import Paginations from './Paginations.jsx';
import Ratings from './Ratings.jsx';
import 'bootstrap/dist/css/bootstrap.css';

export default class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews : [],
            totalReviews : 0,
            pageIndex : 1,
            averageRatings : [],
            keyword: '',
            searchResultsReviewsTotal: 0,
        };
        this.getReviews = this.getReviews.bind(this);
        this.renderReviews = this.renderReviews.bind(this);
        this.searchKeyword = this.searchKeyword.bind(this);
    }
    componentDidMount() {
        this.getReviews();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.locationId !== this.props.locationId) {
            this.getReviews();
        }
    }
    getReviews(pageIndex, keyword){
        if (pageIndex == null) {   //checks for both null and undefined 
            pageIndex = this.state.pageIndex;
        }
        if (keyword == null) {
            keyword = this.state.keyword;
        }
        axios.get(`http://127.0.0.1:3000/reviews/${this.props.locationId}`, {
            params : {
                index: pageIndex,
                keyword: keyword
            }
        })
        .then(reviews => { 
            var newStateObj = {
                reviews: reviews.data.getFive, 
                totalReviews: reviews.data.totalReviews,
                keyword: keyword,
                searchResultsReviewsTotal: reviews.data.searchResultsReviewsTotal,
            }
            if (reviews.data.averageRatings) {
                newStateObj['averageRatings'] = reviews.data.averageRatings;
            } 
            this.setState(newStateObj);                          
        })
        //reviews => this.setState({reviews: reviews.data})) 
        .catch(function(error) {
            console.log('axios get req error-', error)
        });
    }
    renderReviews() {
        // console.log('inside renderReviews() reviews and count-', this.state.reviews);    
        return this.state.reviews.map((review, index) => {
            return <ReviewItem key={index} review={review}/>
        })
    }
    searchKeyword(keyword) {
        // console.log('inside searchKeyword-keyword-', keyword); 
        this.getReviews(1, keyword); 
    }
    render() {      
        return (
            <div style={Style.reviewComponent}>
            <Ratings averageRatings={this.state.averageRatings} totalReviews={this.state.totalReviews} searchKeyword={this.searchKeyword}/>
            <div>{this.renderReviews()}</div> 
            <Paginations cb={this.getReviews} searchReviews={this.state.searchResultsReviewsTotal}/>
            </div>        
        )
    }
}