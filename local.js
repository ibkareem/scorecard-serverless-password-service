const lambdaLocal = require("lambda-local");
const path = require("path");

let payload = {
  password: "paulo",
  action: "compare",
  hash: "$2b$10$2qSP4U8fajuEZpc7iBbMJu7QWjxmqDeVHNCN6wdMXNL5VhVyh6V7W",
};

lambdaLocal
  .execute({
    event: payload,
    lambdaPath: path.join(__dirname, "/password.js"),
    profilePath: "~/.aws/credentials",
    profileName: "default",
    timeoutMs: 3000,
  })
  .then((done) => {
    console.log(done);
  })
  .catch(function (err) {
    console.log(err);
  });
