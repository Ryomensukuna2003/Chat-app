const mssql=require("mssql/msnodesqlv8");
const config = {
    user:"sa",
    password:"Indrapandilawadi@1984",
    database:"testdb",
    server:"localhost",
    driver:"msnodesqlv8",
    options: {
        trustedConnection: true
    }
};
mssql.connect(config, function (err) {
    if (err) console.log(err);
    console.log("Connected to Database");
});
// module.exports = mssql;