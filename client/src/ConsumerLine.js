import React from 'react';

class ConsumerLine extends React.Component {
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

		for (let myPartition of this.props.c.srcPartitions) {
			let a = this.props.partitions[myPartition.partitionId]
			let aR = this.props.partitionRectangles[myPartition.partitionId]

			let lag = a.maxOffset - myPartition.currentOffset
			totalLag += lag
			totalOffsets += myPartition.currentOffset

			
			let yPos = aR.y + lag
			aComps.push(
				<React.Fragment>
					<line
						x1={aR.x - 5}
						x2={aR.x + aR.width + 5}
						y1={yPos}
						y2={yPos}
						stroke='purple'
						stroke-width="6"
						/>
				</React.Fragment>
			) 
		}

		return(
			<g class="consumer-group" id={"consumer-" + cId}>
				{aComps}
			</g>
		);
	}
}

export default ConsumerLine;
