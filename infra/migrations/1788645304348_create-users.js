exports.up = (pgm) => {
  pgm.createTable("users", {
    id: { type: "uuid", primaryKey: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
