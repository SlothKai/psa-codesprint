var express = require('express');
var router = express.Router();
var User = require('../config');


//get all user
router.get ("/", async function(req, res, next) {
    try {
        const snapshot = await User.get();
        const users = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            users.push(data);
        });
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

//Add user..?
router.post("/add", async function(req, res, next) {
    try {
      const data = req.body;
      console.log("Data of Users:", data);
      await User.add(data);
      res.send({ msg: "Added User." });
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).send({ error: "Failed to create document" });
    }
  });

router.post("/update", async function(req, res, next) {
    try {
        const id = req.body.id;
        delete req.body.id;
        const data = req.body;
        await User.doc(id).update(data);
        res.send({ msg: "Updated User Details." });
    } catch (error) {
        console.error("Error updating document:", error);
        res.status(500).send({ error: "Failed to update document" });
    }
});

router.post("/delete", async function(req, res, next) {
    try {
        const id = req.body.id;
        await User.doc(id).delete();
        res.send({ msg: "Deleted User." });
    } catch (error) {
        console.error("Error deleting document:", error);
        res.status(500).send({ error: "Failed to delete document" });
    }
});

module.exports = router;