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
            this.database.all('SELECT * FROM actors WHERE id = ?', [id], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } 
                else if(rows.length < 1){
                    reject("id inconue");
                }
                else {
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
        }
    });
        });
    }

    create(data) {
        return new Promise((resolve, reject) => {
            this.database.run(
                'INSERT INTO actors (first_name, last_name, date_of_birth, date_of_death) VALUES (?,?,?,?)',
                [data.first_name, data.last_name, data.date_of_birth, data.date_of_death],
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
            this.database.all('SELECT * FROM actors WHERE id = ?', [id], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } 
                else if(rows.length < 1){
                    reject("id inconue");
                }
                else if(data.first_name != null){
                    this.database.run(
                        `UPDATE actors
                         SET first_name = ?
                         WHERE id = ?`,
                        [data.first_name, id],
                        (err) => {
                            if (err) {
                                console.error(err.message);
                                reject(err);
                            }
                        },
                    );
                }
                else if(data.last_name != null){
                    this.database.run(
                        `UPDATE actors
                         SET
                             last_name = ?
                         WHERE id = ?`,
                        [data.last_name, id],
                        (err) => {
                            if (err) {
                                console.error(err.message);
                                reject(err);
                            }
                        },
                    );
                }
                else if(data.date_of_birth != null){
                    this.database.run(
                        `UPDATE actors
                         SET
                             date_of_birth = ?
                         WHERE id = ?`,
                        [data.date_of_birth, id],
                        (err) => {
                            if (err) {
                                console.error(err.message);
                                reject(err);
                            }
                        },
                    );
                }
                else if(data.date_of_death != null){
                    this.database.run(
                        `UPDATE actors
                         SET
                             date_of_death = ?
                         WHERE id = ?`,
                        [data.date_of_death, id],
                        (err) => {
                            if (err) {
                                console.error(err.message);
                                reject(err);
                            }
                        },
                    );
                }
                resolve();
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.database.all('SELECT * FROM actors WHERE id = ?', [id], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } 
                else if(rows.length < 1){
                    reject("id inconue");
                }
                else {
            this.database.run(
                `DELETE FROM actors
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
                }
            });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    decorator(todo) {
        return {
            ...todo
        };
    }

    get_genre() {
        return new Promise((resolve, reject) => {
            this.database.all('SELECT * FROM genres', [], (err, rows) => {
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

    create_genre(data) {
        return new Promise((resolve, reject) => {
            this.database.run(
                'INSERT INTO genres (name) VALUES (?)',
                [data.name],
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

    delete_genre(id) {
        return new Promise((resolve, reject) => {
            this.database.all('SELECT * FROM genres WHERE id = ?', [id], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } 
                else if(rows.length < 1){
                    reject("id inconue");
                }
                else {
            this.database.all('SELECT * FROM films WHERE genre_id = ?', [id], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } 
                else if(rows.length > 0){
                    reject("Genre used");
                }
                else {
                    this.database.run(
                        `DELETE FROM genres
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
                }
            });
            }
        });
    })}

    get_films() {
        return new Promise((resolve, reject) => {
                    this.database.all('SELECT * FROM films', [], (err, rows) => {
                        if (err) {
                            console.error(err.message);
                            reject(err);
                        } else {
                            resolve(
                                rows
                            );
                        }
                    });
                });
    }

    get_films2(id){
        return new Promise((resolve, reject) => {
            this.database.all('SELECT actors.* FROM actors, films, films_actors WHERE films_actors.film_id = ? and films_actors.actor_id = actors.id', [id], (err1, rows1) => {
                if (err1) {
                    console.error(err1.message);
                    reject(err1);
                } else {
                    resolve(
                        rows1.map((row1) => this.decorator(row1)),
                    );
                }
            });
        });
    }

    get_films3(id){
        return new Promise((resolve, reject) => {
            this.database.get('SELECT * FROM genres WHERE id = ? ', [id], (err1, row) => {
                if (err1) {
                    console.error(err1.message);
                    reject(err1);
                } else {
                    resolve(
                        this.decorator(row),
                    );
                }
            });
        });
    }

    get_film(id) {
        return new Promise((resolve, reject) => {
            this.database.get('SELECT * FROM films WHERE id = ?', [id], (err, row) => {
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

    delete_film(id) {
        return new Promise((resolve, reject) => {
            this.database.all('SELECT * FROM films WHERE id = ?', [id], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } 
                else if(rows.length < 1){
                    reject("id inconue");
                }
                else {
            this.database.run(
                `DELETE FROM films_actors
                 WHERE film_id = ?`,
                [id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    }
                },
            );
            this.database.run(
                `DELETE FROM films
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
            }
        });
        });
    }
}

module.exports = TodoRepository;
