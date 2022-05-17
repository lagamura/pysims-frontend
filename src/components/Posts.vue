<template>
  <h2>Parameters of the Model</h2>
  <li v-for="parameter in getVarsSimul" :key="parameter">
    {{ parameter }}
  </li>
</template>


<script>
export default {
  data() {
    return {
      sim_results: [],
    };
  },
  methods: {
    getPosts() {
      fetch("http://127.0.0.1:8000/get_simul_res_json/1")
        .then((response) => response.json())
        .then((data) => {
          this.sim_results = JSON.parse(data);
        });
    },
  },
  mounted() {
    this.getPosts();
  },
  computed: {
    getVarsSimul() {
      return Object.keys(this.sim_results);
    },
  },
};
</script>