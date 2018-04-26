var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123",
  database: "magento",
});



module.exports.insertData = function(boxName,boxNote,email,pipeLineKey,streakApi,createdDate){
  boxName = boxName.replace(/"/g, '\\"')
  boxNote = boxNote.replace(/"/g, '\\"')

    //get all notes 
    var selectsql = 'select * from magento_streak where boxname="'+boxName+'" and streak_api = "'+streakApi+'"';
    con.query(selectsql, function (err, result) {
      if (err) throw err;
      //if new notes insert
      if(result.length == 0){
        var sql = 'INSERT INTO magento_streak (id,boxname,boxnote,email,pipelinekey,streak_api,created_at) VALUES ("","'+boxName+'","'+boxNote+'","'+email+'","'+pipeLineKey+'","'+streakApi+'","'+createdDate+'")';  
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("data inserted");   
        });
      }else{
        //if old notes update
        var sql = 'update magento_streak set boxname = "'+boxName+'",boxnote = "'+boxName+'",email="'+email+'",pipelinekey="'+pipeLineKey+'",streak_api="'+streakApi+'",created_at="'+createdDate+'" where boxname="'+boxName+'" and streak_api = "'+streakApi+'"';  
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("data updated");   
        });
      }  
    });
    
    
       //con.end();
}
