const express = require("express");
const Joi = require('joi');

const app = express();
app.use(express.json());
courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('hello api');
});

//get all
app.get('/api/courses/', (req, res) => {
    res.send(courses);
});

//get one
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('the id of the course you are looking is not found');
    }
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('the id of the course you are l0oking is not found');
    }
    const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('the id of the course you are l0oking is not found');
    }

    const index = courses.indexOf(course);

    courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course) {
    const Schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, Schema);
}

app.listen(port, () => console.log(`port listening ${port}`));