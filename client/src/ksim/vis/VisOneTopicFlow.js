import React from 'react';
import VisInstances from './VisInstances.js'
import VisPartitions from './VisPartitions.js'
import VisBrokers from './VisBrokers.js'

class VisOneTopicFlow extends React.Component {
	constructor(props) {
		super();
    }

	render() {
        const instancesProducing = []
        const partitions = []
        const brokers = []
        const instancesConsuming = []

        //console.log(`VisOneTopicFlow(${this.props.topicId})`)
        return(
            <g className="k-sim-topic-flow">
                <VisInstances ids={instancesProducing} sim={this.props.sim}/>
                <VisPartitions ids={partitions} sim={this.props.sim}/>
                <VisBrokers ids={brokers} sim={this.props.sim}/>
                <VisInstances ids={instancesConsuming} sim={this.props.sim}/>
            </g>
        )
    }
}

export default VisOneTopicFlow