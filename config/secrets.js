const connection = require('./secrets/connection.js')
function fetchConnectionString(secretName){
    if (connection[secretName])
        return connection[secretName]
    else 
        console.error("Improper key sent to the function")
}

module.exports = {
    fetchConnectionString
}