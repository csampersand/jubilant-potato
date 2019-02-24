import feathers from '../feathers';
import router from '../router';

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
  jwtLogin({ commit }) {
    return new Promise((resolve, reject) => {
      feathers.authenticate()
      .then(response => {
        return feathers.passport.verifyJWT(response.accessToken);
      })
      .then(payload => {
        return feathers.service('users').get(payload.userId);
      })
      .then(user => {
        commit('login', user);
        resolve(user);
      })
      .catch(e => {
        console.error('Error authenticating!', e);
        reject(e);
      });
    });
  },

  /**
   * Log in using Local Storage token
   * @param  {objct} payload       Object containing the email and password to log in
   * @param  {path} redirect       The path to redirect to on succcessful login
   */
  localLogin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      feathers.authenticate({
        strategy: 'local',
        email: payload.email,
        password: payload.password
      })
      .then(response => {
        return feathers.passport.verifyJWT(response.accessToken);
      })
      .then(payload => {
        return feathers.service('users').get(payload.userId);
      })
      .then(user => {
        commit('login', user);
        resolve(user);
      })
      .catch(e => {
        console.error('Error authenticating!', e);
        reject(e);
      });
    });
  },

  logout({ commit }) {
    feathers.logout();
    commit('logout');
  },

  register({ commit }, payload) {
    return new Promise((resolve, reject) => {
      feathers.service('users').create(payload).then(response => {
        resolve(response)
      }, error => {
        reject(error)
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
