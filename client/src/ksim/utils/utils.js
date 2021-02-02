import { has } from "lodash"

export const hasRequiredKeys = (payload, keys, label) => {
    for (let k of keys) {
        if (!has(payload, k)) {
            console.log(`${label} invoked, payload missing required key ${k}`, payload)
            return(false)
        }
    }
    return(true)
}


export const whatDrainsToTopic = (topicId, sim) => {
    return([])
}

export const whatSourcesFromTopic = (topicId, sim) => {
    return([])
}

export const whatPartitionsInThisTopic = (topicId, sim) => {
    return(sim.topics.byId[topicId].partitions)
}

export const whatHostsThesePartitions = (partitions, sim) => {
    return([])
}