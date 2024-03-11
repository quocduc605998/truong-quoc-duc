module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      maCSHT: String,
      tenTram: String,
      TKT: String,
      TTVT: String,
      devices: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Device"
        }
      ]
    },
    { collection: "csht"
  }
  );

  schema.method("toJSON", function() {
    const {_id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Station = mongoose.model("csht", schema);
  return Station;
};