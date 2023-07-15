const notes = require('express').Router()
const {
    readFromFile,
    writeToFile,
    readAndAppend
} = require('../helpers/fsUtils')


notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

notes.post('/notes', (req, res) => {
    const { title, text } = req.body

    if (title && text) {
        const newNote = {
            title,
            text
        }


        readAndAppend(newNote, './db/db.json')

        const response = {
            status: 'success',
            body: newNote
        }

        res.json(newNote)
    } else {
        res.json('Error in posting note')
    }
})

module.exports = notes