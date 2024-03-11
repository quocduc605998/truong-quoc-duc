const db = require("../models");
const Devices = db.devices;

function getDeviceList() {
    return new Promise((resolve, reject) => {
      Devices.aggregate(
        [
            {
                "$project" : {
                    "_id" : 1,
                    "devices" : "$$ROOT"
                }
            },
            {
              "$match" : {
                  "$and" : [
                      {
                          "$expr" : {
                              "$eq" : [
                                  "$devices.protocol",
                                  "MQTT"
                              ]
                          }
                      },
                      {
                          "$expr" : {
                              "$eq" : [
                                  "$devices.module_id",
                                  "IrHub"
                              ]
                          }
                      }
                  ]
              }
            },
            {
                "$lookup" : {
                    "localField" : "devices.non_existing_field",
                    "from" : "csht",
                    "foreignField" : "non_existing_field",
                    "as" : "csht"
                }
            },
            {
                "$unwind" : {
                    "path" : "$csht",
                    "preserveNullAndEmptyArrays" : false
                }
            },
            {
                "$match" : {
                    "$expr" : {
                        "$eq" : [
                            "$devices.station_id",
                            "$csht.maCSHT"
                        ]
                    }
                }
            },
            {
                "$project" : {
                    "name" : "$devices.name",
                    "ipaddress": "$devices.ip_address",
                    "dctype": "$devices.dc_type",
                    "station_id" : "$devices.station_id",
                    "module_id" : "$devices.module_id",
                    "createdAt" : "$devices.createdAt",
                    "TTVT" : "$csht.TTVT",
                    "TKT" : "$csht.TKT",
                    "tenTram" : "$csht.tenTram",
                    "user":"$devices.user",
                    "_id" : 1
                }
            }
        ]).exec((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
}

module.exports = {
    getDeviceList
};