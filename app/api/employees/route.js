import employees from "@/data/employees.json";

export async function GET(request) {
  const res = employees;
  return Response.json(res);
}

function iterateEmployees(json) {
  // console.log(json)
  Object.entries(json).forEach(([key, value]) => {
    console.log(key)
    let child = value
    while (typeof child === 'object') {
      Object.values(child).forEach((team) => {
        Object.entries(team).forEach((employee, members) => {
          console.log(employee, members)
          if (typeof members === 'object') {
            iterateEmployees(members)
          }
        })
      })
      break
    }
  })
}

export async function POST(request) {
  const hire = await request.json();

  iterateEmployees(employees)

  return Response.json(employees);
}
