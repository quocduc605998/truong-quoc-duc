module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
    },
    { timestamps: true },
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  
  const Tutorial = mongoose.model("tele2", schema);
  return Tutorial;
};
function getCosts(value) {
  if (typeof value !== 'undefined') {
     return parseFloat(value.toString());
  }
  return value;
};