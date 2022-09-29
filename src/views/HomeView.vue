<template>
  <el-row>
    <el-col>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <div class="block-container">
        <h3 inline>
          Welcome
          <span c-blue>{{ user.username }}</span>
        </h3>
        <h3 text-center>user_simulations history</h3>
        <div class="table-container">
          <suspense>
            <TableVue />
            <template #fallback>
              <el-icon class="is-loading"> <Loading /> </el-icon
            ></template>
          </suspense>
          <h3 text-center pt>How to use this alpha version:</h3>
          <p justify-center>
            First, navigate to the
            <router-link to="/tutor-dashboard">Tutor dashboard</router-link> and choose a
            simulation-model from the list, as also the modifiable parameters that a student can
            access. Then, navigate to
            <router-link to="/dashboard">Student dashboard</router-link> and run or step_run the
            simulation. At the end of the simulation, you can save it and download the csv results.
            That's it, have fun!
          </p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import TableVue from '../components/TableVue.vue';

import { useStore, useAuthStore } from '@/store/';
import { storeToRefs } from 'pinia';
import { watch, computed } from 'vue';

const store = useStore();
const { simulation, cur_simul } = storeToRefs(store);

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

console.log(`State user_simulations:${simulation.value}`);

watch(cur_simul, (newvalue) => {
  console.log(`cur_simul has changed ${newvalue}`);
  //console.log(user_simulations.value[cur_simul.value - 1].results)
});
</script>

<style>
.block-container {
  margin-left: auto;
  margin-right: auto;
  width: 80vw;
  display: block;
}
p {
  text-align: justify;
  width: 50vw;
  margin-left: auto;
  margin-right: auto;
}

.table-container {
  margin-left: auto;
  margin-right: auto;
}
</style>
