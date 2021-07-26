/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('playlists', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(200)',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  }, {
    constraints: {
      foreignKeys: {
        references: 'users(id)',
        columns: 'owner',
        onDelete: 'CASCADE',
      },
    },
  });

  pgm.createTable('playlistsongs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  }, {
    constraints: {
      foreignKeys: [
        {
          references: 'playlists(id)',
          columns: 'playlist_id',
          onDelete: 'CASCADE',
        },
        {
          references: 'songs(id)',
          columns: 'song_id',
          onDelete: 'CASCADE',
        },
      ],
    },
  });

  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  }, {
    constraints: {
      foreignKeys: [
        {
          references: 'playlists(id)',
          columns: 'playlist_id',
          onDelete: 'CASCADE',
        },
        {
          references: 'users(id)',
          columns: 'user_id',
          onDelete: 'CASCADE',
        },
      ],
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('collaborations');
  pgm.dropTable('playlistsongs');
  pgm.dropTable('playlists');
};
