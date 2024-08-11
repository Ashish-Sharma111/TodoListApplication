const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const Task = require('./models/task');
const should = chai.should();

chai.use(chaiHttp);

describe('Tasks', () => {

    // Before each test, we empty the database
    beforeEach((done) => {
        Task.deleteMany({}, (err) => { 
           done();           
        });        
    });

    // Test the /GET route
    describe('/GET tasks', () => {
        it('it should GET all the tasks', (done) => {
            chai.request(server)
                .get('/api/tasks')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    // Test the /POST route
    describe('/POST task', () => {
        it('it should not POST a task without required fields', (done) => {
            let task = {
                status: "Not Started",
                priority: "Normal",
                comments: "This is a test task"
            }
            chai.request(server)
                .post('/api/task')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });
        });

        it('it should POST a task ', (done) => {
            let task = {
                assignedTo: "User 1",
                status: "Not Started",
                dueDate: "2024-12-12",
                priority: "Low",
                comments: "This is a test task"
            }
            chai.request(server)
                .post('/api/task')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('assignedTo');
                    res.body.should.have.property('status');
                    res.body.should.have.property('dueDate');
                    res.body.should.have.property('priority');
                    res.body.should.have.property('comments');
                    done();
                });
        });
    });

    // Test the /GET/:id route
    describe('/GET/:id task', () => {
        it('it should GET a task by the given id', (done) => {
            let task = new Task({
                assignedTo: "User 1",
                status: "Not Started",
                dueDate: "2024-12-12",
                priority: "Low",
                comments: "This is a test task"
            });
            task.save((err, task) => {
                chai.request(server)
                .get('/api/task/' + task.id)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('assignedTo');
                    res.body.should.have.property('status');
                    res.body.should.have.property('dueDate');
                    res.body.should.have.property('priority');
                    res.body.should.have.property('comments');
                    res.body.should.have.property('_id').eql(task.id);
                    done();
                });
            });
        });
    });

    // Test the /PUT/:id route
    describe('/PUT/:id task', () => {
        it('it should UPDATE a task by the given id', (done) => {
            let task = new Task({
                assignedTo: "User 1",
                status: "Not Started",
                dueDate: "2024-12-12",
                priority: "Low",
                comments: "This is a test task"
            });
            task.save((err, task) => {
                chai.request(server)
                .put('/api/task/' + task.id)
                .send({
                    assignedTo: "User 1",
                    status: "Completed",
                    dueDate: "2024-12-12",
                    priority: "High",
                    comments: "This task has been updated"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('Completed');
                    res.body.should.have.property('priority').eql('High');
                    res.body.should.have.property('comments').eql('This task has been updated');
                    done();
                });
            });
        });
    });

    // Test the /DELETE/:id route
    describe('/DELETE/:id task', () => {
        it('it should DELETE a task by the given id', (done) => {
            let task = new Task({
                assignedTo: "User 1",
                status: "Not Started",
                dueDate: "2024-12-12",
                priority: "Low",
                comments: "This is a test task"
            });
            task.save((err, task) => {
                chai.request(server)
                .delete('/api/task/' + task.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Task deleted successfully');
                    done();
                });
            });
        });
    });

});
