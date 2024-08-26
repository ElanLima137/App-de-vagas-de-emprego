import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lbgaoictavcwjosyjpub.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZ2FvaWN0YXZjd2pvc3lqcHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyMTgyNDcsImV4cCI6MjAzMjc5NDI0N30.lIvq8B5mO9G4vSfHhErcE_NRpYK3J08BJ-fFFlX8RrE';

export const supabase = createClient(supabaseUrl, supabaseKey);