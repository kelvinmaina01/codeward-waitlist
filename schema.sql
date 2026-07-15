CREATE TABLE waitlist_entries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL,
  company TEXT,
  github TEXT,
  position INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  email_sent INTEGER DEFAULT 0,
  linkedin_clicked INTEGER DEFAULT 0
);
