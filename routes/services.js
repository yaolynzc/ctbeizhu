var sql = require('mssql');

var config = {
	user:'sa',
	password:'flame',
	server:'127.0.0.1',
	database:'chutian'
}

//楚天高速车辆监控项目备注信息存储服务
//get(/addbeizhu?carname=&curtime=&content=&beizhu=)
exports.addbeizhu = function(req,res){
	sql.connect(config).then(function(){
		var request = new sql.Request();
		request.input('carname',sql.NVarChar(50),req.query.carname);
		request.input('curtime',sql.DateTimeOffset(),new Date(req.query.curtime));
		request.input('content',sql.NVarChar(sql.MAX),req.query.content);
		request.input('beizhu',sql.NVarChar(sql.MAX),req.query.beizhu);
		request.input('uname',sql.NVarChar(50),req.query.uname);
		//console.log(new Date(req.query.curtime));
		// request.input('addtime',sql.DateTime(),new DateTime());
		// request.input('updatetime',sql.DateTime(),new DateTime());
		request.query('insert into tb_ctbeizhu(carname,curtime,content,beizhu,uname) values(@carname,@curtime,@content,@beizhu,@uname)').then(function(){
			res.send({
				success:true
			})
		}).catch(function(err){
			console.log(err);
			res.statusCode = 503;
			res.send({
				success:false,
				msg:err
			})
		});
	});
}

//楚天高速车辆监控项目备注信息存储服务
//get(/addbeizhu2?id=&beizhu=)
exports.addbeizhu2 = function(req,res){
	sql.connect(config).then(function(){
		var request = new sql.Request();
		request.input('sid',sql.NVarChar(50),req.query.sid);
		request.input('beizhu',sql.NVarChar(250),req.query.beizhu);
		//console.log(new Date(req.query.curtime));
		// request.input('addtime',sql.DateTime(),new DateTime());
		// request.input('updatetime',sql.DateTime(),new DateTime());
		request.query('update ta set ta.intoposinfo = ta.intoposinfo + @beizhu from vhcOutLine ta where ta.id = @sid ').then(function(){
			res.send({
				success:true
			})
		}).catch(function(err){
			console.log(err);
			res.statusCode = 503;
			res.send({
				success:false,
				msg:err
			})
		});
	});
}