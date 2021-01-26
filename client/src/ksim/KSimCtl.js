import React, { Component } from 'react';
class KSimCtl extends Component {
	constructor(props) {
        super(props)
        // Here we set up a completely empty state
	    this.state = { 
        }
	}
    componentDidMount() {}

    componentWillUnmount() {}

    render() {
  	return (
    <div class="k-sim-ctl">
      Simulation Control
	</div>
    );
  }
}

export default KSimCtl;