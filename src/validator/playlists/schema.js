const Joi = require('joi');

const CreatePaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const AddPlaylistSongPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = {
  CreatePaylistPayloadSchema,
  AddPlaylistSongPayloadSchema,
};
