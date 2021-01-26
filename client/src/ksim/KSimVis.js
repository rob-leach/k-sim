import React, { Component } from 'react';
class KSimVis extends Component {
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
    <div class="k-sim-vis">
      Simulation Viewer
	</div>
    );
  }
}

export default KSimVis;