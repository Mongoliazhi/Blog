var express = require('express');
var db = require("./mysql.js");

var formidable = require('formidable');
var util = require('util');


module.exports = function(app){
    //slinglove 后台
    //登录页
    app.get('/slinglove/login',function(req,res){
        res.render("slinglove/login",{
            "title":'登录界面'
        })
    })
    app.post('/slinglove/login',function(req,res){
        var username=req.body.username;
        var password=req.body.password;
        db.query('select * from user where username="'+username+'"', function (err, rows) {
            if (err) {
                console.log(err);
            } else {

                if(rows.length==0){
                    res.send("1")
                }
                else if(rows[0].password != password){
                    res.send("2")
                }else if(rows[0].password == password){
                    req.session.slinglove_user=rows;
                    res.send("3")
                    // req.session.user=rows;
                    // // req.flash('success','您好！'+name);
                    // res.redirect("http://localhost:8000/slinglove/index");
                }

            }
        })
    })


    //退出
    app.get('/slinglove/sign_login',function(req,res){
        console.log(req.session.slinglove_user);
        req.session.slinglove_user="";
        console.log(req.session.slinglove_user)
        res.render("slinglove/sign_login",{
            "title":'Mongolia退出界面'
        })
    })
    //app.post('/slinglove/sign_login',function(req,res){
    //    var sign_login=req.body.sign_login;
    //    console.log(sign_login);
    //})
    //主页
    app.get('/slinglove/index',function(req,res){
        if(req.session.slinglove_user.length==""){
            res.render("slinglove/sign_login",{
                "title":'Mongolia退出界面'
            })
        }else{
            db.query('select study_title,study_author,study_time from study',function(err,rows){
                if(err){
                    console.log(err);
                }else{
                    ////study_list=rows;
                    //console.log(study_list);
                    res.render("slinglove/index",{
                        "title":'后台管理界面',
                        slinglove_user:req.session.slinglove_user,
                        study_li:rows
                    })
                }
            })

        }

    })


    //文章
    //文章列表页
    app.get('/slinglove/article_list',function(req,res){
        if(req.session.slinglove_user.length==""){
            res.render("slinglove/sign_login",{
                "title":'退出界面'
            })
        }else{
            db.query('select study_title,study_author,study_time from study',function(err,rows){
                if(err){
                    console.log(err);
                }else{
                    ////study_list=rows;
                    //console.log(study_list);
                    res.render("slinglove/article_list",{
                        "title":'后台文章列表页',
                        slinglove_user:req.session.slinglove_user,
                        study_li:rows
                    })
                }
            })
        }
    })
    app.post('/slinglove/article_list',function(req,res){

    })

    //文章上传页
    app.get('/slinglove/article_upload',function(req,res){
        if(req.session.slinglove_user.length==""){
            res.render("slinglove/sign_login",{
                "title":'退出界面'
            })
        }else{
            res.render("slinglove/article_upload",{
                "title":'后台文章上传页',
                slinglove_user:req.session.slinglove_user
            })
        }
    })
    app.post('/slinglove/article_upload',function(req,res){

        if (req.url == '/slinglove/article_upload' && req.method.toLowerCase() == 'post') {
            console.log("11111111111111111");
            //创建表单上传
            var up_file="public/"
            var form = new formidable.IncomingForm();
            //设置编辑
            form.encoding = 'utf-8';
            //设置文件存储路径ss

            //form.uploadDir = "public/slinglove/images/upload";//win本地上传
            form.uploadDir = up_file+"/slinglove/images/upload/";//win本地上传

            //保留后缀
            form.keepExtensions = true;
            //设置单文件大小限制
            form.maxFieldsSize = 2 * 1024 * 1024;
            //form.maxFields = 1000;  设置所以文件的大小总和
            form.parse(req, function(err, fields, files) {
                console.log("2222222222222222222")
                if (err) {
                    res.render('slinglove/index', { title: "sb" });
                    return;
                }else{
                    //console.log(files)
                    var html=files.file.path;
                    console.log(html)
                    var rs=/\w*.\w*$/g;
                    var re="/slinglove/images/upload/"+html.match(rs).toString();
                    console.log(re)
                    res.end(re);
                }
            });
            return;
        }

        //db.query("insert into studycss(study_name,studyCss_title,studyCss_name,studyCss_titleCon,studyCss_content,studyCss_time) values('" + study_name + "','" + studyTitle + "','" + studyName + "','" + studyTitleCon + "','" + studyContent + "','" + studyTime + "')",function(err,rows){
        //    if (err) {
        //        res.end('修改失败：' + err);
        //    } else {
        //        //res.redirect('/news');
        //        req.flash("success","添加成功！");
        //        res.end("success");
        //    }
        //});
    })

    //chart
    app.get('/slinglove/chart',function(req,res){
        if(req.session.slinglove_user.length==""){
            res.render("slinglove/sign_login",{
                "title":'退出界面'
            })
        }else{
            res.render("slinglove/chart",{
                "title":'后台系统报表页',
                slinglove_user:req.session.slinglove_user
            })
        }
    })


}



