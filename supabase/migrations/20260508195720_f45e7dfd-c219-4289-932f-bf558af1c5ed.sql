DROP POLICY IF EXISTS "public can insert lead_answers" ON public.lead_answers;

CREATE POLICY "public can insert lead_answers with consent"
ON public.lead_answers
FOR INSERT
TO anon, authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.leads l
    WHERE l.id = lead_answers.lead_id
      AND l.privacy_consent = true
  )
);