class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistsHandler = this.postPlaylistsHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistsByIdHandler = this.deletePlaylistsByIdHandler.bind(this);
    this.getSongPlaylistsHandler = this.getSongPlaylistsHandler.bind(this);
    this.postSongPlaylistsHandler = this.postSongPlaylistsHandler.bind(this);
    this.deleteSongPlaylistsHandler = this.deleteSongPlaylistsHandler.bind(this);
  }

  async postPlaylistsHandler(request, h) {
    try {
      this._validator.validatePlaylistPayload(request.payload);
      const { name } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      const playlistId = await this._service.addPlaylist({ name }, credentialId);

      const response = h.response({
        status: 'success',
        message: 'Playlist berhasil ditambahkan',
        data: {
          playlistId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getPlaylistsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._service.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistsByIdHandler(request) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyPlaylistOwner(id, credentialId);
      await this._service.deletePlaylistById(id);
      return {
        status: 'success',
        message: 'Playlist berhasil dihapus',
      };
    } catch (error) {
      return error;
    }
  }

  async postSongPlaylistsHandler(request, h) {
    try {
      this._validator.validateSongPlaylistPayload(request.payload);
      const { songId } = request.payload;
      const { id: playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyPlaylistOwner(playlistId, credentialId);
      await this._service.addSongPlaylist(songId, playlistId);

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
      });
      response.code(201);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getSongPlaylistsHandler(request) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const { id } = request.params;
      await this._service.verifyPlaylistOwner(id, credentialId);
      const songs = await this._service.getPlaylistById(id);
      return {
        status: 'success',
        data: {
          songs,
        },
      };
    } catch (error) {
      return error;
    }
  }

  async deleteSongPlaylistsHandler(request) {
    try {
      this._validator.validateSongPlaylistPayload(request.payload);
      const { songId } = request.payload;
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyPlaylistOwner(id, credentialId);
      await this._service.deleteSongPlaylist(songId, id);
      return {
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist',
      };
    } catch (error) {
      return error;
    }
  }
}

module.exports = PlaylistsHandler;
