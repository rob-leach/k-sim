import React, { Component } from 'react';
import AsyncLock from 'async-lock';
import KSimCtl from './KSimCtl.js'
import KSimVis from './vis/KSimVis.js'
import KSimCtx from './KSimCtx.js'
import { newSim, tick } from './engine/KSimEngine.js'
import { instAddSimpleFlow } from './data/instAddSimpleFlow.js'

class KSim extends Component {
  constructor(props) {
    super(props)
    // Here we set up a completely empty state
    const sim = newSim()
    this.lock = new AsyncLock()

    this.state = { 
      "sim": sim, 
      "requestedActions": instAddSimpleFlow,
      "lock": {
        "owner": 0,
        "isLocked": false
      }
    }
  }
  lockTickTock() {
    const nonce = Math.floor( Math.random() * 100000 ) // Our "key"

    //console.log(`lock(${nonce}) tick, tock: `)
    this.lock.acquire('sim', function() {
      if (!this.state.lock.isLocked) { //Do not even attempt to use the lock if state is bad
        this.setState({...this.state,  //This informs the world what state we locked into
          lock: {
          "owner": nonce,
          "isLocked": true
        }
        }, () => { this.setState(tick(this.state, nonce)) } )// This applies a tick(), which also clears the "lock"
      } else {
        console.log(`lockTickTock: Skipping update, simulator left in "locked" state by ${this.state.nonce}.`)
      } 
    }.bind(this))
  }

  componentDidMount() {
    //Apply the initialization to state
    this.lockTickTock()
    
    this.setState({
      intervalOne:  setInterval( () => this.lockTickTock(), 100 )
    })
  }

  componentWillUnmount() {}

  render() {
  	return (
    <div className="k-sim">
      <button className="forceTick" onClick = {() => this.lockTickTock()}>tick!</button>
      <KSimCtl sim={this.state.sim} lockTickTock={this.lockTickTock}/>
      <KSimVis sim={this.state.sim}/>
      <KSimCtx selection={this.state.sim.selection}/>
		</div>
    );
  }
}

export default KSim;