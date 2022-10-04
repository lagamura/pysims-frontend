<template>
  <div
    class="group relative overflow-hidden rounded-md shadow-sm mx-auto w-4/6 h-50 transition-opacity cursor-pointer"
  >
    <router-link :to="router_dest">
      <img :src="src_path" alt="simul-photo" :title="card_name" class="hover:opacity-20" />
      <span
        class="invisible group-hover:visible w-4/6 absolute text-center text-5xl font-mono text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {{ card_name }} Model
      </span>
    </router-link>
  </div>
</template>

<script setup="ts">

const props = defineProps({
  model_name: String
});

const src_path = `src/assets/model-cards/${props.model_name}.jpg`; // this may should be ref
const router_dest = `/simulations/${props.model_name}`;

// parsing model name
let card_name = props.model_name.replace('_', ' ');

const arr = card_name.split(' ');

//loop through each element of the array and capitalize the first letter.

for (var i = 0; i < arr.length; i++) {
  arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
}

//Join all the elements of the array back into a string
//using a blankspace as a separator
card_name = arr.join(' ');
console.log(card_name);
// finished parsing


</script>
