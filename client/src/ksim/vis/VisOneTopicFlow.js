import React from 'react';
import VisInstances from './VisInstances.js'
import VisPartitions from './VisPartitions.js'
import VisBrokers from './VisBrokers.js'

import { whatDrainsToTopic, whatSourcesFromTopic, whatPartitionsInThisTopic, whatHostsThesePartitions } from '../utils/utils.js'

class VisOneTopicFlow extends React.Component {
	constructor(props) {
		super();
    }

	render() {
        const instancesProducing = whatDrainsToTopic(this.props.topicId, this.props.sim)
        const partitions = whatPartitionsInThisTopic(this.props.topicId, this.props.sim)
        const brokers = whatHostsThesePartitions(partitions, this.props.sim)
        const instancesConsuming = whatSourcesFromTopic(this.props.topicId, this.props.sim)

        console.log(`VisOneTopicFlow(${this.props.topicId})`)
        console.log('producers:', instancesProducing)
        console.log('partitions:', partitions)
        console.log('consumers:', instancesConsuming)
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