CREATE TABLE tasks (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    item INTEGER REFERENCES tasks(id) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT now(),
    task TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false
);