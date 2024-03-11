module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      station_id: String,
      module_id: String,
      stations: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "csht"
        }
      ],
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

  const Device = mongoose.model("Devices", schema);
  return Device;
};