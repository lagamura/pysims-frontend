<template>
  <el-row>
    <el-col :span="12">
      <img src="src\assets\Teacup.png" />
    </el-col>

    <el-col :span="12">
      <h3>{{ store.simulation.simulation_name }}</h3>
      <p>
        System dynamics was created during the mid-1950s[3] by Professor Jay Forrester of the
        Massachusetts Institute of Technology. In 1956, Forrester accepted a professorship in the
        newly formed MIT Sloan School of Management. His initial goal was to determine how his
        background in science and engineering could be brought to bear, in some useful way, on the
        core issues that determine the success or failure of corporations. Forrester's insights into
        the common foundations that underlie engineering, which led to the creation of system
        dynamics, were triggered, to a large degree, by his involvement with managers at General
        Electric (GE) during the mid-1950s. At that time, the managers at GE were perplexed because
        employment at their appliance plants in Kentucky exhibited a significant three-year cycle.
        The business cycle was judged to be an insufficient explanation for the employment
        instability. From hand simulations (or calculations) of the stock-flow-feedback structure of
        the GE plants, which included the existing corporate decision-making structure for hiring
        and layoffs, Forrester was able to show how the instability in GE employment was due to the
        internal structure of the firm and not to an external force such as the business cycle.
        These hand simulations were the start of the field of system dynamics
      </p>
    </el-col>
  </el-row>
</template>

<script setup>
import { useStore } from '@/store/SimStore'
const store = useStore()
</script>
