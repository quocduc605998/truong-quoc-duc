module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      name: String,
      sysname: String,
      CSHT: String,
      LWT : {
      }, 
      time: Date
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Lastwill = mongoose.model("lastwill", schema);
  return Lastwill;
};