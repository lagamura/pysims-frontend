import { defineStore } from 'pinia'

type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;// maybe error

    interface Simulation {
        id: number,
        name: string,
        model_name: string,
        json_data:  JSONValue 
}

const simulation: Simulation = {
    id : 0,
    name : "no_name_yet",
    model_name : "no_model_name_yet",
    json_data : "no_json_data_yet"
}
    
// export type SimulationType = {
//     simulation: Simulation
// }

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore("Store", {
    // other options...
    state: () => {
        return {
            simulation
        }
    },
})
