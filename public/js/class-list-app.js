let students = []

// filters list of students by name
// let filterByName = function (listWithNames, name) {
//   name = name.toLowerCase() // search must be case sensitive
//   return listWithNames.filter(student => (student.name.toLowerCase().startsWith(name)))
// }

let displayStudents = function () {
  let displayedStudents = document.querySelector('.students-list')
  displayedStudents.innerHTML = ''
  // Asychronously
  fetch('/class/api/list')
    .then(response => {
      // chek if response code ok
      if (response.ok) {
        return response.json()
      } else {
        throw 'failed'
      }
    }).then(data => {
      let classList = document.querySelector('.students-list')
      students = data
      // students = filterByName(students)

      data.forEach(student => {
        let li = document.createElement('li')
        let liText = document.createTextNode(student.name)

        li.className += 'student'

        li.appendChild(liText)
        classList.appendChild(li)
      })
    })
    .catch(e => {
      alert(e)
    })
}

// document.querySelector('.search-text').addEventListener('input', e => {
//   // let filter = document.querySelector('.search-text').value
//   // let displayedStudents = filterByName(students, filter)
//   // let displayedStudents = filterByStudentNumber(students, filter)
//   displayStudents()
// })

displayStudents()
