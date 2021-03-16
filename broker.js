const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = 8080;
require("dotenv").config();

const deviceRoute = require("./routes/device");
const getDataRoute = require("./routes/data");
const summaryRoute = require("./routes/summary");
const userRoute = require("./routes/user");
const projectRoute = require("./routes/project");
//middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));
if (process.env.APP_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes
app.use("/device/api/project", projectRoute);
app.use("/device/api", deviceRoute);
app.use("/device/data/api", getDataRoute);
app.use("/device/api/summary", summaryRoute);
app.use("/user/api", userRoute);

// database connection
mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    server.listen(process.env.BROKER_PORT, function () {
      const server = app.listen(process.env.DB_PORT);
      const io = require("./socket").init(server);
      io.on("connection", (socket) => {
        // console.log("socket client connected");
      });
      console.log("broker server connected on port:", port);
    });
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
  });
