const filePath = require("../../controllers/filePath");
const fs = require("fs/promises");
const { listContacts } = require("./listContacts");

async function removeContact(id) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return contacts;
}

module.exports = { removeContact };
