import employees from "@/data/employees.json";

export async function GET(request) {
  const res = employees;
  return Response.json(res);
}

function iterateEmployees(supervisor, name) {
  Object.entries(employees).forEach(([key, value]) => {
    // If the supervisor is the top level entry key, push the name into the supervisor.
    if (key === supervisor) {
      employees[key].push({[name]:[]});
    }

    if (Array.isArray(value)) {
      value.forEach((team) =>
        Object.entries(team).forEach(([employee, members]) => {
          if (employee === supervisor) {
            team[employee].push(name);
          }

          Array.isArray(members) && members.forEach((member) =>
            typeof member === 'object' && member !== null && iterateEmployees(member, supervisor, name)
          );
        })
      );
    } else if (typeof value === 'object' && value !== null) {
      iterateEmployees(value, supervisor, name);
    }
  }
  );
}

export async function POST(request) {
  const hire = await request.json();

  Object.entries(hire).forEach(([name, supervisor]) => {
    // let newHire = { [name]: [] };

    iterateEmployees(supervisor, name)

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