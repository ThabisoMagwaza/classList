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

router.post('/api/edit', (req, res) => {
  console.log(`editing: ${req.body.nameCurrent} -> ${req.body.nameNew}`)
  // first load students
  const nameCurrent = req.body.nameCurrent
  const nameNew = req.body.nameNew
  const index = students.findIndex(el => el.name.toLocaleLowerCase() === nameCurrent.toLocaleLowerCase())
  index > -1 ? students[index].name = nameNew : res.status(404).redirect('/class')
  res.redirect('/class')
})

router.post('/api/create', (req, res) => {
  console.log('Creating the following student', req.body.studentName)
  let newStudent = {
    name: req.body.studentName,
    studentNumber: 1234,
    yearOfStudy: 4,
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
