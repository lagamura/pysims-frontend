<template>
  <el-container id="container" class="bg-black block p-10 text-white">
    <el-row :gutter="40">
      <el-col :span="8">
        <h2 class="text-cyan-300 text-xl mb-5">Model: {{ simulation.model_name }}</h2>
        <h3>Choose an Available Model</h3>
        <suspense>
          <ListAvailableModels />
          <template #fallback>
            <el-icon class="is-loading">
              <Loading />
            </el-icon>
          </template>
        </suspense>
        <h2>Choose Control Variables (Constants)</h2>

        <TutorSelection />
        <!-- <h3>Step 3 - Choose a simulation name</h3>
      <el-input v-model="simulation.simulation_name" placeholder="Your Simulation Name" /> -->
      </el-col>

      <template v-if="user_simulations">
        <el-col :span="16">
          <suspense>
            <DocTable :model-name="simulation.model_name" />
            <template #fallback>
              <el-icon class="is-loading">
                <Loading />
              </el-icon>
            </template>
          </suspense>
        </el-col>
      </template>
    </el-row>

    <el-row>
      <el-col>
        <template v-if="cur_simul > 0">
          <div class="sim_execute">
            <div class="model_name">
              <h3>
                Choosen model is:
                <i style="color: chartreuse">{{ user_simulations[cur_simul - 1].model_name }}</i>
              </h3>
              <el-button>Choose Again</el-button>
            </div>
          </div>
        </template>
      </el-col>
    </el-row>
    <el-divider />
  </el-container>
</template>

<script setup>
import ListAvailableModels from '../components/ListAvailableModels.vue';
import DocTable from '../components/DocTable.vue';
import { useStore } from '../store/SimStore';
import { storeToRefs } from 'pinia';
import TutorSelection from '../components/TutorSelection.vue';

const store = useStore();
const { user_simulations, simulation, cur_simul } = storeToRefs(store);
</script>

<style scoped>
  #container {
    display:block;
  }
</style>