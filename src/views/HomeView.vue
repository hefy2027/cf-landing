<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'
import HeroSection from '../components/HeroSection.vue'
import PillarsSection from '../components/PillarsSection.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import ScenariosSection from '../components/ScenariosSection.vue'
import DeploySection from '../components/DeploySection.vue'
import CtaSection from '../components/CtaSection.vue'
import TheFooter from '../components/TheFooter.vue'

const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <div ref="root" class="home-root">
    <main>
      <HeroSection />
      <PillarsSection />
      <FeaturesSection />
      <ScenariosSection />
      <DeploySection />
      <CtaSection />
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.home-root {
  min-height: 100vh;
}
</style>
