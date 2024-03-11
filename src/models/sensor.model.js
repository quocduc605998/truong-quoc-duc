module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      module: String
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Sensor = mongoose.model("sensors", schema);
  return Sensor;
};