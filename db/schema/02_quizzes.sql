DROP TABLE IF EXISTS quizzes CASCADE;
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL,
  is_Hidden BOOLEAN NOT NULL DEFAULT FALSE,
  title TEXT NOT NULL,
  level_of_difficulty SMALLINT NOT NULL,
  subject VARCHAR(225) DEFAULT 'general',
  description TEXT NOT NULL
);
