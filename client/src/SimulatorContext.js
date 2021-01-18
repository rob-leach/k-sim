import React from 'react';

// import './SimulatorContext.css'

class SimulatorContext extends React.Component {
	constructor(props) {
		super();
		// this.state = { }
	}



	render() {
		let simType = null
		let id = null
		if (this.props.state.selectedObj) {
			simType = this.props.state.selectedObj.type
			id = this.props.state.selectedObj.id
		}

		return(
            <div class="k-sim-info">
			{ this.props.state.selectedObj &&
			<React.Fragment>
				<h1>{simType} {' '} {id}
				</h1>
				<button onClick={() => this.props.simMutate([
					{ actionType: 'unselect' },
					{ actionType: 'delete', 
						simType: simType,
						id: id
					}
				]
				)}>U, D</button>
				<button onClick={() => this.props.simMutate([
					{ actionType: 'delete', 
						simType: simType,
						id: id
					},
					{ actionType: 'unselect' }
				]
				)}>D, U</button>
			</React.Fragment>
            }
            </div>
		);
	}
}

export default SimulatorContext;