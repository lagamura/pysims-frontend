<template>
  <div
    class="group relative overflow-hidden rounded-md shadow-sm mx-auto w-4/6 h-50 transition-opacity cursor-pointer"
  >
    <router-link to="/simulations/climate">
      <img :src="src_path" alt="simul-photo" title="Climate Simulation" class="hover:opacity-20" />
      <h2
        class="invisible group-hover:visible absolute text-5xl font-mono text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {{ props.model_name }} Model
      </h2>
    </router-link>
  </div>
</template>

<script setup="ts">
const props = defineProps({
  model_name: String
});

const src_path = `src/assets/model-cards/${props.model_name}.jpg`;
</script>
