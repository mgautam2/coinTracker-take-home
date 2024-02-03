const app = require("./app.js");

const PORT = process.env.SERVER_PORT 

app.listen( PORT, () => { 
  console.log(`Server started listening on port: ${PORT}`);
});