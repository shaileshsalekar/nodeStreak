var request = require('request');
    
 module.exports.login = function(username){
     
        var password = "";
        var pipelineKey = "agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICAkJ7vmwoM";
        url = 'https://www.streak.com/api/v1/pipelines/'+pipelineKey+'/fields';   //api endpoint
        auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

        var options = {
            url : url,
            headers : {
                "Authorization" : auth
            }
        }
        //get all pipelines
        request(options,function (error, response, data) {
            if(error) throw new Error(error)
            console.log(data);
        });
    }   

