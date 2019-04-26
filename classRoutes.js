'use strict'
const express = require('express')
const path = require('path')
let students = require('./data')

const router = express.Router()

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'class.html'))
})

router.get('/api/list/:id', (req, res) => {
  res.json(students[req.params.id])
})

router.get('/api/list', (req, res) => {
  res.json(students)
})

router.post('/api/edit/:name', (req, res) => {
  console.log(`editing: ${req.params.name}`)
  // first load students
  const editname = req.params.name
  // find student in database
  const index = students.findIndex(el => el.name === editname)

  // edit student to new parameters
  students[index].name = req.body.editname
  students[index].studentNumber = req.body.editstudentNumber
  students[index].yearOfStudy = req.body.edityearOfStudy

  res.redirect('/class')
})

router.post('/api/create', (req, res) => {
  console.log('Creating the following student', req.body.name)
  let newStudent = {
    name: req.body.name,
    studentNumber: req.body.studentNumber,
    yearOfStudy: req.body.yearOfStudy,
    electives: 'none'
  }
  students.push(newStudent)
  res.redirect('/class')
})

router.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create.html'))
})

router.get('/api/delete/:name', (req, res) => {
  console.log(`deleting: ${req.params.name}`)
  const name = req.params.name.toLocaleLowerCase()
  const index = students.findIndex(el => el.name.toLocaleLowerCase() === name)
  index > -1 ? students.splice(index, 1) : res.status(404).redirect('/class')
  res.send(`deleting: ${req.params.name}`)
})

module.exports = router
