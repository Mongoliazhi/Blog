var db = require("../mysql.js");

var newArr=[];

function get_comment(req,callback) {
    var passage_id=(req.body.comment_id);

    // var pid=0;
    var arr=[];
    arr[0]=0;

    

    comment_list(passage_id,arr,function (err,rows) {
            if(err){
                console.log(err);
            }else{
                // console.log(newArr);

            }
    })
    callback(newArr)

}

function comment_list(passage_id,arr,callback) {

    if(!arr){
        callback(err,rows)
    }else{
        console.log("666666666666666666");
        pid=arr[0];

        db.query('SELECT * FROM comment WHERE pid = '+pid+' and passage_id = '+passage_id+' ORDER BY comment_time DESC ',function(err,rows){
            for(var i=0;i<rows.length;i++){
                newArr.push([{'passage_id':rows[i].passage_id,'comment_id':rows[i].comment_id,
                    'pid':rows[i].pid,'user_id':rows[i].user_id,'content':rows[i].content,
                    'thumbup':rows[i].thumbup,'comment_time':rows[i].comment_time
                }])
                arr[0]=rows[i].comment_id;

                comment_list(passage_id,arr,callback)
            }

            callback(err,newArr)


        });
    }

}



exports.get_comment = get_comment;