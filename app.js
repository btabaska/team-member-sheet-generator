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
  })
  .then(outputHTML(render(employeeObjectArray)));

async function asyncCall() {
  for (let i = 0; i < 3; i++) {
    const employee = await createTeamMember();
    employeeObjectArray.push(employee);
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
  await function (answer) {
    switch (answer) {
      case "Intern":
        employeeObjectArray.push(
          new Intern(ans1.name, ans2.id, ans3.email, ans5.other)
        );
      case "Manager":
        employeeObjectArray.push(
          new Manager(ans1.name, ans2.id, ans3.email, ans5.other)
        );
      case "Engineer":
        employeeObjectArray.push(
          new Engineer(ans1.name, ans2.id, ans3.email, ans5.other)
        );
    }
  };

  return { ...ans1, ...ans2, ...ans3, ...ans4, ...ans5 };
}

asyncCall();

async function asyncCall(staffCount) {
  for (let i = 0; i < staffCount; i++) {
    const employee = await createTeamMember();
    employeeObjectArray.push(employee);
  }
}
