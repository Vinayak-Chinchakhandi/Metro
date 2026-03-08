const app = require("./src/app");
const { PORT } = require("./src/config/env");

const createTables = require("./src/database/queries");

// Create database tables when server starts
createTables();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});