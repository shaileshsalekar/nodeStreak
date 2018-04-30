var streakapi = require('streakapi');
var streak = new streakapi.Streak("c5662e22c4c14577a2bb693ada72dab2");

function getAllPipelines(streak){
    var json = {};
    var nameArray = ["Sales","Logistics (Inward)","Logistics (Outward)"];
    
    streak.Pipelines.getAll().then(function(pipelines){
        for(pipeline in  pipelines){
            if(nameArray.indexOf(pipelines[pipeline].name) >= 0){
                json[pipelines[pipeline].name] = pipelines[pipeline].pipelineKey;
            }
        }
    
        for(j in json){
            streak.Pipelines.Fields.getAll(json[j]).then(function(fields){
                 console.log(fields);
            }).catch(function(error){
                 console.log(error);
            })
        }
                
    }).catch(function(error){
        console.log(error);
    })
    
}

getAllPipelines(streak)