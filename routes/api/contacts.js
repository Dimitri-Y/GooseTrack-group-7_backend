const express = require("express");

const router = express.Router();
const { validateBody } = require("../../middlewares/validation");
const schemas = require("../../models/schemas/schema");
const ctrlContact = require("../../controllers/contact-controller");
const isValidId = require("../../middlewares/validateId");
const auth = require("../../middlewares/authValidationToken");

router.get("/", auth, ctrlContact.listContacts);

router.get("/:contactId", auth, isValidId, ctrlContact.getContactById);

router.post("/", validateBody(schemas.addSchema), auth, ctrlContact.addContact);

router.delete("/:contactId", isValidId, auth, ctrlContact.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.updateSchema),
  auth,
  ctrlContact.updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  auth,
  ctrlContact.updateStatusContact
);

module.exports = router;
