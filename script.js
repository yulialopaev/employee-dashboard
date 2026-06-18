class Employee {
    #id
    #name
    #salary

    constructor(id, name, title, salary) {
        this.#id = id
        this.setName(name)
        this.title = title
        this.setSalary(salary)
    }

    setName(name) {
        if (name && typeof name === 'string') {
            this.#name = name;
        }
    }

    setSalary(salary) {
        if (typeof salary === 'number' && salary > 0) {
            this.#salary = salary;
        }
    }

    getName() {
        return this.#name
    }

    getSalary() {
        return this.#salary
    }

    getId() {
        return this.#id
    }

    toString() {
        return `Name: ${this.#name}, salary: ${this.#salary}, title: ${this.title}`
    }
}


class Company {
    #employees = []

    hireEmployee(employee) {

        if (employee instanceof Employee) {
            if (this.#employees.some(emp => emp.getId() === employee.getId())) {
                return `Employee with id ${employee.getId()} already exists`
            }

            if (employee.getId() <= 0) {
                return `ID must be a positive number`
            }

            if (employee.getSalary() <= 0) {
                return `Salary must be positive`
            }
            this.#employees.push(employee)

        }
    }// метод для приёма на работу

    fireEmployee(id) {
        const indForFire = this.#employees.findIndex(emp => emp.getId() === id)
        if (indForFire === -1) {
            console.log(`Employee with id ${id} does not exist`)
            return false
        }
        this.#employees.splice(indForFire, 1)
    } // метод для увольнения только по id

    updateEmployee(id, newName, newTitle, newSalary) {
        const newEmployee = this.#employees.find(emp => emp.getId() === id)

        if (!newEmployee) {
            return `Employee with id ${id} does not exist`}

        newEmployee.setName(newName)
        newEmployee.title = newTitle
        newEmployee.setSalary(newSalary)
        return newEmployee
    }

    getAllEmployee() {
        return this.#employees
    }

    // метод для вывода всех работников

    getTotalSalary() {
        return this.#employees.reduce((total, emp) => total + emp.getSalary(), 0)
    } // метод по получению общей зарплаты

    getEmployeeMinSalary() {
        if (this.#employees.length === 0) return null

        const minSalaryEmp = this.#employees.reduce((minEmp, currEmp) => {
            if (currEmp.getSalary() < minEmp.getSalary()) return currEmp
            else return minEmp
        })

        const minSalary = minSalaryEmp.getSalary()

        return this.#employees.filter(emp => emp.getSalary() === minSalary)
    } // минимальная зарплата


}

let employee1 = new Employee(101, "Kate Chang", "General Manager", 80000)
let employee2 = new Employee(102, "Yulia Kolski", "Waiter", 25000)
let employee3 = new Employee(103, "Cage Ivanov", "Waiter", 15000)
let employee4 = new Employee(104, "Lusi Black", "Chief", 28000)
let employee5 = new Employee(105, "Peter White", "Product Manager", 25000)
let employee6 = new Employee(106, "John Snow", "People Manager", 40000)
let employee7 = new Employee(107, "Aria Stark", "Facility Manager", 19000)
let employee8 = new Employee(108, "Sansa Stark", "Cook", 25000)
let employee9 = new Employee(109, "Joffri Barateon", "Cleaner", 15000)


const company = new Company()
company.hireEmployee(employee1)
company.hireEmployee(employee2)
company.hireEmployee(employee3)
company.hireEmployee(employee4)
company.hireEmployee(employee5)
company.hireEmployee(employee6)
company.hireEmployee(employee7)
company.hireEmployee(employee8)
company.hireEmployee(employee9)

company.fireEmployee(12344)
company.getAllEmployee()


const addContainer = document.querySelector('#add-container')
const addId = document.querySelector("#add-id")
const addName = document.querySelector("#add-name")
const addTitle = document.querySelector("#add-title")
const addSalary = document.querySelector("#add-salary")
const addButton = document.querySelector("#add-button")
const saveButton = document.querySelector("#save-button")
saveButton.style.display = "none"
let editingId = null

const msgContainer = document.querySelector("#msg-container")

const tableBody = document.querySelector("#table-body")
const totalSalary = document.querySelector("#total-salary")
const minSalary = document.querySelector("#min-salary")
const minTableBody = document.querySelector("#min-table-body")




function renderEmployees() {
    tableBody.textContent = ""


    company.getAllEmployee().forEach((emp) => {
        const tr = document.createElement("tr")
        const tdId = document.createElement("td")
        const tdName = document.createElement("td")
        const tdTitle = document.createElement("td")
        const tdSalary = document.createElement("td")
        const tdActions = document.createElement("td")
        const tdEditButton = document.createElement("button")
        const tdFireButton = document.createElement("button")

        tdId.textContent = emp.getId()
        tdName.textContent = emp.getName()
        tdTitle.textContent = emp.title
        tdSalary.textContent = emp.getSalary()
        tdEditButton.textContent = "Edit"
        tdFireButton.textContent = "Fire"

        tdActions.append(tdEditButton, tdFireButton)
        tr.append(tdId, tdName, tdTitle, tdSalary, tdActions)
        tableBody.append(tr)

        tdFireButton.addEventListener('click', () => {
            company.fireEmployee(emp.getId())
            renderEmployees()
        })

        tdEditButton.addEventListener("click", () => {
            addId.value = emp.getId()
            addId.readOnly= true
            addName.value = emp.getName()
            addTitle.value = emp.title
            addSalary.value = emp.getSalary()

            editingId = emp.getId()

            tdEditButton.disabled = true
            addButton.style.display = "none"
            saveButton.style.display = "inline-block"

        })

        saveButton.addEventListener('click', () => {

            const newName = addName.value
            const newTitle = addTitle.value
            const newSalary = Number(addSalary.value)

            company.updateEmployee(editingId, newName, newTitle, newSalary)

            addId.value = ""
            addName.value = ""
            addTitle.value = ""
            addSalary.value = ""
            addId.readOnly = false

            saveButton.style.display = "none"
            addButton.style.display = "inline-block"
            tdEditButton.disabled = false

            editingId = null

            renderEmployees()
        })


    })



    totalSalary.textContent = company.getTotalSalary()
    minTableBody.textContent = ""

    company.getEmployeeMinSalary().forEach(emp => {
        const tr = document.createElement("tr")
        const tdId = document.createElement("td")
        const tdName = document.createElement("td")
        const tdTitle = document.createElement("td")
        const tdSalary = document.createElement("td")

        tdId.textContent = emp.getId()
        tdName.textContent = emp.getName()
        tdTitle.textContent = emp.title
        tdSalary.textContent = emp.getSalary()

        tr.append(tdId, tdName, tdTitle, tdSalary)
        minTableBody.append(tr)
    })
}

renderEmployees()


addButton.addEventListener("click", () => {
    const id = Number(addId.value)
    const name = addName.value
    const title = addTitle.value
    const salary = Number(addSalary.value)

    if (addName.value.trim() === "" || addTitle.value.trim() === "") {
        msgContainer.textContent = "All fields must be filled"
        msgContainer.style.color = "red"
        return;
    }

    if (!addId.value || !addName.value || !addTitle.value || !addSalary.value) {
        msgContainer.textContent = "All fields must be filled."
        msgContainer.style.color = "red"
        return
    }

    let newEmployee = new Employee(id, name, title, salary)

    const errorMessage = company.hireEmployee(newEmployee)
    if (errorMessage) {
        msgContainer.textContent = errorMessage
        return;
    }

    addId.value = ""
    addName.value = ""
    addTitle.value = ""
    addSalary.value = ""

    renderEmployees()
})










