import React, { Component } from 'react';
import VisOneTopicFlow from './VisOneTopicFlow.js'
class KSimVis extends Component {
	constructor(props) {
    super(props)
    // Here we set up a completely empty state
	  this.state = { }
	}
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    if (this.props.sim.topics.ids.length < 1) { return (<div className="k-sim-vis"> No topics to visualize. </div>) }

    const svgDim = {
      width: (this.props.svgWidth ? this.props.svgWidth : 600),
      height: (this.props.svgHeight ? this.props.svgHeight : 600),
    }

    const topicId = this.props.sim.topics.ids[0]
    //FIXME:  For now we just visualize one topic
  	return (
    <div className="k-sim-vis">
      <svg className="k-sim-svg" width={svgDim.width} height={svgDim.height}>
        <VisOneTopicFlow topicId={topicId} sim={this.props.sim}/>
      </svg>
      Raw simulation data
      <pre>{JSON.stringify(this.props.sim, null, 4)}</pre>
	</div>
    );
  }
}

export default KSimVis;