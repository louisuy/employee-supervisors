import employees from "@/data/employees.json";

export async function GET(request) {
  const res = employees;
  return Response.json(res);
}

export async function POST(request) {
  const hire = await request.json();

  Object.entries(hire).forEach(([name, supervisor]) => {
    const topLevelSupervisor = Object.keys(employees).includes(supervisor);
    const supervisedSupervisor = Object.values(employees).some((arr) =>
      arr.some((employee) => Object.keys(employee)[0] === supervisor)
    );
    const employeeExists = Object.values(employees).some((arr) =>
      arr.some((employee) => Object.keys(employee)[0] === name)
    );

    if (employeeExists) {
      console.log(`${name} is already an existing employee.`);
    } else if (topLevelSupervisor) {
      employees[supervisor].push({ [name]: [] });
      console.log(`${supervisor} (top level) will supervise ${name}.`);
    } else if (supervisedSupervisor) {
      Object.values(employees).forEach((arr) => {
        arr.forEach((employee) => {
          const [supervisorName, supervised] = Object.entries(employee)[0];
          if (supervisorName === supervisor) {
            supervised.push({ [name]: [] });
            console.log(`${supervisor} (supervised) will supervise ${name}.`);
          } else {
            Object.values(supervised).forEach((nestedEmployee) => {
              nestedEmployee.hasOwnProperty(supervisor) &&
                nestedEmployee[supervisor].push({ [name]: [] });
            });
          }
        });
      });
    } else {
      console.log(`${supervisor} is going to be a top level supervisor.`);
    }
  });

  return Response.json(employees);
}
