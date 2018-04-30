var mysql = require('mysql');

//db connection
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123",
  database: "magento",
});



module.exports.insertData = function(boxName,boxNote,pipeLineKey,streakApi){
  //escape single double quotes
  boxName = boxName.replace(/"/g, '\\"')
  boxNote = boxNote.replace(/"/g, '\\"')

    //get latest note
    var selectsql = 'select * from magento_streak where boxname="'+boxName.trim()+'" and boxnote= "'+boxNote+'" and streak_api = "'+streakApi.trim()+'" order by id desc limit 1';
  
    con.query(selectsql, function (err, result) {
      if (err) throw err;
     //if new note insert directly
    if(result.length == 0){
        //insert new note for same box
      var sql = 'INSERT INTO magento_streak (id,boxname,boxnote,pipelinekey,streak_api) VALUES ("","'+boxName.trim()+'","'+boxNote.trim()+'","'+pipeLineKey+'","'+streakApi.trim()+'")';  
      con.query(sql, function (err, result) {
            if (err) throw err;
            //console.log("data inserted");   
      });
    }else{
        //if exists then update or insert
        if(result[0].boxnote == boxNote){
        //if old notes update
        var sql = 'update magento_streak set boxname = "'+boxName.trim()+'",boxnote = "'+boxNote.trim()+'",pipelinekey="'+pipeLineKey+'",streak_api="'+streakApi+'" where boxname="'+boxName.trim()+'" and boxnote= "'+boxNote+'" and streak_api = "'+streakApi.trim()+'"';  
          con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("data updated");   
          });
        }else if(result[0].boxnote != boxNote){
              //if change in note for same box insert
              var sql = 'INSERT INTO magento_streak (id,boxname,boxnote,pipelinekey,streak_api) VALUES ("","'+boxName.trim()+'","'+boxNote.trim()+'","'+pipeLineKey+'","'+streakApi.trim()+'")';  
              con.query(sql, function (err, result) {
                  if (err) throw err;
                  //console.log("data inserted");   
              });
        }
    }
     
    }); 
      
    //con.end();
}
