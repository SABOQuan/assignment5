const express = require("express");
const app = express();
app.use(express.json());

const employees = {
  1: {
    id: 1,
    name: "Gojo Satoru",
    position: "Software Eng.",
    department: "Engineering",
  },
  2: {
    id: 2,
    name: "Geto Suguru",
    position: "Manager",
    department: "Management",
  },

  2: {
    id: 3,
    name: "Itadori Yuji",
    position: "Janitar",
    department: "Janitar",
  }
  
};

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/api/search", function (req, res) {
  res.send("API Search");
});

app.get("/api/employees", function (req, res) {
  res.send(Object.values(employees));
});

app.get("/api/employees/:id", function (req, res) {
  const employee = employees[req.params.id];
  if (!employee) return res.status(400).send("Employee not found");
  res.send(employee);
});

app.put("/api/employees/:id", function (req, res) {
  const employee = employees[req.params.id];
  if (!employee) return res.status(400).send("Employee not found");

  
  employee.name = req.body.name;
  employee.position = req.body.position;
  employee.department = req.body.department;

  res.send(employee);
});

app.delete("/api/employees/:id", function (req, res) {
  if (!employees[req.params.id]) return res.status(400).send("Employee not found");
  delete employees[req.params.id];
  res.send(Object.values(employees));
});

app.post("/api/employees", function (req, res) {
  const newEmployeeId = Object.keys(employees).length + 1;

  const newEmployee = {
    id: newEmployeeId,
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
  };

  employees[newEmployeeId] = newEmployee;

  res.send(newEmployee);
});

app.listen(5500, () => {
  console.log("Server is running on port 3000");
});
