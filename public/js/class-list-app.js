'use strict'

let displayStudentsList = function (classList, studentList) {
  studentList.forEach(student => {
    let li = document.createElement('li')
    let liText = document.createTextNode(student.name)

    // let liBtn = document.createElement('button')
    // let btn

    li.className += 'student'

    li.appendChild(liText)
    classList.appendChild(li)
  })
}

async function getClassList () {
  let response = await fetch('/class/api/list')
  let students = await response.json()
  displayStudents(students)
}

let displayStudents = function (studentList) {
  let displayedStudents = document.querySelector('.students-list')
  displayedStudents.innerHTML = ''

  displayStudentsList(displayedStudents, studentList)
}

getClassList()
