const express = require('express')

const {
    createUser, getUsers, getUsersById, userUpdate, userDelete
}= require('../controllers/useController');

const validateUser = require('../middleware/userValidation');

const router = express.Router();

router.post("/", validateUser, createUser);

router.get("/", getUsers);

router.get("/:id", getUsersById);

router.put("/:id", userUpdate);

router.delete("/:id", userDelete);

module.exports = router