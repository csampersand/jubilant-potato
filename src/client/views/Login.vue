<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="4">
        <b-form @submit="onSubmit" id="login">
          <b-form-group id="emailInputGroup"
                        label="Email address:"
                        label-for="email">
            <b-form-input id="email"
                          type="email" required=""
                          v-model="form.email"
                          placeholder="Your Email">
            </b-form-input>
          </b-form-group>
          <b-form-group id="passwordInputGroup"
                        label="Password:"
                        label-for="password">
            <b-form-input id="password"
                          type="password" required=""
                          v-model="form.password"
                          placeholder="Your Password">
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="info" block>Log in</b-button>
        </b-form>
        <p class="text-center"><b-link to="/register">Create Account</b-link></p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault();
      this.$store.dispatch('account/localLogin', { ...this.form, redirect: this.$route.query.redirect || "/" })
    }
  }
}
</script>

<style lang="scss">
#login {
  padding: 30px 0 15px
}
</style>
