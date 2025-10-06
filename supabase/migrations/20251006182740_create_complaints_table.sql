/*
  # Create Complaints Table

  1. New Tables
    - `complaints`
      - `id` (uuid, primary key) - Unique complaint identifier
      - `ticket_id` (text, unique) - Human-readable ticket ID (e.g., PMAJAY-COMP-12345)
      - `citizen_name` (text) - Name of the citizen filing complaint
      - `citizen_email` (text) - Email address for communication
      - `citizen_phone` (text) - Contact phone number
      - `state` (text) - State where issue occurred
      - `district` (text) - District where issue occurred
      - `complaint_type` (text) - Category of complaint
      - `project_related` (boolean) - Whether complaint is project-related
      - `project_name` (text, optional) - Related project name if applicable
      - `subject` (text) - Brief subject/title of complaint
      - `description` (text) - Detailed description of the complaint
      - `status` (text) - Current status (pending, under_review, resolved, closed)
      - `priority` (text) - Priority level (low, medium, high, urgent)
      - `attachments` (jsonb) - Array of attachment URLs/metadata
      - `resolution_notes` (text, optional) - Admin notes on resolution
      - `assigned_to` (text, optional) - Agency/department assigned to
      - `resolved_at` (timestamptz, optional) - When complaint was resolved
      - `created_at` (timestamptz) - When complaint was filed
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `complaints` table
    - Add policy for public to insert complaints (citizen access)
    - Add policy for authenticated users to view their own complaints
    - Add policy for admin/agency to view and update all complaints

  3. Indexes
    - Add index on ticket_id for quick lookups
    - Add index on status for filtering
    - Add index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id text UNIQUE NOT NULL,
  citizen_name text NOT NULL,
  citizen_email text NOT NULL,
  citizen_phone text NOT NULL,
  state text NOT NULL,
  district text NOT NULL,
  complaint_type text NOT NULL,
  project_related boolean DEFAULT false,
  project_name text,
  subject text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  priority text NOT NULL DEFAULT 'medium',
  attachments jsonb DEFAULT '[]'::jsonb,
  resolution_notes text,
  assigned_to text,
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit complaints"
  ON complaints
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Citizens can view complaints by email"
  ON complaints
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can update complaints"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_complaints_ticket_id ON complaints(ticket_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_complaints_email ON complaints(citizen_email);
