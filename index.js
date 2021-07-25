let createEmployeeRecord = (element) => {
    return {
        firstName: element[0],
        familyName: element[1],
        title: element[2],
        payPerHour: element[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

let createEmployeeRecords = (records) => {
    return records.map((element) => {
        return createEmployeeRecord(element);
    });
}

let createTimeInEvent = (employee, dateStamp) => {
    let[date, hour] = dateStamp.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

let createTimeOutEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

let hoursWorkedOnDate = (employee, date) => {
    let timeIn = employee.timeInEvents.find((e) => {
        return e.date === date
    });

    let timeOut = employee.timeOutEvents.find((e) => {
        return e.date === date
    });

    return (timeOut.hour - timeIn.hour)/100;
}

let wagesEarnedOnDate = (employee, date) => {
    let wage = hoursWorkedOnDate(employee, date) * employee.payPerHour;
    return parseInt(wage);
}

let allWagesFor = (employee) => {
    let eligibleDates = employee.timeInEvents.map((e) => {
        return e.date;
    });

    let payable = eligibleDates.reduce((acc, curr) => {
        return acc + wagesEarnedOnDate(employee, curr)
    }, 0);

    return payable;
}

let calculatePayroll = (employees) => {
    return employees.reduce((acc, curr) => {
        return acc + allWagesFor(curr)
    }, 0);
}

let findEmployeeByFirstName = (arr, firstName) => {
    return arr.find(record => {
        return record.firstName === firstName
    })
}
