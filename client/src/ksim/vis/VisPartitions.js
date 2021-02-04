import React from 'react';

class VisPartition extends React.Component {
	constructor(props) {
		super();
    }
    render() {
		let pId = this.props.pId
        let rId = this.props.sim.partitions.byId[pId].replicas[0]
        
        const myOffset = this.props.sim.replicas.byId[rId].maxOffset //HACK: this isn't always true, but probably is
        const extraOffsets = myOffset - this.props.minOffset
        const heightBonus = extraOffsets * this.props.heightPerBonusOffset
        const height = heightBonus + this.props.minHeight
        const yOffset = this.props.maxHeight - height

        const pos = {
            x: this.props.x,
            y: (this.props.y + yOffset)
        }

        const labelY = pos.y //Align to the top of the rectangle
		return(
			<g className="g-partition" 
				key={`partition-${pId}`} 
				//onClick={() => this.props.handleSimClick({type: 'partition', id: aId})} 
			>
				<rect 
					x={pos.x}
					y={pos.y}
					width={this.props.width}
					height={height}
					fill='steelblue'
					stroke='black'
				/>
				<text 
					textAnchor="end" 
					transform={`translate(${pos.x + this.props.width *2/3 } , ${labelY - 2 }) rotate(65)`} > 
					{myOffset} ({pId})
				</text>
			</g>
		);
    }
}

class VisPartitions extends React.Component {
	constructor(props) {
		super();
    }

    getHighestMaxOffset(partitions, sim) {
        let maxOffset = 0 
        for (let pId of partitions) {
            for (let rId of sim.partitions.byId[pId].replicas) {
                if (sim.replicas.byId[rId].maxOffset > maxOffset) { 
                    maxOffset = sim.replicas.byId[rId].maxOffset
                }
            }
        }
        return(maxOffset)
    }

    getLowestMaxOffset(partitions, sim) {
        let minOffset = Infinity

        for (let pId of partitions) {
            let maxOffset = 0
            for (let rId of sim.partitions.byId[pId].replicas) {
                if (sim.replicas.byId[rId].maxOffset > maxOffset) { 
                    maxOffset = sim.replicas.byId[rId].maxOffset
                }
            }
            if (maxOffset < minOffset) {
                minOffset = maxOffset
            }
        }
        return(minOffset)
    }

	render() {
        if (this.props.ids === null ) { return null }
        const num = this.props.ids.length
        if (num === 0 ) { return null }
        const marginX = this.props.width / 30 // *shrug*
        const perWidth = (this.props.width - ( num * marginX ) ) /  ( num + 1 )

        const maxHeight = this.props.height * 4 / 5
        const minHeight = maxHeight * 3 / 10

        const maxOffset = this.getHighestMaxOffset(this.props.ids, this.props.sim)
        const minOffset = this.getLowestMaxOffset(this.props.ids, this.props.sim)

        // Lowest will always be min, highest will always be max, this factor is for the inbetweens
        const heightPerBonusOffset = (maxHeight - minHeight) / (maxOffset - minOffset)

        let xOffset = this.props.x
        let yOffset = this.props.y + (this.props.height - maxHeight)
        //let n = 0
        const finalComps = []
        for (let pId of this.props.ids) {
            finalComps.push(
                <VisPartition
                    x={xOffset}
                    y={yOffset}
                    width={perWidth}
                    maxHeight={maxHeight}
                    minHeight={minHeight}
                    heightPerBonusOffset={heightPerBonusOffset}
                    minOffset={minOffset}
                    pId={pId}
                    sim={this.props.sim}
                />)
            //n++
            xOffset += perWidth + marginX
        }

        return(<g className="k-sim-partitions">{finalComps}</g>)
    }

}

export default VisPartitions

