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
import { mapActions } from 'vuex'

export default {
  mounted() {
    if (this.user.loggedIn) {
      this.$router.push(this.$route.query.redirect || '/')
    }
  },
  computed: {
    user () {
      return this.$store.getters['account/user']
    }
  },
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
      this.localLogin( this.form)
        .then(() => {
          this.$swal("Logged in!", "You were logged in successfully.", "success", {
            buttons: false,
            timer: 2000
          });
          this.$router.push(this.$route.query.redirect || '/')
        }, () => {
          this.$swal("Uh oh!", "We couldn't log you in. Please try again.", "error", {
            buttons: false,
            timer: 2000
          });
        });
    },
    ...mapActions('account', ['localLogin'])
  }
}
</script>

<style lang="scss">
#login {
  padding: 30px 0 15px
}
</style>
