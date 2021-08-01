class ExportsHandler {
  constructor(service, playlistService, validator) {
    this._service = service;
    this._validator = validator;
    this._playlistService = playlistService;

    this.postExportPlaylistHandler = this.postExportPlaylistHandler.bind(this);
  }

  async postExportPlaylistHandler(request, h) {
    try {
      this._validator.validateExportPlaylistPayload(request.payload);

      const { id } = request.params;
      const credentialId = request.auth.credentials.id;
      const message = {
        playlistId: id,
        targetEmail: request.payload.targetEmail,
      };

      await this._playlistService.verifyPlaylistAccess(id, credentialId);

      await this._service.sendMessage('export:playlists', JSON.stringify(message));

      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda sedang kami proses',
      });
      response.code(201);
      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = ExportsHandler;
