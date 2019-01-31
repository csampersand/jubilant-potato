<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'app',
  created() {
    this.authenticate();
  },
  methods: {
    authenticate() {
      this.$feathers.authenticate().then(() => {
        console.log("Authenticated by local storage");
      }).catch(e => {
        console.log("Error authenticating by local storage!", e);
      });
    }
  },
  components: {
    Navbar,
  },
};
</script>


<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "bootstrap/scss/bootstrap.scss";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
