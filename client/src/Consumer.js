import React from 'react';

class ConsumerPartition extends React.Component {
	constructor(props) {
		super();
		this.state = { };
	}

	render() {
		//TODO:  **CSS STYLING!**
		const lagColor = 'red'
		const defaultColor = 'lightgray'

		const fillColor = ( (this.props.lag > (this.props.consumeRate * 2)) ? lagColor : defaultColor )

		const r = Math.max(5, Math.log(this.props.lag) * 7)
		return(
			<circle 
				cx={this.props.xPos} 
				cy={this.props.yPos} 
				fill={fillColor}
				stroke="black"
				r={r}
			>
				{this.props.lag}
			</circle>
		)

		//<div>---p({this.props.partitionId}) lag: {this.props.lag} current: {this.props.currentOffset}  </div>
	}
}


class Consumer extends React.Component {
	constructor(props) {
		super();
		this.state = { };
	}

	render() {
		const aComps = []
		let cId = this.props.c.consumerId
		// Mathy bits for the actual stuff
		let totalLag = 0
		let totalOffsets = 0

		// Graphy bits 
		let gw = 100 //X Group Width
		let gh = 600 //Group Height
		let yPos = 40
		let yIncr = (gw / 2)
		let xPos = (gw / 6)
		let xDiff = ( gw * 2 / 3)
		let sign = -1
		for (let myPartition of this.props.c.srcPartitions) {
			let a = this.props.partitions[myPartition.partitionId]
			let lag = a.maxOffset - myPartition.currentOffset
			totalLag += lag
			totalOffsets += myPartition.currentOffset
			aComps.push(<ConsumerPartition 
				partitionId={myPartition.partitionId} 
				currentOffset={myPartition.currentOffset}
				lag={lag}
				consumeRate={this.props.c.consumeRate}
				xPos = {xPos}
				yPos = {yPos}
				 />) 

			sign *= -1
			xPos += xDiff*sign
			yPos += yIncr
		}

		return(
			<g class="consumer-group" id={"consumer-" + cId} transform={`translate(${cId * gw} 0 )` }>
				<text x="1" y={`${gh - 60}`}>L:{totalLag}</text>
				<text x="1" y={`${gh - 40}`}>T:{totalOffsets}</text>
				<text x="1" y={`${gh - 20}`}>Consumer-{cId}</text>
				{aComps}
			</g>
		);
	}
}

export default Consumer;
