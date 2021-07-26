const InvariantError = require('../../exceptions/InvariantError');
const { CreatePaylistPayloadSchema, AddPlaylistSongPayloadSchema } = require('./schema');

const PlaylistValidator = {
  validatePlaylistPayload: (payload) => {
    const validationResult = CreatePaylistPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateSongPlaylistPayload: (payload) => {
    const validationResult = AddPlaylistSongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistValidator;
