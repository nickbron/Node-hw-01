const { v4 } = require("uuid");
const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(id) {
  const contacts = await listContacts();

  const result = contacts.find((item) => item.id === id);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContent = { id: v4(), name, email, phone };
  contacts.push(newContent);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
}

module.exports = { listContacts, getContactById, addContact, removeContact };
