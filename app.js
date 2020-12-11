const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Array to store employee class objects
const employeeObjectArray = [];

//First check for output directory
directoryCheck();
//Then run the main logic
inquirer
  .prompt([
    {
      type: "input",
      name: "numberOfTeamMembers",
      message: "How many people are on your team?",
    },
  ])
  .then((answers) => {
    const staffCount = parseInt(answers.numberOfTeamMembers);
    if (typeof staffCount === "number") {
      asyncCall(staffCount);
    }
  });

async function asyncCall(staffCount) {
  await loopOverEmployees(staffCount);
  outputHTML(render(employeeObjectArray));
}

async function loopOverEmployees(staffCount) {
  for (let i = 0; i < staffCount; i++) {
    const employee = await createTeamMember();
    console.log(employee);
    switch (employee.role) {
      case "Intern":
        employeeObjectArray.push(
          new Intern(employee.name, employee.id, employee.email, employee.other)
        );
        break;

      case "Manager":
        employeeObjectArray.push(
          new Manager(
            employee.name,
            employee.id,
            employee.email,
            employee.other
          )
        );
        break;
      case "Engineer":
        employeeObjectArray.push(
          new Engineer(
            employee.name,
            employee.id,
            employee.email,
            employee.other
          )
        );
        break;
    }
  }
}

async function directoryCheck() {
  fs.access(OUTPUT_DIR, function (error) {
    if (error) {
      fs.mkdirSync(OUTPUT_DIR);
    } else {
      return true;
    }
  });
}
async function outputHTML(data) {
  fs.writeFile("./output/team.html", data, (err) => {
    if (err) throw err;
  });
}

async function createTeamMember() {
  const ans1 = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the team member's name?",
    },
  ]);
  const ans2 = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the team member's id?",
    },
  ]);
  const ans3 = await inquirer.prompt([
    {
      type: "input",
      name: "email",
      message: "What is the team member's email?",
    },
  ]);
  const ans4 = await inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "What is the team member's Role?",
      choices: ["Intern", "Manager", "Engineer"],
    },
  ]);
  const test = await function (answer) {
    switch (answer) {
      case "Intern":
        return "School";
      case "Manager":
        return "Office Number";
      case "Engineer":
        return "GitHub";
    }
  };
  const ans5 = await inquirer.prompt([
    {
      type: "input",
      name: "other",
      message: `What is the team member's ` + test(ans4.role) + " ?",
    },
  ]);

  return { ...ans1, ...ans2, ...ans3, ...ans4, ...ans5 };
}

asyncCall();
