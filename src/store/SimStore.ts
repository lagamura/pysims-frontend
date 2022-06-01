import { defineStore } from 'pinia'

type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;// maybe error

    interface Simulation {
        id: number | undefined,
        name: string | undefined,
        model_name: string | undefined,
        json_data:  JSONValue | undefined
}

const simulation: Simulation = {
  id: undefined,
  name: undefined,
  model_name: undefined,
  json_data: undefined
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
