const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Mongoose schema for employee data
const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
});

// Mongoose model based on the schema
const Employee = mongoose.model("Employee", employeeSchema);

mongoose.connect("mongodb://127.0.0.1:27017/Assignment5B")
  .then(async () => {
    console.log("Connection to Mongo Created");
    
    const initialEmployee = new Employee({
        name: "Sara Saleem",
        position: "Graphic Designer",
        department: "Design",
      }
      );
  
      await initialEmployee.save();
  
     
      console.log("Initial employee added to the database");
  })
  .catch(err => {
    console.log("Error connecting");
    console.log(err);
  });

// Your existing routes adapted for Mongoose
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/api/search", function (req, res) {
  res.send("API Search");
});

app.get("/api/employees", async function (req, res) {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/employees/:id", async function (req, res) {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(400).send("Employee not found");
    res.send(employee);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.put("/api/employees/:id", async function (req, res) {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        position: req.body.position,
        department: req.body.department,
      },
      { new: true }
    );

    if (!employee) return res.status(400).send("Employee not found");

    res.send(employee);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/employees/:id", async function (req, res) {
  try {
    const deletedEmployee = await Employee.findByIdAndRemove(req.params.id);

    if (!deletedEmployee) return res.status(400).send("Employee not found");

    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/employees", async function (req, res) {
  try {
    const newEmployee = new Employee({
      name: req.body.name,
      position: req.body.position,
      department: req.body.department,
    });

    await newEmployee.save();

    res.send(newEmployee);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(5500, () => {
  console.log("Server is running on port 5500");
});
