<template>
  <b-container id="login">
    <b-row align-h="center">
      <b-col cols="4">
        <b-form @submit="onSubmit">
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
      alert(JSON.stringify(this.form));
    }
  }
}
</script>

<style lang="scss">
#login {
  padding-top: 30px
}
</style>
