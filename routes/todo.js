const express = require('express');
const todoController = require('../controllers/TodoController');

const router = express.Router();

router.get('/', todoController.todo_list);
router.get('/actor/:id', todoController.todo_get_actor);
router.get('/actor', todoController.todo_get);
router.post('/actor', todoController.todo_create);
router.put('/actor/:id', todoController.todo_update);
router.delete('/:id', todoController.todo_delete);

module.exports = router;
