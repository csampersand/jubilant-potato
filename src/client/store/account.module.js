import feathers from '../feathers';
import router from '../router';
import swal from 'sweetalert';

const blankUser = {
  loggedIn: false,
  email: '',
  fname: '',
  lname: '',
}

const state = {
  user: blankUser
}

const actions = {
  /**
   * Log in using Local Storage token
   * @param  {path} redirect       The path to redirect to on succcessful login
   */
  jwtLogin({ commit }, redirect = '/') {
    feathers.authenticate()
    .then(response => {
      console.log('Authenticated!', response);
      return feathers.passport.verifyJWT(response.accessToken);
    })
    .then(payload => {
      console.log('JWT Payload', payload);
      return feathers.service('users').get(payload.userId);
    })
    .then(user => {
      feathers.set('user', user);
      console.log('User', feathers.get('user'));
      commit('login', feathers.get('user'));
      router.push(redirect)
    })
    .catch(function(error){
      console.error('Error authenticating!', error);
    });
  },

  /**
   * Log in using Local Storage token
   * @param  {objct} payload       Object containing the email and password to log in
   * @param  {path} redirect       The path to redirect to on succcessful login
   */
  localLogin({ dispatch }, payload) {
    feathers.authenticate({
      strategy: 'local',
      email: payload.email,
      password: payload.password
    }).then(() => {
      console.log('Authenticated');
      dispatch('jwtLogin', payload.redirect || '/');
      swal("Logged in!", "You were logged in successfully.", "success", {
        buttons: false,
        timer: 2000
      });
    }).catch(e => {
      swal("Uh oh!", "We couldn't log you in. Please try again.", "error", {
        buttons: false,
        timer: 2000
      });
      console.error('Error authenticating!', e);
    });
  },

  logout({ commit }) {
    feathers.logout();
    commit('logout');
    console.log('Logged out');
    router.push('/');

    swal("Logged out!", "You were logged out successfully.", "success", {
      buttons: false,
      timer: 2000
    });
  },

  register({ commit }, payload) {
    feathers.service('users').create(payload).then(response => {

      // Automatically log user in after registering
      feathers.authenticate({
        strategy: 'local',
        email: payload.email,
        password: payload.password
      }).then(() => {
        console.log('Authenticated');
        swal("Registered successfully!", "Your account has been created.", "success", {
          buttons: false,
          timer: 2000
        });
        console.log(response);
        commit('login', response);
        router.push('/');
      }).catch(e => {
        swal("Uh oh!", "An error occurred while registering. Please try logging in.", "error", {
          buttons: false,
          timer: 2000
        });
        router.push('/login');
        console.error('Error authenticating!', e);
      });

    }).catch(error => {
        console.error("Error registering", error);
        console.log(Object.keys(error.errors));
        this.errors = error.errors;
        swal("Uh oh!", "We couldn't sign you up. Please try again.", "error", {
            buttons: false,
            timer: 2000
        });
    })
  }
}

const mutations = {
  login(state, user) {
    state.user = {...user, loggedIn: true};
  },
  logout(state) {
    state.user = blankUser;
  }
}

const getters = {
  user: state => state.user
}

export const account = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
