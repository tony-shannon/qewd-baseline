const fs = require("fs");
const generate = require("self-signed");
let pems = generate({
name: "localhost", // the common name
country: "BE", // default
city: "Hofstade",
state: "OVL",
organization: "Stabe nv",
unit: "ICT" // the organizational unit (e.g. department)
});
fs.writeFileSync("localhost.key", pems.private);
fs.writeFileSync("localhost.crt", pems.cert);
