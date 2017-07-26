var express = require('express');
var db = require("./mysql.js");
var comments=require("./comment/comment.js")

var formidable = require('formidable');
var util = require('util');
// var fs = require('fs');

module.exports = function(app){
    app.get('/',function(req,res){
        res.render("index",{'title':'zhuasdua'})
    })
    app.post('/upload',function(req,res){

        if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
            console.log("11111111111111111");
            //创建表单上传
            var up_file=null;
            var form = new formidable.IncomingForm();
            //设置编辑
            form.encoding = 'utf-8';
            //设置文件存储路径ss

            form.uploadDir = "public/slinglove/images/upload";//win本地上传
            //保留后缀
            form.keepExtensions = true;
            //设置单文件大小限制
            form.maxFieldsSize = 2 * 1024 * 1024;
            //form.maxFields = 1000;  设置所以文件的大小总和

            form.parse(req, function(err, fields, files) {
                // res.writeHead(200, {'content-type': 'text/plain'});
                // res.write('received upload:\n\n');
                // res.end(util.inspect({fields: fields, files: files}));
                if (err) {
                    res.render('slinglove/index', { title: "sb" });
                    return;
                }else {
                    console.log(files);
                }


            });

            return;
        }

        // if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        //     //创建表单上传
        //     var form = new formidable.IncomingForm();
        //     //设置编辑
        //     form.encoding = 'utf-8';
        //     //设置文件存储路径
        //     form.uploadDir = "/users/mongolia/documents/slinglove/public/images/upload/";
        //     //保留后缀
        //     form.keepExtensions = true;
        //     //设置单文件大小限制
        //     form.maxFieldsSize = 2 * 1024 * 1024;
        //     //form.maxFields = 1000;  设置所以文件的大小总和
        //
        //     form.parse(req, function(err, fields, files) {
        //
        //         // res.writeHead(200, {'content-type': 'text/plain'});
        //         // res.write('received upload:\n\n');
        //         // res.end(util.inspect({fields: fields, files: files}));
        //         var html=files.photo.path;
        //         var re=html.replace(/.*\/([^\/]+)$/,"$1");
        //         console.log("/images/upload/"+re)
        //     });
        //
        //     return;
        // }
    })

    //blog主页
    app.get('/home',function(req,res){
        var i=0;
        var  newsList=null;
        db.query('select study_name from study_list',function(err,rows){
            if(err){
                console.log(err);
            }else{
                //console.log(rows);
                req.session.study=rows;
                home();
            }
        })
        db.query('select id,study_title,study_time from study limit 1,5',function(err,rows){
            if(err){
                console.log(err);
            }else{
                //console.log(rows)
                newsList=rows;
                console.log(newsList)
                home();
            }
        })
        db.query('select COUNT(*) NumberOfOrders from study',function(err,rows){
            if(err){
                console.log(err);
            }else{
                newsList_num=rows;
            }
            home();
        })
        function home(){
            i++;
            if(i==3){
                res.render('home',{
                    study:req.session.study,
                    newsList: newsList,
                    newsList_num:newsList_num
                })
            }
        }
    })
    app.post('/home',function(req,res){
        var pageIndex=req.body.pageIndex;
        var pageSize=req.body.pageSize;
        console.log("VVVVVVVVVVVVVVVVV")
        console.log(pageIndex+","+pageSize)

        db.query('select id,study_img,study_title,study_sketch,study_author,study_time,study_reading,study_love from study limit '+((pageIndex-1)*pageSize)+','+pageSize+'',function(err,rows){
            if(err){
                console.log(err);
            }else{
                console.log("YYYYYYYYYYYYYYYYYYYYY")
                res.send(rows);
                console.log(rows)
            }
        })
    })
    app.post('/homeimg',function(req,res){
        var newsList_id=(req.body.newsList_id)
        var imgLove_num=(req.body.imgLove_num)

        db.query('update study set study_love="'+imgLove_num+'" where id='+newsList_id, function (err, rows) {
            if(err){
                console.log(err);
            }else{
                //console.log(rows)
            }
        })
    })

        //studyList文章列表
    app.get('/study/studyList',function(req,res){
        console.log(req.query.study_name);
        db.query('select id,study_title,study_time from study where study_name="'+req.query.study_name+'"', function (err, rows) {
            if(err){
                console.log(err);
            }else{
                console.log(rows)
                res.render("study/studyList",{
                    study:req.session.study,
                    studyList:rows
                })
            }
        })

    })
    //Love
    app.get('/love/love',function(req,res){

        res.render("love/love",{
            study:req.session.study,
            // newsList_id:newsList_id
        })

    })


    //文章内容
    app.get('/study/studyList_con',function(req,res){
        var newsList_id=(req.query.newsList_id);
        res.render("study/studyList_con",{
            study:req.session.study,
            newsList_id:newsList_id
        })

    })
    app.post('/study/studyList_con',function(req,res){
        var newsList_id=(req.body.newsList_id);
        // console.log(newsList_id)
        db.query('select * from study where id='+newsList_id,function(err,rows){
            if(err){
                console.log(err);
            }else{
                var studyList_con=rows[0].study_content;
                res.send(studyList_con);
            }
        })
    })
    //文章评论
    app.get('/comment',function (req,res) {

        var passage_id=(req.query.comment_id)

        // db.query('SELECT comment.passage_id,comment.pid,comment.user_id,comment.content,comment.comment_time,user.name,user.user_img FROM comment LEFT JOIN user ON user.id=comment.user_id WHERE passage_id='+passage_id+' AND pid='+pid+' ORDER BY comment_time DESC',function(err,rows){
        db.query('SELECT comment.passage_id,comment.comment_id,comment.pid,comment.user_id,comment.content,comment.comment_id,comment.comment_time,user.name,user.user_img FROM comment LEFT JOIN user ON user.id=comment.user_id WHERE passage_id='+passage_id+' ORDER BY comment_time DESC',function(err,rows){
            if(err){
                console.log(err)
            }else{
                console.log(rows);
                res.send(rows);
            }
        })
    })
    app.post('/comment',function (req,res) {

    })


    //product
    app.get('/product_list',function (req,res) {
        db.query('SELECT * from product',function (err,rows) {
            if(err){
                console.log(err)
            }else{
                console.log(rows);
                res.send(rows)
            }
        })
    })


    app.get('/homelist',function(req,res){
        res.render("homelist",{
            study:req.session.study
        })
    })
    //slinglove 后台
    //app.get('/slinglove/login',function(req,res){
    //    res.render("slinglove/login",{
    //        study:req.session.study
    //    })
    //})

    //My
    app.get('/my',function(req,res){
        res.render("my",{
            study:req.session.study
        })
    })
    //React
    app.get('/react',function(req,res){
        res.render("react",{
            study:req.session.study
        })
    })



}



