const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
const contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log("all contacts", allContacts);
      break;

    case "get":
      const foundContact = await contacts.getContactById(id);
      console.log("get by ID", foundContact);
      break;

    case "add":
      const addedContact = await contacts.addContact(name, email, phone);
      console.log("added item", addedContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.log("removed contact", removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
