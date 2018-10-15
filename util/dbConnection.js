//db.js
const sql = require('mssql');
const dbConfig  = require('../config/dbConfig');

exports.query = async function (query) {

    const pool = new sql.ConnectionPool(dbConfig);

    pool.on('error', err => {
        console.log('sql pool error db.js', err);
    });

    try {
        await pool.connect();
        let result = await pool.request();
        result = await result.query(query);
        return result;
    }
    catch (err) { 
        // stringify err to easily grab just the message
        // let e = JSON.stringify(err, ["message", "arguments", "type", "name"]);     
        // return {error: JSON.parse(e).message};
        console.log(err);
    } 
    finally {
        pool.close();
    }

};