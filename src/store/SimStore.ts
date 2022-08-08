import { useInitState } from '@/composables/getjson'
import { defineStore } from 'pinia'
import type { UserSimulation, Simulation } from '@/store/simulation.model'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export type RootState = {
  user_simulations: UserSimulation[]
  simulation: Simulation
  cur_simul: number
  params_obj: []
  dropdown_trigger: boolean
  img_thumbnails: {img_id:string, bs64:string}[]
}

export const useStore = defineStore({
  id: 'Store',
  state: () =>
    ({
      user_simulations: [],
      simulation: {} as Simulation,
      cur_simul: -1,
      params_obj: [],
      dropdown_trigger: false,
      img_thumbnails: [] //maybe problem with the first argument
    } as RootState), // Warning - this should be changed, there is a discussion on use "as RootState" here: https://dev.to/carlomigueldy/getting-started-with-vue-3-pinia-store-typescript-by-building-a-grocery-list-app-19km

  actions: {
    addItem(user_simulation: UserSimulation) {
      this.user_simulations.push(user_simulation)
      console.log(`simulation ${user_simulation} added`)
    },
    removeItem(index: number) {
      const i = this.user_simulations.findIndex((s) => s.id === index)
      if (i > -1) this.user_simulations.splice(i, 1)
    },
    init() {
      useInitState().then((data) => {
        this.user_simulations = data.value
      })
    },
    printSimulations() {
      this.user_simulations
    }
  }
})
