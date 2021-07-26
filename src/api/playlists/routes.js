const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistsHandler,
    options: {
      auth: 'muscisapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsHandler,
    options: {
      auth: 'muscisapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.deletePlaylistsByIdHandler,
    options: {
      auth: 'muscisapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: handler.getSongPlaylistsHandler,
    options: {
      auth: 'muscisapp_jwt',
    },
  },
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: handler.postSongPlaylistsHandler,
    options: {
      auth: 'muscisapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: handler.deleteSongPlaylistsHandler,
    options: {
      auth: 'muscisapp_jwt',
    },
  },
];

module.exports = routes;
