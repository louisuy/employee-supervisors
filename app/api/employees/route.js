import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'employees.json'); // Define the data file path

// Function to read JSON data from a file
function readDataFromFile() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    } else {
      // If the file does not exist, create an empty object and save it
      const emptyData = {};
      writeDataToFile(emptyData);
      return emptyData;
    }
  } catch (err) {
    console.error('Error reading JSON file:', err);
    return {};
  }
}

// Function to write JSON data to a file
function writeDataToFile(data) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(dataFilePath, jsonData, 'utf8');
  } catch (err) {
    console.error('Error writing JSON file:', err);
  }
}

export async function GET(request) {
  const employeeData = readDataFromFile();
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


export async function POST(request) {
  const newHires = await request.json();
  const employees = readDataFromFile();

  // Modify the data as needed
  Object.entries(newHires).forEach(([name, supervisor]) => {
    iterateEmployees(supervisor, name, employees);
  });

  // Write the modified data back to the file
  writeDataToFile(employees);

  return Response.json(employees);
}