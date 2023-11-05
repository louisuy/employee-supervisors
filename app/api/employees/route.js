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
