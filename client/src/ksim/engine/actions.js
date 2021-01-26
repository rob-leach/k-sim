import { cloneDeep, has } from "lodash"
import { hasRequiredKeys } from "../utils/utils.js"
import { makeReplicaPlacement } from "./cluster.js"

export const applyActions = (sim, actions) => {

    var updatedSim = cloneDeep( sim )

    for (let action of actions) {
        updatedSim = applyAction(updatedSim, action)
    }

    return(updatedSim)
}

export const applyAction = (sim, action) => {
    if (!has(action, 'payload')) {
        console.log("applyAction received action with no payload!", action)
        return(sim) // Ignore calls without a payload
    }

    switch (action.action) {
        case 'addCluster':
            return(addCluster(sim, action.payload))
        case 'addBroker':
            return(addBroker(sim, action.payload))
        case 'addTopic':
            return(addTopic(sim, action.payload))
        case 'addPartition':
            return(addPartition(sim, action.payload))
        case 'addReplica':
            console.log(`applyAction(${action.action}) is indirectly perfomed by adding partitions`)
            return(sim)
        default:
            console.log(`applyAction(${action.action}) is unsupported`)
            return(sim)
    }
}

export const addCluster = (sim, payload) => {
    const requiredKeys = [ 'name' ]
    const myFuncName = 'addCluster'
    if (!hasRequiredKeys(payload, requiredKeys, myFuncName)) { return(sim) }

    const updatedSim = cloneDeep (sim)
    const cId = `c${updatedSim.clusters.nextId}`
    const c = {
        'id': cId,
        'name': payload.name,
        'brokers': [],
        'topics': [],
        'nextTopicId': 0
    }
    
    updatedSim.clusters.byId[cId] = c
    updatedSim.clusters.ids.push(cId)
    updatedSim.clusters.nextId++

    return(updatedSim)
}

export const addBroker = (sim, payload) => {
    // const requiredKeys = [ ]
    // const myFuncName = 'addBroker'
    // if (!hasRequiredKeys(payload, requiredKeys, myFuncName)) { return(sim) }

    const updatedSim = cloneDeep (sim)

    let cId = updatedSim.clusters.ids[updatedSim.clusters.ids.length - 1]
    if (has(payload, 'clusterId')) { cId = payload.clusterId }

    const bId = `${cId}b${updatedSim.brokers.nextId}`

    const b = {
        'id': bId,
        'clusterId': cId,
        'replicas': []
    }
   
    updatedSim.brokers.ids.push(bId)
    updatedSim.brokers.byId[bId] = b
    updatedSim.brokers.nextId++

    updatedSim.clusters.byId[cId].brokers.push(bId)

    return(updatedSim)
}

export const addTopic = (sim, payload) => {
    const requiredKeys = [ 'name', 'numReplicas' ]  //FIXME: These don't _feel_ required, but for laziness let's push it up to the user
    const myFuncName = 'addTopic'
    if (!hasRequiredKeys(payload, requiredKeys, myFuncName)) { return(sim) }

    const updatedSim = cloneDeep (sim)

    let cId = updatedSim.clusters.ids[updatedSim.clusters.ids.length - 1]
    if (has(payload, 'clusterId')) { cId = payload.clusterId }

    const tId = `${cId}t${updatedSim.topics.nextId}`

    const t = {
        'id': tId,
        'name': payload.name,
        'clusterId': cId,
        'numReplicas': payload.numReplicas,
        'partitions': [],
        'nextPartitionId': 0
    }
   
    updatedSim.topics.ids.push(tId)
    updatedSim.topics.byId[tId] = t
    updatedSim.topics.nextId++

    updatedSim.clusters.byId[cId].topics.push(tId)

    return(updatedSim)
}

// NOTE: Adding P partitions also adds (P*numReplicas) replicas
export const addPartition = (sim, payload) => {
    // const requiredKeys = [ ]
    // const myFuncName = 'addPartition'
    // if (!hasRequiredKeys(payload, requiredKeys, myFuncName)) { return(sim) }

    const updatedSim = cloneDeep (sim)

    let tId = updatedSim.topics.ids[updatedSim.topics.ids.length - 1]
    if (has(payload, 'topicId')) { tId = payload.topicId } //TODO: Support lookup by cluster+name?

    const cId = updatedSim.topics.byId[tId].clusterId
    const pId = `${tId}p${updatedSim.topics.byId[tId].nextPartitionId}`

    let replicaIds = []
    for ( let rNum = 0; rNum < updatedSim.topics.byId[tId].numReplicas; rNum++ ) {
        const rId = `${pId}r${rNum}`

        const bId = makeReplicaPlacement(updatedSim, cId, rId)

        const r = {
            'id': rId,
            'brokerId': bId,
            'partitionId': pId,
            'maxOffset': 0,
            'minOffset': 0
        }

        replicaIds.push(rId)
        updatedSim.replicas.ids.push(rId)
        updatedSim.replicas.byId[rId] = r

        updatedSim.brokers.byId[bId].replicas.push(rId)
    }

    const p = {
        'id': pId,
        'topidId': tId,
        'replicas': replicaIds
    }
   
    updatedSim.partitions.ids.push(pId)
    updatedSim.partitions.byId[pId] = p

    updatedSim.topics.byId[tId].partitions.push(pId)
    updatedSim.topics.byId[tId].nextPartitionId++

    return(updatedSim)
}