const allowedOrigins = require("./allowed-origins");

console.log(allowedOrigins);

const corsOptionsDelegate = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
module.exports = corsOptionsDelegate;
