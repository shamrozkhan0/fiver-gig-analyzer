#### Validation check
- Character limits: If the title exceeds 80 chars or description exceeds 1,200 chars, the assistant should error out or truncate with a warning.
- Tag count: There must be exactly 5 unique tags. Fewer or duplicate tags should trigger a validation response.
- Format rules:
  - Title must start with “I will” or equivalent first-person promise.
  - No forbidden symbols in title (no & / + ").
  - Description must use bullets for deliverables. Check for at least 3 bullet markers.
  - Avoid spam words (“cheap”, “guaranteed” etc.).
- JSON schema: The final output must be a valid JSON object matching the schema below. If parsing fails or fields are missing, that is an error.