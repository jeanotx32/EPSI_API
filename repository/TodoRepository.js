/* eslint-disable no-console */
/* eslint-disable func-names */
class TodoRepository {
    constructor(database) {
        this.database = database;
    }

    list() {
        return new Promise((resolve, reject) => {
            this.database.all('SELECT * FROM todo', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(
                        rows.map((row) => this.decorator(row)),
                    );
                }
            });
        });
    }

    get() {
        return new Promise((resolve, reject) => {
            this.database.all('SELECT * FROM actors', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(
                        rows.map((row) => this.decorator(row)),
                    );
                }
            });
        });
    }

    get_actor(id) {
        return new Promise((resolve, reject) => {
            this.database.get('SELECT * FROM actors WHERE id = ?', [id], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(
                        this.decorator(row),
                    );
                }
            });
        });
    }

    create(data) {
        return new Promise((resolve, reject) => {
            this.database.run(
                'INSERT INTO actors (first_name, last_name, date_of_birth, date_of_death) VALUES (?,?,?,?)',
                [data.first_name, data.last_name, data.date_of_birth, data.date_of_birth],
                function (err) {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                },
            );
        });
    }

    update(id, data) {
        return new Promise((resolve, reject) => {
            this.database.run(
                `UPDATE todo
                 SET contents = ?,
                     done = ?
                 WHERE id = ?`,
                [data.contents, data.done ? 1 : 0, id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                },
            );
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.database.run(
                `DELETE FROM todo
                 WHERE id = ?`,
                [id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(true);
                    }
                },
            );
        });
    }

    // eslint-disable-next-line class-methods-use-this
    decorator(todo) {
        return {
            ...todo,
            done: todo.done === 1,
        };
    }
}

module.exports = TodoRepository;
