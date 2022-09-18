

const {Client}=require("pg");

const client=new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"admin",
    database:"Test"
});

module.exports = client;