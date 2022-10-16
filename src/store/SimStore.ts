import { useInitState } from '@/composables/getjson';
import { defineStore } from 'pinia';
import type { Simulation } from '@/store/simulation.model';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export type RootState = {
  user_simulations: Simulation[];
  simulation: Simulation;
  cur_simul: number;
  dropdown_trigger: boolean;
  classrooms: string[];
};

export const useStore = defineStore({
  id: 'Store',
  state: () =>
    ({
      user_simulations: [],
      simulation: {} as Simulation, //hardcoded
      cur_simul: -1,
      dropdown_trigger: false,
      classrooms: [],
      
    } as RootState), // Warning - this should be changed, there is a discussion on use "as RootState" here: https://dev.to/carlomigueldy/getting-started-with-vue-3-pinia-store-typescript-by-building-a-grocery-list-app-19km

  actions: {
    addItem(simulation: Simulation) {
      this.user_simulations.push(simulation);
      console.log(`simulation ${simulation} added`);
    },
    removeItem(index: number) {
      const i = this.user_simulations.findIndex((simulation) => simulation.id === index);
      if (i > -1) this.user_simulations.splice(i, 1);
    },
    init() {
      useInitState().then((data) => {
        this.user_simulations = data.value;
      });
    },
    printSimulations() {
      this.user_simulations;
    }
  }
});
