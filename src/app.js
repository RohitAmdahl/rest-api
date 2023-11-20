// Importing the Express framework
const express = require("express");
// Importing the mongoose instance from the connection file
const mongoose = require("./db/connection");
// Importing the Student model
const Student = require("./models/student");
// Creating an instance of the Express application
const app = express();
const port = process.env.PORT || 3000;
// Adding middleware to parse incoming JSON requests
app.use(express.json());

// Defining a simple route for the root get request ("/students")
app.get("/students", async (req, res) => {
  try {
    const studentData = await Student.find();
    res.send(studentData);
  } catch (e) {
    res.status(400).send(e);
  }
  console.log(req.body);
});

// Defining a simple route for the root get request WITH ID  ("/students/:id")
app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentId = await Student.findById(_id);
    res.send(studentId);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Handling POST requests to create a new student
app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
  // Logging the request body to the console
  console.log(req.body);
});

// update = edit the student by ID
app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentName = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(201).send(studentName);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Handling DELETE requests
app.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const removeData = await Student.findByIdAndDelete(_id);
    if (!_id === req.params.id) {
      return res.status(400).send();
    } else {
      res.send(removeData);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// Starting the Express application and listening for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
