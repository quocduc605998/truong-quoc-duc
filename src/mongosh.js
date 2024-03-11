var client = mongodb.MongoClient;
var url = "mongodb://host:port/";
function find_BanMon (CSHTxx){
    client.connect(url, function (err, client) {
    
        var db = client.db("DATAVNPT1");
        var collection = db.collection("tele2");
        
        var query = {
            "CSHT": CSHTxx,
            "BatMon": {
                "$ne": null
            }
        };
        
        var projection = {
            "BatMon.time": 1.0,
            "BatMon.Sensors": 1.0
        };
        
        var sort = [ ["BatMon.time", -1.0] ];
        
        var cursor = collection.find(query).project(projection).sort(sort);
        
        cursor.forEach(
            function(doc) {
                console.log(doc);
            }, 
            function(err) {
                client.close();
            }
        );
        
        // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/
        
    });
}
find_BanMon("CSHT_DLK_00178")