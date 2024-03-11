module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      station_id: String,
      sensor_id: String,
      module_id: String,
      condition: String,
      ruleFunc: String,
      active: Boolean,
      user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        }
      ]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Rule = mongoose.model("Rules", schema);
  return Rule;
};