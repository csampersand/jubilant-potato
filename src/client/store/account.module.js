import feathers from '../feathers';
import router from '../router';

const state = {
  user: {
    loggedIn: false,
    email: '',
  }
}

const actions = {
  jwtLogin({ commit }) {
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
    })
    .catch(function(error){
      console.error('Error authenticating!', error);
    });
  },

  /*
  log in with username and password
  set JWT token
  set user in localStorage
  redirect to home page
   */

  logout({ commit }) {
    feathers.logout();
    // put a sweet alert here
    commit('logout');
    console.log('Logged out');
    router.push('/');
  }

  /*
  register
   */
}

const mutations = {
  login(state, user) {
    state.user = user;
  },
  logout(state) {
    state.user = {
      loggedIn: false,
      email: '',
    }
  }
}

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
};
