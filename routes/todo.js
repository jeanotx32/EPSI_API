const express = require('express');
const todoController = require('../controllers/TodoController');

const router = express.Router();

router.get('/actor/:id', todoController.todo_get_actor);
router.get('/actor', todoController.todo_get);
router.post('/actor', todoController.todo_create);
router.put('/actor/:id', todoController.todo_update);
router.delete('/actor/:id', todoController.todo_delete);

router.get('/genre', todoController.todo_get_genre);
router.post('/genre', todoController.todo_create_genre);
router.delete('/genre/:id', todoController.todo_delete_genre);

router.get('/film/:id', todoController.todo_get_film);
router.get('/film', todoController.todo_get_films);
/*router.post('/film', todoController.todo_create_film);
router.put('/film/:id', todoController.todo_update_film);
*/router.delete('/film/:id', todoController.todo_delete_film);
module.exports = router;
