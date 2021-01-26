import React, { Component } from 'react';
import KSimCtl from './KSimCtl.js'
import KSimVis from './KSimVis.js'
import KSimCtx from './KSimCtx.js'
import { newSim, tick } from './engine/KSimEngine.js'
import { instAddSimpleFlow } from './data/instAddSimpleFlow.js'

class KSim extends Component {
  constructor(props) {
    super(props)
    // Here we set up a completely empty state
    const sim = newSim()

    this.state = { 
      "sim": sim, 
      "requestedActions": instAddSimpleFlow
    }
	}
    componentDidMount() {
      //Apply the initialization to state
      this.setState(
        tick(this.state)
      )
    }

    componentWillUnmount() {}

    render() {
  	return (
    <div class="k-sim">
      <KSimCtl sim={this.state.sim}/>
      <KSimVis sim={this.state.sim}/>
      <KSimCtx selection={this.state.sim.selection}/>
		</div>
    );
  }
}

export default KSim;