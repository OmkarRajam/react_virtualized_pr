import React, { Component } from 'react'
// import Async from 'react-async'
var Lorem = require('react-lorem-component');


class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state = { lorem: null };
        this.isMount = false;
    }


    componentDidMount = () => {
        this.isMount = true;

        setTimeout(() => {
            if (this.isMount) {
                this.setState({
                    'lorem': <Lorem
                        count={this.props.item}
                        paragraphLowerBound={1}
                        paragraphUpperBound={1}
                    />
                })
            }
        }, 1500);

        // this.props.measure();
    }

    componentWillUnmount = () => {
        this.isMount = false;
    }


    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.lorem !== this.state.lorem) {
            this.props.measure();
        }
    }


    render() {
        return (
            <div className='listItem'>
                <div className='listItemHeader'>Title: {this.props.index + 1}</div>
                {this.state.lorem ? this.state.lorem : 'loading...'}
            </div>
        )
    }
}

export default ListItem
