import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Style from './styles.js';

export default class Paginations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleClick = this.handleClick.bind(this);
        this.renderPageIndex = this.renderPageIndex.bind(this);
    }
    handleClick(i) {
        //make a get request to server with page number
        this.props.cb(i);
    }

    renderPageIndex() {
        const pageIndex = [];
        let totalReviews = this.props.searchReviews;
        for(let i = 1; i <= Math.ceil(totalReviews/5); i++) {
            pageIndex.push(
                    <PaginationItem style={Style.pageItemStyling} key={i} onClick={this.handleClick.bind(this,i)}>
                        <PaginationLink style={Style.pageNumberStyling} href="#">{i}</PaginationLink>
                    </PaginationItem>)           
        }
        return pageIndex
    }
    render() {
        return (
            <div style={Style.pageIndexStyling}>
                <Pagination size="sm">
                    {this.renderPageIndex()}
                </Pagination>
            </div>
        )
    }
}