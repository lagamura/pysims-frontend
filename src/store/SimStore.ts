import { useInitState } from '@/composables/getjson'
import { defineStore } from 'pinia'

export type Simulation = {
  id: number
  name: string
  model_name: string
  json_data: string // type JSONValue disabled because of infinite loop
  namespace: string[]
}

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore({
  id: 'Store',
  state: () => ({
    simulations: [] as Simulation[],
    simul: {} as Simulation,
    cur_simul: 0,
    params: {} // this is js object

    // is this correct??
  }),

  actions: {
    addItem(simulation: Simulation) {
      this.simulations.push(simulation)
      console.log(`simulation ${simulation} added`)
    },
    removeItem(index: number) {
      const i = this.simulations.findIndex((s) => s.id === index)
      if (i > -1) this.simulations.splice(i, 1)
    },
    init() {
      useInitState().then((data) => {
        this.simulations = data.value
      })
    },
    printSimulations() {
      this.simulations
    }
  }
})
