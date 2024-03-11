const db = require("../models");
const Lastwills = db.lastwills;
const tele1 = db.tele1;

async function insertDBLWTUpdate(val, obj) {
    // Create filter objects
    const newDoc = new tele1({ name: obj.name,sysname:obj.sysname, CSHT: obj.CSHT, LWT: obj.LWT, time: obj.time });
    const filter = { CSHT: val, name: obj.name,sysname:obj.sysname };
    // Update documents in dcwills and Lastwills collections
    await Promise.all([
      newDoc.save(),
      Lastwills.findOneAndUpdate(filter, { LWT: obj.LWT, time: obj.time }, { new: true, upsert: true })
    ]);
}
module.exports = {
  insertDBLWTUpdate
};