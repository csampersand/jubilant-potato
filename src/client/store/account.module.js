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

  localLogin({ dispatch }, payload) {
    feathers.authenticate({
      strategy: 'local',
      email: payload.email,
      password: payload.password
    }).then(() => {
      console.log('Authenticated');
      swal("Logged in!", "You were logged in successfully.", "success", {
        buttons: false,
        timer: 2000
      });
      dispatch('jwtLogin');
      router.push('/');
    }).catch(e => {
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
  }

  /*
  register
   */
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
