import { defineStore } from 'pinia'

type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;// maybe error

    export interface Simulation {
        id: number,
        name: string,
        model_name: string,
        json_data:  JSONValue 
}
    
export type SimulationType = {
    simulation: Simulation
}

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useSimStore = defineStore("SimStore", {
    // other options...
    state: () => {
        return {
            simulation: SimulationType
        }
    },
})