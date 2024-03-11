module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      name: String,
      sysname: String,
      CSHT: String,
      Sensors : {
      }, 
      time: Date
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const {_id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Lastvals = mongoose.model("lastval", schema);
  return Lastvals;
};