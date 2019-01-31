import io from 'socket.io-client';
import feathers from '@feathersjs/client';

// Automatically stores and sends JWT access token
// and handles re-authenticating when a websocket disconnects
import auth from '@feathersjs/authentication-client';

// Socket.io is exposed as the `io` global.
const socket = io('http://localhost:3030');
// @feathersjs/client is exposed as the `feathers` global.
export default feathers()
  .configure(feathers.socketio(socket))
  .configure(auth({ storage: window.localStorage }));
  // .configure(feathers.authentication());

