
var express = require('express')
	, expressSession = require('express-session')
	, api = express();

	
api.use(expressSession({
  secret: 'eg[isfd-8yF9-75df8',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
	cookie: { secure: true }
  }
}));

api.use(express.static('public'));	

var path = require('path');
var dbPath = path.resolve(__dirname , './db/catalog.db');

//Connect
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }else{
	   console.log('DB Connected.');
  }
});
//	  


api.post('/suppliers/create', function(request, response){
	
	db.serialize(function() {
		
	db.run("INSERT INTO suppliers (id, name, contact, phone, username, password, isadmin) VALUES (?, ?, ?, ?, ?, ?, ?)", 
		null, request.query.pname, request.query.pcontact, request.query.pphone,
			request.query.pusername, request.query.ppassword, request.query.pisadmin);
		
	});	 
	 
 	
});


api.get('/suppliers/all', function(request, response){
	
	var suppliers = [];
	
	//Validate isadmin
	try{
		if(request.session._sesIsAdmin != 'true' ){
			response.json({name: "_UserNotAllowed"});
			response.end;
			return;
		}
	}catch(e){}
	
	
	db.serialize(function() {
		db.each("SELECT id, name, contact, phone, username, password, isadmin FROM suppliers ORDER BY id DESC", function(err, row) {
			suppliers.push({ id: row.id, name: row.name, contact: row.contact, phone: row.phone, username: row.username });
		}, function() {
			//Done
			response.json(suppliers);
			response.end();
		})
	});
});



api.get('/suppliers/login', function(request, response){
	
		
	var sql = 'SELECT id, name, contact, phone, username, password, isadmin FROM suppliers WHERE ',
        query = sql + 'username=? and password=?' ,
        params = [request.query.user, request.query.pass]; 
	
	  db.get( query, params, function(err, row) {
		  
		  try{
			if(row.username != undefined && (row.username!='') ){
				
			//set sessions	
			request.session._sesUsername = row.username;
			request.session._sesName = row.name;
			request.session._sesSupplierId = row.id;
			request.session._sesIsAdmin = row.isadmin
			
			console.log( 'found user:', row.username);	  
			response.json([{ id:row.id, name:row.name, contact:row.contact, phone:row.phone, username:row.username, isadmin: row.isadmin }]);
			}
			else{
			 console.log("User not found");
			 response.json([{name: "_NOsupplierFound"}]);
			}  
		  }catch(e){
			  console.log("User not found");
			  response.json([{name: "_NOsupplierFound"}]);			  
		  }
        
	  }); 

});


api.post('/items/create', function(request, response){
	
	var date = new Date();
	
	db.serialize(function() {
		
	db.run("INSERT INTO items (id, name, cost_price, recommended, t_update) VALUES (?, ?, ?, ?, ?)", 
		null, request.query.pname, request.query.pcost, request.query.precommended, date,
		function(err){
			if(!err){
				//Insert into suppliers_items by last inserted id
				db.get("SELECT max(id) as maxid FROM items", 
				function (error, row) {
					if (error !== null) {
						console.log("Error select max item id");
					} else {

						db.run("INSERT INTO suppliers_items (item_number, supplier_number) VALUES (?, ?)", row.maxid, request.session._sesSupplierId );
					}
				});
				//
			}else{
				console.log("Error insert item");
			}
		}
	
	);
	
    
		
	});	 
});
	

api.get('/items/all', function(request, response){
	
	var items = [];
	
	//Validate not admin
	try{
		if(request.session._sesIsAdmin == 'true' ){
			response.json({name: "_AdminNotAllowed"});
			response.end;
			return;
		}
	}catch(e){}
	
	
	db.serialize(function() {
		db.each("SELECT id,name,cost_price,recommended,t_update,supplier_number FROM items LEFT JOIN suppliers_items ON suppliers_items.item_number=items.id WHERE supplier_number = ?",request.session._sesSupplierId, function(err, row) {
			items.push({ id: row.id, name: row.name, cost_price: row.cost_price, recommended: row.recommended, t_update: row.t_update });
		}, function() {
			//Done
			response.json(items);
			response.end();
		})
	});
});


api.put('/items/update', function(request, response){
	
	var date = new Date();
	
	db.serialize(function() {
		
	var sql = 'UPDATE items SET name=?, cost_price=?, recommended=?, t_update=? WHERE id=? '
        , params = [request.query.pname, request.query.pcost, request.query.precommended, date, request.query.pid ];
		
		db.run( sql, params, function(err) {
			
			if(err){
				console.log("Error update item:"+err);
			}
		 
		});	 
	});
});


api.get('/items/finditem', function(request, response){
	
			
	var sql = 'SELECT id, name, cost_price, recommended, t_update FROM items WHERE ',
        query = sql + 'id=?' ,
        params = [request.query.itemid]; 
		
			
	  db.get( query, params, function(err, row) {
		  
		  try{
			if(row.id != undefined && (row.id!='') ){
				
			response.send({ "id":row.id, "name":row.name, "cost_price":row.cost_price, "recommended":row.recommended, "t_update":row.t_update });
			}
			else{
			  console.log("Item not found");
			  response.json([{name: "_NOitemFound"}]);
			}  
		  }catch(e){
			  console.log("Item not found");
			  response.json([{name: "_NOitemFound"}]);
		  }
        
	  }); 

});



api.get('/suppliers/findsupplier', function(request, response){
	
	var sql = 'SELECT id, name, contact, phone, username, password, isadmin FROM suppliers WHERE ',
        query = sql + 'id=?' ,
        params = [request.query.suppid]; 
		
			
	  db.get( query, params, function(err, row) {
		  
		  try{
			if(row.id != undefined && (row.id!='') ){
				
			console.log( 'supplier Found:', row.id);	  
			response.send({ "id":row.id, "name":row.name, "contact":row.contact, "phone":row.phone, "username":row.username, "password": row.password, "isadmin":row.isadmin });
			}
			else{
			  console.log("Supplier not found");
			  response.json([{name: "_NOSupplierFound"}]);
			}  
		  }catch(e){
			  console.log("Supplier not found");
			  response.json([{name: "_NOSupplierFound"}]);
		  }
        
	  }); 

})


api.put('/suppliers/update', function(request, response){
	
		
	db.serialize(function() {
		
	var sql = 'UPDATE suppliers SET name=?, contact=?, phone=?, username=?, password=?, isadmin=? WHERE id=? '
        , params = [request.query.pname, request.query.pcontact, request.query.pphone, request.query.pusername, request.query.ppassword, request.query.pisadmin, request.query.sid ];
		
		db.run( sql, params, function(err) {
			
			if(err){
				console.log("Error update supplier:"+err);
			}
		 
		});	 
	});
})



api.get('/logout',function(request, response){
request.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    response.redirect('/');
  }
})});

 

api.get('/checksession', function(request, response){
	
	try{
		if(request.session._sesUsername===undefined || request.session._sesSupplierId===undefined){
			response.json({name: "_NoSession"});
		}else{
			response.json({name: "_SessionOK"});
		}
	}catch(e){}

});


 
api.listen(3000, function(){
	console.log("Listening on port 3000");
});

