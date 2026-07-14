-- Add linkedin_clicked column to track if the user clicked the LinkedIn button in the success modal
ALTER TABLE waitlist_entries ADD COLUMN linkedin_clicked INTEGER DEFAULT 0;
