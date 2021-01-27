import { cloneDeep } from "lodash"
import { applyActions } from './actions.js'

export const newSim = () => {
    return( {
        "clusters":   { "byId": {}, "ids": [], "nextId": 0 }, // Globally unique cX
        "topics":     { "byId": {}, "ids": [], "nextId": 0 }, // Globally unique tX  (not required, but easy)
        "partitions": { "byId": {}, "ids": []  },  //do not global id num
        "brokers":    { "byId": {}, "ids": [], "nextId": 0 }, // Globally unique bX  (not required, but easy)
        "replicas":   { "byId": {}, "ids": []  },  //do not global id num
        "groups":     { "byId": {}, "ids": [], "nextId": 0 }, // Globally unique gX  (not required, but easy)
        "instances":  { "byId": {}, "ids": [], "nextId": 0 }, // Globally unique iX  

        "systemStats": {  // TODO: Consider a function that yields an empty systemStats state?
            "totalSourced": 0,
            "totalDrained": 0,
            "totalReplicated": 0, 
            "totalTicks": 0,
            "totalRequestedCapacity": 0,
            "totalUnusedCapacity": 0,
            "totalUsedCapacity": 0
        },
        "gen": 0,  // Generation number is not tick number, every mutation makes a new generation
        "lock": {  // Engine will mark "lock.isLocked" to True before calculating new ticks. Changes should not be performed during locks.
            "owner": 0, // Engine will store a nonce here for their action id
            "isLocked": false // Engine when `true` no others should attempt a state update to the simulator
        },
        "selection": {
            "simType": null,
            "id": null,
            "details": null
        }
    })
}

export const calcTock = (sim) => {
    const nextSim = cloneDeep ( sim )
    //FIXME: don't just return the old state make a new one!

    return(nextSim) 
}

export const tick = (state) => {
    const gotLock = true //TODO: actually implement locking

    if (gotLock) {
        const updatedSim = applyActions( state.sim, state.requestedActions )

        const finalSim = calcTock(updatedSim)
        console.log('DELETEME final tick state', finalSim)
        return({
            ...state,
            sim: finalSim,
            requestedActions: []
        })
    }
}
