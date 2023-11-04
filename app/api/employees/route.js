import employees from "@/data/employees.json";

export async function GET(request) {
  const res = employees;
  return Response.json(res);
}

function iterateEmployees(json) {
  Object.entries(json).forEach(([key, value]) => {
    console.log(key);

    if (Array.isArray(value)) {
      value.forEach((team) => {
        Object.entries(team).forEach(([employee, members]) => {
          console.log(employee);
          if (Array.isArray(members)) {
            members.forEach((member) => {
              if (typeof member === "object" && member !== null) {
                iterateEmployees(member);
              }
            });
          }
        });
      });
    } else if (typeof value === "object" && value !== null) {
      iterateEmployees(value);
    }
  });
}

export async function POST(request) {
  const hire = await request.json();

  iterateEmployees(employees);

  return Response.json(employees);
}
