// Your code here
/* Your Code Here */
let createEmployeeRecord = function([firstName, familyName, title, payPerHour]) {
    return  {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents:[],
        timeOutEvents:[]
    } 
}
let createEmployeeRecords = (arrayOfArrays) => {
    let employeeRecords = [];
    arrayOfArrays.map((el)=> {
        let employee = createEmployeeRecord(el);
        return employeeRecords.push(employee);
    })
    return employeeRecords
}
let createTimeInEvent = (bpRecord, dateStamp) => {
    // Separate date and time 
    // Convert string to number
    let hour = parseInt((dateStamp.slice(-4)), 10);
    let date = dateStamp.slice(0,10)
    let timeObj = {
        "type": "TimeIn",
        "hour": hour,
        "date": date
    };
    // Push time in object to employee object
    bpRecord.timeInEvents.push(timeObj);
    return bpRecord
}
let createTimeOutEvent = (obj, dateStamp) => {
    let hour = parseInt((dateStamp.slice(-4)), 10);
    let date = dateStamp.slice(0,10);
    // let newEvent = createEmployeeRecord(obj);
    let timeObj = {
        "type": "TimeOut",
        "hour": hour,
        "date": date
    };  
    obj.timeOutEvents.push(timeObj);
    return obj
}
let hoursWorkedOnDate = (obj, date) => {
    let timeIn = obj.timeInEvents.filter((el) => {
        return el.date === date
    })
    let timeOut = obj.timeOutEvents.filter((el) => {
        return el.date === date
    })
    let hoursWorked = ((timeOut[0].hour - timeIn[0].hour) / 100)
    return hoursWorked;
}
let wagesEarnedOnDate = (obj, date) => {
    let payRate = obj.payPerHour
    let hoursWorked = hoursWorkedOnDate(obj, date);
    let payOwed = hoursWorked * payRate

    return payOwed
}
let allWagesFor = (obj) => {
    // Creates an array of all the applicable dates
    let dates = obj.timeInEvents.map((el) => {
        let datesArray = []
        if (typeof el.date === 'string') {
            return el.date
        }
        return datesArray[el.date]
    })
    // Creates an array of the Pay on each date
    let payPerDay = dates.map((el) => {
        return wagesEarnedOnDate(obj, el)
    })
    // Function/Reducer to add the pay together
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let allWages = payPerDay.reduce(reducer);
    return allWages
}
let calculatePayroll = (Array) => {
    let arrayOfWages = Array.map((el) => {
        return allWagesFor(el);
    })
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let allWages = arrayOfWages.reduce(reducer);
    return allWages
}
let findEmployeeByFirstName = ((srcArray, firstName) => {
    
    let matchingNames = srcArray.filter((el) => {
        return el.firstName === firstName
    })
    if (matchingNames.length === 0) {
        return undefined
    }     
    // let findNames = matchingNames.filter((el) => {
    //     if (matchingNames.length > 0) {
    //     return `${el.firstName}: ${el.familyName}`
    //     }
    // })
    return matchingNames[0]
})
let customerObject = [{
    firstName: "Byron",
    familyName: "Poodle",
    title: "BossDog",
    payPerHour: 100,
    timeInEvents:[{
        "type": "TimeIn",
        "hour": 1000,
        "date": "2014-02-28"
    }, {
        "type": "TimeIn",
        "hour": 1000,
        "date": "2014-03-28"
    },],
    timeOutEvents:[{
        "type": "TimeOut",
        "hour": 2100,
        "date": "2014-02-28"
    }, {
        "type": "TimeOut",
        "hour": 1900,
        "date": "2014-03-28"
    },]
}, {
    firstName: "Jo",
    familyName: "Poodle",
    title: "BossDog",
    payPerHour: 23,
    timeInEvents:[{
        "type": "TimeIn",
        "hour": 1000,
        "date": "2014-02-28"
    }, {
        "type": "TimeIn",
        "hour": 1000,
        "date": "2014-03-28"
    },],
    timeOutEvents:[{
        "type": "TimeOut",
        "hour": 2100,
        "date": "2014-02-28"
    }, {
        "type": "TimeOut",
        "hour": 1900,
        "date": "2014-03-28"
    },]
}, {
    firstName: "Jim",
    familyName: "Poodle",
    title: "BossDog",
    payPerHour: 14,
    timeInEvents:[{
        "type": "TimeIn",
        "hour": 1000,
        "date": "2014-02-28"
    }, {
        "type": "TimeIn",
        "hour": 1000,
        "date": "2014-03-28"
    },],
    timeOutEvents:[{
        "type": "TimeOut",
        "hour": 2100,
        "date": "2014-02-28"
    }, {
        "type": "TimeOut",
        "hour": 1900,
        "date": "2014-03-28"
    },]
}] 

let src = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
  ]
  let emps = createEmployeeRecords(src)
//   let loki = findEmployeeByFirstName(emps, "Loki")


let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 420])
// console.log(createTimeInEvent(bpRecord, "2014-02-28 1400"));
// console.log(calculatePayroll(customerObject));
console.log(findEmployeeByFirstName(customerObject, "Jim"));
// console.log(createTimeOutEvent(["Byron", "Poodle", "Mascot", 3], "2014-02-28 1400"));
createEmployeeRecords([["James", "Manning", "Mr", 420], ["Jordan", "MaJimbnning", "Mr", 420]])
