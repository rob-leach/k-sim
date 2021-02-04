import React from 'react';

class VisInstance extends React.Component {
	constructor(props) {
		super();
    }

	render() {
        return(<g className="k-sim-instance">
            <rect 
                x={this.props.x} 
                y={this.props.y}
                width={this.props.width} 
                height={this.props.height}
                fill="rgb(220,220,220)"
            />
            <text 
                // textLength={this.props.width / 2}
                x={this.props.x + this.props.width / 4}
                y={this.props.y}
                dominantBaseline="hanging">
                {this.props.iId}
            </text>
        </g>)
    }

}
class VisInstances extends React.Component {
	constructor(props) {
		super();
    }

	render() {
        const num = this.props.ids.length

        const marginY = this.props.height / 20 // *shrug*
        const wiggleX = this.props.width / 10  // *shrug*
        

        const perHeight = (this.props.height - ( num * marginY ) ) /  ( num + 1 )
        const perWidth = (this.props.width - 2 * wiggleX)

        const finalComps = []
        let xOffset = this.props.x + wiggleX
        let yOffset = this.props.y
        let n = 0
        for (let id of this.props.ids) {
            finalComps.push(
                <VisInstance 
                    iId={id} 
                    sim={this.props.sim}
                    x={xOffset}
                    y={yOffset}
                    width={perWidth}
                    height={perHeight}
                />
            )
            n++
            if ( n % 2 ) { 
                xOffset += wiggleX 
            } else {
                xOffset -= wiggleX
            }
            yOffset += marginY + perHeight
        }

        return(
            <g className="k-sim-instances">{finalComps}</g>
        )
    }

}

export default VisInstances