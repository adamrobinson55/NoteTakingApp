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

notes.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId)

            writeToFile('./db/db.json', result)

            res.json(`Note ${noteId} has been deleted`)
        })
})

module.exports = notes