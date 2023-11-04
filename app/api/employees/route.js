import employees from "@/data/employees.json";

export async function GET(request) {
  const res = employees;
  return Response.json(res);
}

function iterateEmployees(reqSupervisor, name) {
  let found = false;

  Object.entries(employees).forEach(([key, value]) => {
    let newHireObj = { [name]: [] };

    // If the supervisor is top level, push employee.
    if (key === reqSupervisor) {
      employees[key].push(newHireObj);
      found = true;
      return;
    }

    // The next piece of code will run if the supervisor isn't top level.
    if (Array.isArray(value)) { // If the supervisor's value is an array,
      value.forEach((team) => { // Iterate through the array, "team", is the object children.
        Object.entries(team).forEach(([employee, members]) => {
          if (employee === reqSupervisor) { // If the team object key, is the requested supervisor, push the newHireObj.
            team[employee].push(newHireObj);
            found = true;
          }
          // Array.isArray(members) && members.forEach((subMember) =>
          //   iterateEmployees(subMember, name)
          // );
        })
      });
      // } else if (typeof value === 'object' && value !== null) {
      //   iterateEmployees(value, name);
    }
  });

  // Add the new hire as a top-level entry if the supervisor is not found
  if (!found) {
    employees[reqSupervisor] = [{ [name]: [] }];
  }
}

export async function POST(request) {
  const hire = await request.json();

  Object.entries(hire).forEach(([name, supervisor]) => {
    // let newHire = { [name]: [] };

    iterateEmployees(supervisor, name);

    // if (iterateEmployees(supervisor) && iterateEmployees(name)) { // If the employee and its supervisor exist.
    //   // Take the object of the employee and it's children, and make the child of the supervisor.
    // } else if (iterateEmployees(supervisor) && !iterateEmployees(name)) { // If the supervisor exists.
    //   // Push the newHire to be child of that supervisor.
    // } else if (!iterateEmployees(supervisor) && !iterateEmployees(name)) { // If the does not exist, and the employee does not exist.
    //   // Push a new object, to the top level of the employee json, and push the newHire as it's child: {[supervisor]: [{[name]: []}]}
    // }
  });

  return Response.json(employees);
}
