const { v4 } = require("uuid");
const filePath = require("../../controllers/filePath");
const fs = require("fs/promises");
const { listContacts } = require("./listContacts");

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContent = { id: v4(), name, email, phone };
  contacts.push(newContent);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return contacts;
}

module.exports = { addContact };
