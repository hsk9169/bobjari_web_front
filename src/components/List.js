import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        articles: state.articles
    };
};

// Stateless Component
const ConnectedList = ({ articles }) => (
    <ul className="list-group list-group-flush">
        {articles.map(element => (
            <li className="list-grop-item" key={element.id}>
                {element.title}
            </li>
        ))}
    </ul> 
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;