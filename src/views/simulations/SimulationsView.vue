<template>
  <section
    class="py-24 flex items-center justify-center bg-gray-900 bg-opacity-70"
    style="background-image: url('src/assets/charts_background_1024.jpg')"
  >
    <div class="mx-44 max-w-[43rem] shadow-lg bg-slate-200/100 p-10 rounded-md">
      <div class="text-center">
        <p class="text-lg font-medium leading-8 text-indigo-600/95">Simulation Portfolio</p>
        <h1 class="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">
          Explore our Verified Simulations&nbsp;
        </h1>
        <p class="mt-3 text-lg leading-relaxed text-slate-400">
          Our Models have been documented by Experts of the Field and
        </p>
      </div>

      <div class="mt-6 flex items-center justify-center gap-4">
        <a
          href="#"
          class="transform rounded-md bg-indigo-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
          >Get started for free</a
        >
        <a
          href="#"
          class="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-50"
        >
          Request a demo
        </a>
      </div>
    </div>
  </section>
  <section class="p-20">
    <div class="mt-10 grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-32">
      <div>
        <Card />
      </div>
      <div class="flex max-w-md items-center rounded-lg shadow-lg p-6">
        <span>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </span>
      </div>
      <div class="flex max-w-lg justify-self-end items-center rounded-lg shadow-lg p-6">
        <span>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </span>
      </div>
      <div>
        <Card />
      </div>
    </div>
  </section>
</template>

<script setup>
import Card from '@/components/Card.vue';
</script>
