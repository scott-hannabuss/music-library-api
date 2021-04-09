const app = require("./src/app");

// dictates port where app will run

const APP_PORT = process.env.PORT || 4000;

app.listen(APP_PORT, () => {
  console.log(`Now serving your Express app at http://localhost:${APP_PORT}`); // eslint-disable-line
});
