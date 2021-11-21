const filePath = require("../../controllers/filePath");
const fs = require("fs/promises");

async function listContacts() {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
}

module.exports = { listContacts };
