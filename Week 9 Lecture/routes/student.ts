import express from 'express';
import db from '../db';

const studentRouter = express.Router();

studentRouter.get('/all', (req, res) => {
    res.json([
        {id: 1, name: 'Alex', course: 'Computing'},
        {id: 2, name: 'Bob', course: 'Business'}
    ]);
});

studentRouter.get('/allstudent', (req, res) => {
    const stmt = db.prepare('SELECT * FROM students');
    const students = stmt.all();
    res.json(students)
})

studentRouter.get('/id/:id', (req, res) => {
    res.json({
        id: req.params.id,
        name: 'Alex',
        course: 'Computing'
    });
});

export default studentRouter;