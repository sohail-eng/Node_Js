
const client = require("./DB_connection.js");
client.connect();


exports.get_users =(req,res)=>
{
    client.query(`SELECT * FROM "users" ORDER BY "id" ASC`,(err,result)=>
    {
        if(!err)
        {
            res.send(result.rows);
        }
        
    });
}

exports.insert_user = async (user,req,res)=>
{
    try
    {
        await client.query(`INSERT INTO "users" ("name","address") VALUES ($1,$2)`,[user.name,user.address]);
        client.query(`SELECT * FROM "users" ORDER BY "id" DESC LIMIT 1`,(_err,result)=>
        {
            res.send(result.rows);
        })
    }
    catch
    {
        res.send("ERR");
    }
    
}

exports.search_user = async (id,req,res)=>
{
    try
    {
        client.query(`SELECT * FROM "users" WHERE "id" = `+id,(_err,result)=>
        {
            res.send(result.rows);
        })
    }
    catch
    {
        res.send("Err");
    }
}

exports.update_user = async (_id,user,req,res)=>
{
    try
    {
        await client.query(`UPDATE "users" SET "name"='`+user.name+`' , "address"='`+user.address+`' WHERE "id" = ` + _id);
        client.query(`SELECT * FROM "users" WHERE "id" = ` + _id,(_err,result)=>
        {
            res.send(result.rows);
        })
    }
    catch
    {
        res.send("ERR");
    }
    
}

exports.delete_user = async (_id,req,res)=>
{
    try
    {
        await client.query(`DELETE FROM "users" WHERE "id" = ` + _id);
        res.send("OK");
    }
    catch
    {
        res.send("ERR");
    }
    
}