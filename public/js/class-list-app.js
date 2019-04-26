'use strict'

let listOfStudents

let displayStudentsList = function (studentList) {
  let displayedStudents = document.querySelector('.students')
  displayedStudents.innerHTML = ''

  studentList.forEach(student => {
    let newStudentHTML = `                <div class="row" id=${student.name}>
    <div class="col-3">
        <small class="student-info">${student.name}</small>
    </div>
    <div class="col-3">
        <small class="student-info">${student.studentNumber}</small>
    </div>
    <div class="col-3">
        <small class="student-info">${student.yearOfStudy}</small>
    </div>
    <div class="col-3">
        <button class="btn btn-sm btn-outline-danger">Delete</button>
        <button  data-toggle="modal" data-target="#edit-student-form" type="button" class="btn btn-sm btn-outline-warning">Edit</button>
    </div>
</div>

<hr>`
    displayedStudents.insertAdjacentHTML('beforeend', newStudentHTML)
  })
}

async function getClassList () {
  let response = await fetch('/class/api/list')
  listOfStudents = await response.json()
  displayStudents(listOfStudents)
}

async function deleteStudent (delURL) {
  // console.log(delURL)
  await fetch(delURL)
  getClassList()
}

let displayStudents = function (studentList) {
  displayStudentsList(studentList)
}

getClassList()

// wait to see if student has been deleted
document.querySelector('.list').addEventListener('click', e => {
  let student = e.target.parentNode.parentNode.id
  let btnPressed = e.target.classList[2]

  if (btnPressed === 'btn-outline-danger') { // delete button
    let delURL = `/class/api/delete/${student}`
    deleteStudent(delURL)
  } else if (btnPressed === 'btn-outline-warning') { // edit button
    console.log(`editing ${student}`)
    // update form action to edit clicked student
    let editForm = document.querySelector('#edit-form')
    editForm.action = `/class/api/edit/${student}`

    // find the student from list of students. Alternatively we could retrive stident from database for large classList
    let studentToEdit = listOfStudents.find(currStudent => currStudent.name === student)
    // fill edit for with studen's existing information
    document.querySelector('#editname').value = studentToEdit.name
    document.querySelector('#editstudentNumber').value = studentToEdit.studentNumber
    document.querySelector('#edityearOfStudy').selectedIndex = parseInt(studentToEdit.yearOfStudy) - 1
  }
})
