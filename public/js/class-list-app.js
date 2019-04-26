'use strict'

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
    </div>
</div>

<hr>`
    displayedStudents.insertAdjacentHTML('beforeend', newStudentHTML)
  })
}

async function getClassList() {
  let response = await fetch('/class/api/list')
  let students = await response.json()
  displayStudents(students)
}

async function deleteStudent(delURL) {
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
  let delStudent = e.target.parentNode.parentNode.id
  let delURL = `/class/api/delete/${delStudent}`
  deleteStudent(delURL)
})
