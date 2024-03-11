module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      CSHT: String,
      sysname: String,
      LWT : {
      },
      time: Date
    }
  );

  schema.method("toJSON", function() {
    const {_id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tele1 = mongoose.model("tele1", schema);
  return Tele1;
};