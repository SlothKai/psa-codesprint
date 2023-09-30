var express = require("express");
var router = express.Router();
var User = require("../firebase_config");

const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");

//get all user
router.get("/", async function (req, res, next) {
  try {
    const snapshot = await User.get();
    const users = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const userID = doc.id;
      const user = { id: userID, ...data };
      users.push(user);
    });
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Add user..?
router.post("/add", async function (req, res, next) {
  try {
    const data = req.body;

    //Get current counter value
    const counterRef = firebase
      .firestore()
      .collection("Counter")
      .doc("userCounter");
    const counterDoc = await counterRef.get();
    let counter = counterDoc.exists ? counterDoc.data().value : 0;
    const documentId = counter.toString();

    data.id = documentId;

    //Set Id for new document
    const collectionRef = firebase.firestore().collection("Employees");
    const documentRef = collectionRef.doc(documentId);
    await documentRef.set(data);

    //increment counter for next iteration
    counter++;
    await counterRef.set({ value: counter });

    res.send({ msg: "Added User." });
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).send({ error: "Failed to create document" });
  }
});

router.post("/update", async function (req, res, next) {
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

router.post("/delete", async function (req, res, next) {
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
