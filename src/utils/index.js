const mapDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  inserted_at, // eslint-disable-line
  updated_at, // eslint-disable-line
}) => ({
  id,
  title,
  year: +year,
  performer,
  genre,
  duration: +duration,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

module.exports = { mapDBToModel };
