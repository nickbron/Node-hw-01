const { listContacts } = require("./controllers/contacts/listContacts");
const { getContactById } = require("./controllers/contacts/getContactById");
const { addContact } = require("./controllers/contacts/addContact");
const { removeContact } = require("./controllers/contacts/removeContact");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error(`contacts with id=${id} not found`);
      }
      console.table(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const deleteContact = await removeContact(id);
      console.table(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

(async () => {
  await invokeAction(argv);
})();
