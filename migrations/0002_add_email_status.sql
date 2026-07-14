-- Add email_sent column to track if the welcome email was successfully sent
ALTER TABLE waitlist_entries ADD COLUMN email_sent INTEGER DEFAULT 0;
