<template>
<b-navbar toggleable="md" type="dark" variant="info" fixed="top">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand to="/">Goods</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item to="/" exact>Home</b-nav-item>
      <b-nav-item v-if="user.loggedIn" to="/about">About</b-nav-item>
      <b-nav-item href="#" disabled>Disabled</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown v-if="$store.getters['account/user'].loggedIn" right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          User
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item v-on:click="logoutNavbar()">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item v-else to="/login">Login</b-nav-item>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  computed: {
    user () {
      return this.$store.getters['account/user']
    }
  },
  methods: {
    logoutNavbar() {
      this.logout()
      .then(() => {
        this.$router.push('/');

        this.$swal("Logged out!", "You were logged out successfully.", "success", {
          buttons: false,
          timer: 2000
        });
      })
    },
    ...mapActions('account', ['logout'])
  }
}
</script>

<style>
body {
    padding-top: 70px;
}
</style>
