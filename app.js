const express = require("express");
const app = express();
const index = require("./routes/index");


app.use(express.urlencoded({ extended: true }));

app.use("/", index);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`It's working - listening on port ${PORT}!`);
});