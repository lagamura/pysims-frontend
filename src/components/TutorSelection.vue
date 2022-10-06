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
  <el-button @click="updateVarsExposed()" class="mt-4"> Update Vars Exposed</el-button>
</template>

<script setup>
import { Check, Close } from '@element-plus/icons-vue';
import { useStore } from '../store/SimStore';
import { storeToRefs } from 'pinia';
import { useMyFetch } from '@/composables';

const store = useStore();
const { simulation } = storeToRefs(store); //access params from store as ref

async function updateVarsExposed() {
  let ExposedVars = new Array();
  simulation.value.components.forEach((component) => {
    if (component.student_control == true) {
      console.log(component['Py Name']);
      console.log(component['Real Name']);
      ExposedVars.push(component['Real Name']);
    }
  });
  ExposedVars = Object.assign({}, ExposedVars);
  console.log(ExposedVars);

  await useMyFetch(`update_vars_exposed/${simulation.value.model_name}`, {}).put(
    (ExposedVars)
  );
}
</script>
