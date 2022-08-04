<template>
<h2>
    This should be reactive: {{curSimulCounter}}
</h2>
<p>simResults are: {{ simResults }}</p>
</template>

<script setup>

const props = defineProps({
  simResults: Object | String,
  curSimulCounter: Number,
  testProp: Number
});

console.log("Hello from component test!")

</script>