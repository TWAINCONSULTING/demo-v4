/*
  # Add document category validation trigger

  1. New Functions
    - `validate_document_category()`: Validates document categories against allowed values
  
  2. Changes
    - Add trigger on documents table to validate categories before insert/update
    
  3. Security
    - Function is set to SECURITY DEFINER to ensure consistent execution
*/

-- Create enum type for document categories
CREATE TYPE document_category AS ENUM (
  'arsrapporter',
  'budsjett-okonomi', 
  'vedlikehold',
  'annet'
);

-- Alter documents table to use enum
ALTER TABLE documents 
  ALTER COLUMN category TYPE document_category 
  USING category::document_category;

-- Create validation function
CREATE OR REPLACE FUNCTION validate_document_category()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate category is not null
  IF NEW.category IS NULL THEN
    RAISE EXCEPTION 'Document category cannot be null';
  END IF;

  -- Category is automatically validated by enum type
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER validate_document_category_trigger
  BEFORE INSERT OR UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION validate_document_category();

-- Add comment explaining the trigger
COMMENT ON TRIGGER validate_document_category_trigger ON documents IS 
  'Validates document category values before insert or update';