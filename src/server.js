require('dotenv').config();

const Hapi = require('@hapi/hapi');
const songs = require('./api/song');
const SongsService = require('./services/postgres/SongsService');
const SongValidator = require('./validator/song');

const init = async () => {
  const songsService = new SongsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: songs,
    options: {
      service: songsService,
      validator: SongValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
