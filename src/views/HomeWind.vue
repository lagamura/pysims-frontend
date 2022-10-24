<template>
  <section>
    <HeroSection />
  </section>
  <section>
    <Features />
    <!-- this component overflows -->
  </section>
  <section>
    <Team />
  </section>
  <!-- this component overflows -->
  <section>
    <DocTable />
  </section>
</template>

<script setup>
import Features from '@/components/Features.vue';
import Team from '@/components/Team.vue';
import HeroSection from '@/components/HeroSection.vue';
import DocTable from '@/components/DocTable.vue';
</script>
