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
  <FooterComp />
    <!-- this component overflows -->
</template>

<script setup>
import Features from '@/components/Features.vue';
import Team from '@/components/Team.vue';
import HeroSection from '@/components/HeroSection.vue';
import FooterComp from '@/components/FooterComp.vue';
</script>
