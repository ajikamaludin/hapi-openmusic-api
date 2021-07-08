/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(200)',
      notNUll: true,
    },
    year: {
      type: 'NUMERIC',
      notNUll: true,
    },
    performer: {
      type: 'VARCHAR(200)',
      notNull: false,
    },
    genre: {
      type: 'VARCHAR(200)',
      notNUll: false,
    },
    duration: {
      type: 'NUMERIC',
      notNUll: false,
    },
    inserted_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};
