import React, { Component } from 'react';

export default class Count extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <p>Number of todos: {this.props.count}</p>
    }
}