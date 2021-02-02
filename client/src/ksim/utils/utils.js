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