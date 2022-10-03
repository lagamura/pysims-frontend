<template>
  <div ref="target">
    <transition :name="animationType">
      <div v-appear="animate" class="animated-component">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="js">
import { onMounted, ref } from 'vue';
export default {
  name: 'AnimatedComponent',
  props: {
    animationType: {
      type: String,
      required: false,
      default: 'fade'
    }
  },
  setup() {
    const target = ref();
    const animate = ref(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        animate.value = entry.isIntersecting;
      },
      {
        threshold: 0.5
      }
    );
    onMounted(() => {
      observer.observe(target.value);
    });
    return {
      animate,
      target
    };
  }
};
</script>

<style scoped>
.animated-component.fade-enter-from,
.animated-component.slide-left-enter-from,
.animated-component.slide-right-enter-from,

.animated-component.zoom-enter-from {
  transition: none;
}
/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* Zoom animation */
.zoom-enter-active,
.zoom-leave-active {
  transition: transform 300ms ease;
}
.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0.9);
}

.slide-left-enter-from {
  transform: translate(-300px);
}
.slide-left-enter-to {
  transform: translate(0);
}
.slide-left-enter-active {
  transition: transform 2s ease;
}
.slide-right-enter-from {
  transform: translate(+300px);
}
.slide-right-enter-to {
  transform: translate(0);
}
.slide-right-enter-active {
  transition: transform 2s ease;
}
</style>
