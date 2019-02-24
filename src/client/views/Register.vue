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
                          v-model="form.email">
            </b-form-input>
          </b-form-group>
          <b-form-group id="fnameInputGroup"
                        label="First Name:"
                        label-for="fname">
            <b-form-input id="fname"
                          type="text" required=""
                          v-model="form.fname">
            </b-form-input>
          </b-form-group>
          <b-form-group id="lnameInputGroup"
                        label="Last Name:"
                        label-for="lname">
            <b-form-input id="lname"
                          type="text" required=""
                          v-model="form.lname">
            </b-form-input>
          </b-form-group>
          <b-form-group id="passwordInputGroup"
                        label="Password:"
                        label-for="password">
            <b-form-input id="password"
                          type="password" required=""
                          v-model="form.password">
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="info" block>Create Account</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
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
        password: '',
        fname: '',
        lname: '',
      }
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault();
      this.$store.dispatch('account/register', this.form)
      .then(response => {
        this.$swal("Registered successfully!", "Your account has been created.", "success", {
          buttons: false,
          timer: 2000
        });
        this.$router.push('/login')
      }, error => {
        this.$swal("Uh oh!", "There was a problem trying to create your account. Please try again.", "error", {
          buttons: false,
          timer: 2000
        });
      })
    }
  }
}
</script>

<style lang="scss">
#login {
  padding: 30px 0 15px
}
</style>
