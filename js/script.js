// Define the Employee class
class Employee {
    static idCounter = 1; // Static counter to generate unique IDs

    constructor(name, age) {
        this.id = Employee.idCounter++;
        this.name = name;
        this.age = age;
        this.annualSalary = 0;
    }
}

// Define the PartTime class extending Employee
class PartTime extends Employee {
    constructor(name, age, payRate, hours) {
        super(name, age);
        this.payRate = payRate;
        this.hours = hours;
        this.employeeType = "Part Time";
    }

    // Method to calculate annual pay for a part-time employee
    calculatePay() {
        // Assuming 52 weeks in a year
        this.annualSalary = this.payRate * this.hours * 52;
    }
}

// Define the Manager class extending Employee
class Manager extends Employee {
    constructor(name, age, payRate, hours) {
        super(name, age);
        this.payRate = payRate;
        this.hours = hours;
        this.employeeType = "Manager";
    }

    // Method to calculate annual pay for a manager
    calculatePay() {
        // Assuming 52 weeks in a year
        const standardHours = 40;
        const overtimeRate = 1.5;
        const overtimeHours = Math.max(this.hours - standardHours, 0);
        this.annualSalary = ((standardHours * this.payRate) + (overtimeHours * overtimeRate * this.payRate)) * 52 - 1000;
    }
}

// Define the Main class
class Main {
    constructor() {
        this.employees = [];
    }

    // Method to display main menu options
    displayMenu() {
        console.clear(); // Clear the console before displaying the menu
        console.log("Main Menu:");
        console.log("1. Add Employee");
        console.log("2. Remove Employee");
        console.log("3. Edit Employee");
        console.log("4. Display Employees");
        console.log("5. Exit");
    }

    // Method to add an employee to the table
    addEmployee() {
        const input = prompt("Enter employee information (name, age, hrs/wk, pay rate):");
        const [name, age, hours, payRate] = input.split(",").map(item => item.trim());
        const parsedAge = parseInt(age);
        const parsedHours = parseInt(hours);
        const parsedPayRate = parseFloat(payRate);

        if (isNaN(parsedAge) || isNaN(parsedHours) || isNaN(parsedPayRate)) {
            console.log("Invalid input. Please enter valid information.");
            return;
        }

        let employee;
        if (parsedHours >= 40) {
            employee = new Manager(name, parsedAge, parsedPayRate, parsedHours);
        } else {
            employee = new PartTime(name, parsedAge, parsedPayRate, parsedHours);
        }

        employee.calculatePay();
        this.employees.push(employee);
        console.clear();
        console.log("Employee added successfully:");
        console.log("ID\tName\tSalary\tHrs\tPay\tFT/PT");
        console.log(`${employee.id}\t${employee.name}\t${employee.annualSalary}\t${employee.hours}\t${employee.payRate}\t${employee.employeeType}`);
        console.log("Input Details:");
        console.log(`Name: ${name}, Age: ${parsedAge}, Hours/week: ${parsedHours}, Pay Rate: ${parsedPayRate}`);
        prompt("Press Enter to continue...");
    }

    // Method to remove an employee from the table
    removeEmployee() {
        const name = prompt("Enter employee name to remove:");
        const index = this.employees.findIndex(employee => employee.name === name);
        
        if (index !== -1) {
            this.employees.splice(index, 1);
            console.log("Employee removed successfully.");
        } else {
            console.log("Employee not found.");
        }
        prompt("Press Enter to continue...");
    }

    // Method to edit an employee's pay rate
    editEmployee() {
        const name = prompt("Enter employee name to edit:");
        const employee = this.employees.find(employee => employee.name === name);

        if (employee) {
            const newPayRate = parseFloat(prompt("Enter new pay rate:"));
            employee.payRate = newPayRate;
            employee.calculatePay();
            console.log("Employee pay rate updated successfully.");
        } else {
            console.log("Employee not found.");
        }
        prompt("Press Enter to continue...");
    }

    // Method to display all employees in the table
    displayEmployees() {
        console.clear();
        console.log("Employee List:");
        console.log("ID\tName\tSalary\tHrs\tPay\tFT/PT");
        this.employees.forEach(employee => {
            console.log(`${employee.id}\t${employee.name}\t${employee.annualSalary}\t${employee.hours}\t${employee.payRate}\t${employee.employeeType}`);
        });
        prompt("Press Enter to continue...");
    }

    // Method to start the main menu loop
    start() {
        let choice;
        do {
            this.displayMenu();
            choice = prompt("Main Menu:\n1. Add Employee\n2. Remove Employee\n3. Edit Employee\n4. Display Employees\n5. Exit");

            switch (choice) {
                case "1":
                    this.addEmployee();
                    break;
                case "2":
                    this.removeEmployee();
                    break;
                case "3":
                    this.editEmployee();
                    break;
                case "4":
                    this.displayEmployees();
                    break;
                case "5":
                    console.log("Exiting the program...");
                    break;
                default:
                    console.log("Invalid choice. Please choose from 1 to 5.");
            }
        } while (choice !== "5");
    }
}

// Instantiate the Main class and start the program
const main = new Main();
main.start();
