<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'app',
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
