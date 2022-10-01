const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const list = await listContacts();
  const result = list.find((el) => el.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const list = await listContacts();
  const index = list.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedItem] = list.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(list));
  return removedItem || null;
}

async function addContact(name, email, phone) {
  const list = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: uuid.v4(),
  };
  list.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(list));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
