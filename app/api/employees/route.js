import employees from "@/data/employees.json";

export async function GET(request) {
  const res = employees;
  return Response.json(res);
}

export async function POST(request) {
  const hire = await request.json();

  Object.entries(hire).forEach(([name, supervisor]) => {
    const newHire = { [name]: [] };
    if (Object.keys(employees).includes(supervisor)) {
      console.log(`${supervisor} will supervise ${name}.`); 
    } else if (
      Object.values(employees).some((arr) =>
        arr.some((employee) => Object.keys(employee)[0] === supervisor)
      )
    ) {
      console.log(`${supervisor} will supervise ${name}.`);
    } else {
      console.log(`${supervisor} is not an existing employee.`);
    }
  });

  return Response.json(employees);
}
