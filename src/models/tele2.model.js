module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      CSHT: String,
      sysname: String,
      Sensors : {
      },
      time: Date
    }
  );

  schema.method("toJSON", function() {
    const {_id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tele2 = mongoose.model("tele2", schema);
  return Tele2;
};