# k-sim
kafka simulator 

A simple simulator trying to work through bottleneck/constraints theory as applied to a few simple Kafka topologies.

## Requirements
(See `client` for local development details. Basically, it's a create-react-app project.)

# Using Kafka Simulator
## Basic local usage
_Note: this needs additional work for better UX_
Go into the "client" directory and run:  `npm install` then `npm start`

An example simulation will open when you navigate to http://localhost:3000

## Advanced local usage
_Note: this needs additional work for better UX_
Navigate to `src/ksim/data/` and inspect the example `instXXXX.js` files.

Currently `instTwoTopics.js` is what will be loaded by `src/ksim/KSim.js`, you can experiment by directly editing that file, then reloading your browser.  The "actions" that you configure in that file have additional undocumented options that can be discovered in `src/ksim/engine/actions.js`.