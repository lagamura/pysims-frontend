<template>
  <div v-for="(component, index) in simulation.components" :key="index">
    <div v-if="component.Type == 'Constant'">
      <span class="demonstration">{{ component['Real Name'] }}</span>
      <el-switch
        v-model="component.student_control"
        class="switcher"
        style="margin-left: 24px"
        inline-prompt
        :active-icon="Check"
        :inactive-icon="Close"
      />
    </div>
  </div>
  <button class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" @click="updateVarsExposed()"> Update Vars Exposed</button>
</template>

<script setup>
import { Check, Close } from '@element-plus/icons-vue';
import { useStore } from '../store/SimStore';
import { storeToRefs } from 'pinia';

const store = useStore();
const { simulation } = storeToRefs(store); //access params from store as ref
const ExposedVars = new Array();

async function updateVarsExposed() {
  simulation.value.components.forEach((component) => {
    if (component.student_control == true) {
      ExposedVars.append(component.Py_Name);
    }
  });

  await useMyFetch(`/${simulation.value.model_name}/update_vars_exposed`, {}).put(ExposedVars);
}
</script>

<style></style>
