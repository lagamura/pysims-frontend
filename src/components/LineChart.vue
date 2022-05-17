<template>
  <h2>Line Graph to be implemented</h2>
  <li v-for="parameter in getVarsSimul" :key="parameter">
    {{ parameter }}
  </li>
</template>




<script>
import axios from "axios";

export default {
  data() {
    return {
      results: [],
      index: [],
      variables: [],
      mock_data: []
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/get_simul_res_json/1")
      .then((response) => {
        this.results = JSON.parse(response.data);
        console.log(this.results);
        this.variables = Object.keys(this.results);
        console.log(this.variables);
        this.index = Object.keys(this.results["cumulative cases"]);
        console.log(this.index);
        this.mock_data = Object.values(this.results["cumulative cases"])
        console.log(this.mock_data)
      })
      .catch((error) => {
        alert(error);
      });
  },
};
</script>
