const db = require('../database');
const TodoRepository = require('../repository/TodoRepository');

exports.todo_list = (req, res) => {
    const repo = new TodoRepository(db);
    repo.list()
        .then((result) => {
            res.json({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

exports.todo_get_actor = (req, res) => {
    const repo = new TodoRepository(db);
    repo.get_actor(req.params.id)
        .then((result) => {
            res.json({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            res.status(404).json({ error: err.message });
        });
}

exports.todo_get = (req, res) => {
    const repo = new TodoRepository(db);
    repo.get()
        .then((result) => {
            res.json({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            res.status(404).json({ error: err.message });
        });
};

exports.todo_create = (req, res) => {
    const errors = [];
    ['first_name', 'last_name', 'date_of_birth'].forEach((field) => {
        if (!req.body[field]) {
            errors.push(`Field '${field}' is missing from request body`);
        }
    });
    if (errors.length) {
        res.status(400).json({
            success: false,
            errors,
        });
        return;
    }

    const repo = new TodoRepository(db);

    repo.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
    })
        .then((result) => {
            res
                .status(201)
                .json({
                    success: true,
                    id: result,
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.todo_update = (req, res) => {
    const errors = [];
    if (errors.length) {
        res.status(400).json({
            success: false,
            errors,
        });
        return;
    }

    const repo = new TodoRepository(db);

    repo.update(
        req.params.id,
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death,
        },
    )
        .then(() => {
            repo.get_actor(req.params.id)
                .then((result) => {
                    res.json({
                        success: true,
                        data: result,
                    });
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.todo_delete = (req, res) => {
    const repo = new TodoRepository(db);

    repo.delete(req.params.id)
        .then(() => {
            res.status(204)
                .json({
                    success: true,
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.todo_delete_genre = (req, res) => {
    const repo = new TodoRepository(db);
    repo.delete_genre(req.params.id)
        .then(() => {
            res.status(204)
                .json({
                    success: true,
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.todo_get_genre = (req, res) => {
    const repo = new TodoRepository(db);
    repo.get_genre()
        .then((result) => {
            res.json({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            res.status(404).json({ error: err.message });
        });
};

exports.todo_create_genre = (req, res) => {
    const errors = [];
    ['name'].forEach((field) => {
        if (!req.body[field]) {
            errors.push(`Field '${field}' is missing from request body`);
        }
    });
    if (errors.length) {
        res.status(400).json({
            success: false,
            errors,
        });
        return;
    }

    const repo = new TodoRepository(db);

    repo.create_genre({
        name: req.body.name,
    })
        .then((result) => {
            res
                .status(201)
                .json({
                    success: true,
                    id: result,
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.todo_get_film = (req, res) => {
    const repo = new TodoRepository(db);
    repo.get_film(req.params.id)
        .then((result) => {
            res.json({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            res.status(404).json({ error: err.message });
        });
}

exports.todo_get_films = (req, res) => {
    const repo = new TodoRepository(db);
    films = repo.get_films()
        .catch((err) => {
            res.status(404).json({ error: err.message });
        });

    actor = repo.get_films2(films.id)
        .catch((err) => {
            res.status(404).json({ error: err.message });
        });

    genre = repo.get_films3(films.genre_id)
        .catch((err) => {
            res.status(404).json({ error: err.message });
        });

    for(film in films) {
        res.json({
            success: true,
            data: film,
            actors: actor,
            genres: genre
        });
    }
};

exports.todo_delete_film = (req, res) => {
    const repo = new TodoRepository(db);
    repo.delete_film(req.params.id)
        .then(() => {
            res.status(204)
                .json({
                    success: true,
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};