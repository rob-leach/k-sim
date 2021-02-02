import React, { Component } from 'react';


class KSimCtl extends Component {
	constructor(props) {
        super()
        // Here we set up a completely empty state
	    this.state = { 
        }
	}
    componentDidMount() {}

    componentWillUnmount() {}

    render() {
      const instancePayload = {
      'name': 'dynamic',
      'perfData': { 'capacity': 10 },
      'backlog': { 'maxBacklog': 100 }
      }

      const sourceKafkaPayload = {'action': 'addSource', 'payload': { 'type': 'group', 'rateLimit': 999 }}
      const drainKafkaPayload = { 'type': 'topic', 'rateLimit': 999 }
  	return (
    <div className="k-sim-ctl">
      Simulation Control
      <button className="actionRequest" onClick = {() => this.props.requestAction("addPartition", {})}>Add Partition</button>
      <button className="actionRequest" onClick = {() => this.props.requestAction("addInstance", instancePayload)}>Add Instance</button>
      <button className="actionRequest" onClick = {() => this.props.requestAction("addSource",  sourceKafkaPayload)}>Set Kafka Source</button>
      <button className="actionRequest" onClick = {() => this.props.requestAction("addDrain", drainKafkaPayload)}>Set Kafka Drain</button>
	</div>
    );
  }
}

export default KSimCtl;