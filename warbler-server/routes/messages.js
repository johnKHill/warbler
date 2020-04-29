const express = require("express");
// mergeParams - allows to get access to the id inside of this router
const router = express.Router({ mergeParams: true });

const { createMessage, getMessage, deleteMessage } = require("../handlers/messages");


// prefix - /api/users/:id/messages
router.route("/").post(createMessage);

// prefix - /api/users/:id/messages/:message_id
router
  .route("/:message_id")
  .get(getMessage)
  .delete(deleteMessage)


module.exports = router;