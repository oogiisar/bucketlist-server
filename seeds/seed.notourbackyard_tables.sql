BEGIN;

TRUNCATE
  tasks,
  items,
  users;

INSERT INTO users (email, password)
VALUES
  ('oogiisar@gmail.com', '$2a$12$G0o6CiEp1Eo2WxajTlnAVODIvT5YgoKToy7RuENsBqUe7r0AnsI9C'),
  ('brian@gmail.com', '$2a$12$G0o6CiEp1Eo2WxajTlnAVODIvT5YgoKToy7RuENsBqUe7r0AnsI9C');

INSERT INTO items (user_id, item, completed)
VALUES
  (1, 'Go to Mongolia', true),
  (1, 'Learn to Dance', false),
  (2, 'Go to the Moon', false);

INSERT INTO tasks (item, task, completed)
VALUES
  (2, 'Buy dancing shoes', true),
  (2, 'Sign up for classes', false),
  (3, 'Go to NASA school', false);

COMMIT;