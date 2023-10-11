const { nanoid } = require("nanoid");
const ctrlShell = require("../models/ctrlShell");
const { Contact } = require("../models/schemas/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner });
  res.status(200).json(result);
};
const getContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOne({ contactId, owner });
  if (!result) {
    res.status(404).json({ message: "Not found contact their Id" });
  }
  res.status(200).json(result);
};
const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const id = nanoid();
  const newContact = await Contact.create({ id, ...req.body, owner });
  res.status(201).json(newContact);
};
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContacts = await Contact.findByIdAndRemove({ _id: contactId });
  if (!deletedContacts) {
    res.status(404).json({ message: "Not found contact with their Id" });
  }
  res.status(200).json({ message: "contact deleted" });
};
const updateContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const body = req.body;
  if (!body) {
    res.status(404).json({ message: "Enter data, please" });
  }
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    req.body,
    owner,
    { new: true }
  );
  if (!updatedContact) {
    res.status(404).json({ message: "Not found contact with their Id" });
  }
  res.json(updatedContact);
};
const updateStatusContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const body = req.body;
  if (!body) {
    res.status(400).json({ message: "missing field favorite" });
  }
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    req.body,
    owner,
    {
      new: true,
    }
  );
  if (!updatedContact) {
    res.status(404).json({ message: "Not found contact with their Id" });
  }
  res.json(updatedContact);
};

module.exports = {
  listContacts: ctrlShell(listContacts),
  getContactById: ctrlShell(getContactById),
  removeContact: ctrlShell(removeContact),
  addContact: ctrlShell(addContact),
  updateContact: ctrlShell(updateContact),
  updateStatusContact: ctrlShell(updateStatusContact),
};
