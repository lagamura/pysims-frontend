<template>
  <div
    class="group relative overflow-hidden rounded-md bg-sky-300 shadow-sm mx-auto w-4/6 h-50 hover:opacity-70 transition-opacity cursor-pointer"
  >
    <router-link to="/simulations/climate">
      <img src="@/assets/climate_change_640.jpg" alt="simul-photo" title="Climate Simulation" />
      <h2
        class="invisible group-hover:visible absolute text-5xl font-mono text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        Climate Model
      </h2>
    </router-link>
  </div>
</template>
