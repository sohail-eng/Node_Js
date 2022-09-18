



const my_db=require("./DB_Api.js");


var express=require('express');
var fs=require('fs');
var bodyParser=require('body-parser');

var app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var dt=JSON.parse(fs.readFileSync('./data.json'));
var arr=dt.users;
var _id=(dt.length === 0)?0:arr[arr.length-1].id;





app.post('/api/users', (req, res) => {
	
	const data = req.body;
    var dt=JSON.parse(fs.readFileSync('./data.json'));
    var arr=dt.users;
    _id = (arr.length === 0)?0: _id + 1;
    _name=data.name;
    _address=data.address;
    user={
        "id":_id,
        "name":_name,
        "address":_address
    }
    arr[arr.length]=user
    
    fs.writeFileSync('./data.json',JSON.stringify(dt));
    
    res.send(user);

})

app.post('/db/api/users', (req, res) => {
	
	const data = req.body;

    _name=data.name;
    _address=data.address;
    user={
        "name":_name,
        "address":_address
    }
    my_db.insert_user(user,req,res);

})


app.get('/users',(req,res)=>
{
    var dt=JSON.parse(fs.readFileSync('./data.json'));
    var users=dt.users;
    res.send(users);
})

app.get('/db/users',(req,res)=>
{
    my_db.get_users(req,res);
})

app.get('/db/users1',(req,res)=>
{
    console.log(db_id);
    res.send("P");
})


app.get('/api/users/:id',(req,res)=>
{
    _id=req.params.id;
    var dt=JSON.parse(fs.readFileSync('./data.json'));
    var arr=dt.users;
    var user=null;
    arr.forEach(element => {
        if(element.id+"" === _id+"")
        {
            user=element;
            return;
        }
    });
    if(user !== null)
    {
        res.send(user);
    }
    else
    {
        res.send({"response":"User Not Found"})
    }
})

app.get('/db/api/users/:id',(req,res)=>
{
    _id=req.params.id;
    
    my_db.search_user(_id,req,res);

})

app.patch('/api/users/:id',(req,res)=>
{
    _id=req.params.id;
    var data=req.body;
    var dt=JSON.parse(fs.readFileSync('./data.json'));
    var arr=dt.users;
    var user=null;
    arr.forEach(element => {
        if(element.id+"" === _id+"")
        {
            user=element;
            return;
        }
    });
    if(user !== null)
    {
        user.name=data.name;
        user.address=data.address;
        fs.writeFileSync('./data.json',JSON.stringify(dt));
        res.send(user);
    }
    else
    {
        res.send({"response":"User Not Found"})
    }
})

app.patch('/db/api/users/:id',(req,res)=>
{
    _id=req.params.id;
    var data=req.body;
    
    _name=data.name;
    _address=data.address;
    user={
        "name":_name,
        "address":_address
    }

    my_db.update_user(_id,user,req,res);
})

app.delete('/api/users/:id',(req,res)=>
{
    _id=req.params.id;
    var dt=JSON.parse(fs.readFileSync('./data.json'));
    var arr=dt.users;
    var user=null;
    arr.forEach((element,ind) => {
        if(element.id+"" === _id+"")
        {
            delete arr[ind];
            user=element;
            return;
        }
    });
    if(user !== null)
    {

        dt.users=dt.users.filter(x=>x!=null);
        fs.writeFileSync('./data.json',JSON.stringify(dt));
        res.send(user);
    }
    else
    {
        res.send({"response":"User Not Found"})
    }
})

app.delete('/db/api/users/:id',(req,res)=>
{
    _id=req.params.id;
    my_db.delete_user(_id,req,res);
})


app.listen(8000,function(err,result)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("OK");
    }
});

