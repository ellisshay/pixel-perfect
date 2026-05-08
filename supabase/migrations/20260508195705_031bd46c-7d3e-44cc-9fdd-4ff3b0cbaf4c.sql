-- Add new columns to leads
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS monthly_saving_range text,
  ADD COLUMN IF NOT EXISTS source_cta text,
  ADD COLUMN IF NOT EXISTS calculator_type text,
  ADD COLUMN IF NOT EXISTS quiz_result text,
  ADD COLUMN IF NOT EXISTS urgency text,
  ADD COLUMN IF NOT EXISTS partner_id uuid;

-- Create lead_answers table
CREATE TABLE IF NOT EXISTS public.lead_answers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  question_label text NOT NULL,
  answer_value text NOT NULL,
  answer_label text,
  step_index integer,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lead_answers_lead_id ON public.lead_answers(lead_id);

ALTER TABLE public.lead_answers ENABLE ROW LEVEL SECURITY;

-- Allow public insert (must be tied to a lead — we'll insert right after lead insert)
CREATE POLICY "public can insert lead_answers"
ON public.lead_answers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "admins read lead_answers"
ON public.lead_answers
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admins delete lead_answers"
ON public.lead_answers
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));