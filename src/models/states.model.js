module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      CSHT: String,
      State : {
      },
      time: Date
    }
  );

  schema.method("toJSON", function() {
    const {_id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const States = mongoose.model("states", schema);
  return States;
};