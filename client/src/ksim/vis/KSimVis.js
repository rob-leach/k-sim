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
    <div className="k-sim-vis">
      Simulation Viewer
      <pre>{JSON.stringify(this.props.sim, null, 4)}</pre>
	</div>
    );
  }
}

export default KSimVis;