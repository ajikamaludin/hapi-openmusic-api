const routes = (handler) => [
  {
    method: 'POST',
    path: '/exports/playlists/{id}',
    handler: handler.postExportPlaylistHandler,
    options: {
      auth: 'muscisapp_jwt',
    },
  },
];

module.exports = routes;
