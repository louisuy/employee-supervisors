import employees from "@/data/employees.json";

export async function GET(request) {
  const res = employees;
  return Response.json(res);
}

function iterateEmployees(json, searchName, newValue) {
  Object.entries(json).forEach(([key, value]) => {
    if (key === searchName) {
      json[key].push(newValue);
    }

    if (Array.isArray(value)) {
      value.forEach((team) =>
        Object.entries(team).forEach(([employee, members]) => {
          if (employee === searchName) {
            team[employee].push(newValue);
          }

          Array.isArray(members) && members.forEach((member) =>
            typeof member === 'object' && member !== null && iterateEmployees(member, searchName, newValue)
          );
        })
      );
    } else if (typeof value === 'object' && value !== null) {
      iterateEmployees(value, searchName, newValue);
    }
  });
}

export async function POST(request) {
  const hire = await request.json();
  
  Object.entries(hire).forEach(([name, supervisor]) => {
    let newHire = { [name] : [] }
    console.log(supervisor, newHire)
    iterateEmployees(employees, supervisor, newHire)
  })

  return Response.json(employees);
}
