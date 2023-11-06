import fs from "fs";
import path from "path";

const employeesPath = path.join(process.cwd(), "data", "employees.json");
const employeesUiObjectPath = path.join(
  process.cwd(),
  "data",
  "employeesUiObject.json"
);

// Function to read JSON data from a file
function readDataFromFile(dataFilePath) {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, "utf8");
      return JSON.parse(data);
    } else {
      // If the file does not exist, create an empty object and save it
      const emptyData = {};
      writeDataToFile(emptyData, dataFilePath);
      return emptyData;
    }
  } catch (err) {
    console.error("Error reading JSON file:", err);
    return {};
  }
}

// Function to write JSON data to a file
function writeDataToFile(data, dataFilePath) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(dataFilePath, jsonData, "utf8");
  } catch (err) {
    console.error("Error writing JSON file:", err);
  }
}

export async function GET(request) {
  const employeeData = readDataFromFile(employeesPath);
  return Response.json(employeeData);
}

function iterateEmployees(supervisor, newHire, data) {
  let found = false;

  function processTeam(team) {
    for (const key in team) {
      if (team.hasOwnProperty(key)) {
        if (key === supervisor) {
          if (!team[key].some((member) => member.hasOwnProperty(newHire))) {
            team[key].push({ [newHire]: [] });
          }
          found = true;
        }
        if (Array.isArray(team[key])) {
          team[key].forEach((subTeam) => {
            processTeam(subTeam);
          });
        }
      }
    }
  }

  processTeam(data);

  if (!found) {
    data[supervisor] = [{ [newHire]: [] }];
  }
}

function updateEmployeesObject(name, supervisor, data) {
  // Check if the employee already exists in the data
  const existingEmployeeIndex = data.findIndex(
    (employee) => employee.name === name
  );

  if (existingEmployeeIndex !== -1) {
    // If the employee exists, update the supervisor
    data[existingEmployeeIndex].supervisor = supervisor;
  } else {
    // If the employee doesn't exist, add a new entry
    data.push({ name, supervisor });
  }
}

export async function POST(request) {
  const newHires = await request.json();
  const employees = readDataFromFile(employeesPath);
  let employeesUiObject = readDataFromFile(employeesUiObjectPath);

  // If employeesUiObject is not an array, initialize it as an empty array
  if (!Array.isArray(employeesUiObject)) {
    employeesUiObject = [];
  }

  // Modify the data as needed
  Object.entries(newHires).forEach(([name, supervisor]) => {
    iterateEmployees(supervisor, name, employees);
    updateEmployeesObject(name, supervisor, employeesUiObject);
  });

  // Write the modified data back to the files
  writeDataToFile(employees, employeesPath);
  writeDataToFile(employeesUiObject, employeesUiObjectPath);

  return Response.json(employees, { status: 201 });
}

function deleteFromTeam(data, employee, supervisor) {
  // console.log(employee, supervisor)
  for (const key in data) {
    // if (key === employee) {
    //   console.log(data[key])
    //   // delete data[key]; // Delete the employee entry from the object
    //   return;
    // }
    if (data.hasOwnProperty(key)) {
      if (key === supervisor) {
        const members = data[key];
        const employeeIndex = members.findIndex((member) =>
          member.hasOwnProperty(employee)
        );
        if (employeeIndex !== -1) {
          // console.log(members[employeeIndex])
          members.splice(employeeIndex, 1); // Remove the employee from the array
        }
      }
      if (Array.isArray(data[key])) {
        data[key].forEach((subTeam) => {
          deleteFromTeam(subTeam, employee, supervisor);
        });

        // Check if the array becomes empty after deleting the employee
        // if (data[key].length === 0) {
        //   // delete data[key]; // Delete the array if it becomes empty
        // }
      }
    }
  }
}

function deleteFromUiObject(data, employee) {
  for (let i = 0; i < data.length; i++) {
    const employeeData = data[i];
    if (employeeData.name === employee) {
      data.splice(i, 1); // Remove the employee object from the array
      return;
    }
  }
}

export async function DELETE(request) {
  const employeesToDelete = await request.json();
  const employees = readDataFromFile(employeesPath);
  let employeesUiObject = readDataFromFile(employeesUiObjectPath);

  Object.entries(employeesToDelete).forEach(([name, supervisor]) => {
    deleteFromTeam(employees, name, supervisor);
    deleteFromUiObject(employeesUiObject, name); // Rewrite employeesUiObject
  });

  // Write the modified data back to the files
  writeDataToFile(employees, employeesPath);
  writeDataToFile(employeesUiObject, employeesUiObjectPath);

  return Response.json(employees, { status: 201 });
}

export async function PATCH(request) {
  // const editedData = [{ "Moied": "Aysar" }, { "Louis": "Roubi" }];
  const editedData = await request.json();
  const employees = readDataFromFile(employeesPath);
  let employeesUiObject = readDataFromFile(employeesUiObjectPath);

  let oldData, newData;

  editedData.forEach((modification, index) => {
    if (index === 0) {
      oldData = modification;
    } else if (index === 1) {
      newData = modification;
    }
  });

  // console.log(oldData);
  const oldName = Object.keys(oldData)[0];
  const oldSupervisor = Object.values(oldData)[0];
  console.log(oldName, oldSupervisor);

  deleteFromTeam(employees, oldName, oldSupervisor);
  writeDataToFile(employees, employeesPath);
  deleteFromUiObject(employeesUiObject, oldName);
  writeDataToFile(employeesUiObject, employeesUiObjectPath);


  console.log(newData);
  const newName = Object.keys(newData)[0];
  const newSupervisor = Object.values(newData)[0];

  console.log(newName, newSupervisor);
  iterateEmployees(newSupervisor, newName, employees);
  writeDataToFile(employees, employeesPath);
  updateEmployeesObject(newName, newSupervisor, employeesUiObject);
  writeDataToFile(employeesUiObject, employeesUiObjectPath);

  return Response.json(employees, { status: 201 });
}