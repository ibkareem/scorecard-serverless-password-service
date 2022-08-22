const bcrypt = require("bcryptjs");
const Chance = require("chance");

async function handler(event, context) {
  const { password, action, hash } = JSON.parse(event.body);
  //hash a password
  if (action && action.toLowerCase() === "hash") {
    return JSON.stringify({
      hash: await bcrypt.hash(password, 10),
    });
  }
  //compare a password
  else if (action && action.toLowerCase() === "compare") {
    return JSON.stringify({
      compare: await bcrypt.compare(password, hash),
    });
  }
  //random password
  else if (action && action.toLowerCase() === "random") {
    const chance = new Chance();
    const randomPassword = chance.string({ length: 10 });
    return JSON.stringify({
      password: randomPassword,
    });
  } else {
    let response = {
      status: 404,
      body: "Invalid Usage. Please check the documentation",
    };
    return response;
  }
}

module.exports = { handler };
