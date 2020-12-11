const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeObjectArray = [];

(async function createTeamMember() {
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
  await inquirer.prompt([
    {
      type: "input",
      name: "other",
      message: `Do you want to add another employee? [Y/n]?`,
    },
  ]);
  const test2 = await function (answer) {
    console.log(answer);
    switch (answer.toLowerCase()) {
      case "y":
        console.log("s");
      case "n":
        return;
    }
  };

  return { ...ans1, ...ans2, ...ans3, ...ans4, ...ans5 };
})()
  .then(console.log(employeeObjectArray))
  .catch(console.error);

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
