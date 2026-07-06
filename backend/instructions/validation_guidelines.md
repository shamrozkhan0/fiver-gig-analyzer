# GigBro Validation Guidelines

## Purpose

Before evaluating or optimizing a Fiverr gig, validate the provided input to ensure that the analysis is based only on reliable and available information.

Validation should prevent incorrect assumptions while allowing GigBro to continue evaluating all valid fields.

---

# General Principles

* Never invent missing information.
* Never fail the entire evaluation because one field is missing.
* Evaluate every field independently whenever possible.
* Report limitations caused by missing information.
* Continue the analysis using only the available data.

---

# Required Fields

The following fields are expected as input:

* Gig Title
* Gig Description
* Expertise
* Category & Subcategory
* Packages
* Tags
* Seller Profile Description
* Ratings (optional)
* Total Reviews (optional)
* Gig Stars (optional)
* About Profile (optional)

---

# Missing Title

If the title is:

* Missing
* Empty
* Contains only whitespace

Then:

* Do not evaluate title quality.
* Generate an optimized title.
* Reduce the SEO score appropriately.
* Mention that the original title was unavailable.

---

# Missing Description

If the description is missing:

* Skip description evaluation.
* Generate a new optimized description.
* Reduce the SEO score appropriately.

---

# Missing Tags

If tags are missing:

* Skip tag evaluation.
* Generate optimized tags.
* Reduce the Keyword Strength score.

---

# Missing Seller Profile Description

If the seller profile description is missing:

* Skip profile evaluation.
* Generate an optimized profile description.

Do not reduce unrelated scores.

---

# Missing Packages

If packages are missing:

* Skip package evaluation.
* Do not evaluate pricing.
* Explain that package analysis could not be performed.

---

# Missing Category

If the category or subcategory is missing:

* Set category alignment status to **false**.
* Explain that alignment cannot be verified.
* Recommend selecting the most appropriate category based on the available gig information.

---

# Missing Expertise

If expertise is missing:

* Infer the seller's primary service only from:

  * Title
  * Description
  * Packages
  * Tags

State that expertise information was unavailable.

---

# Missing Ratings

If ratings are unavailable:

* Buyer Trust = **0**
* Do not estimate ratings.
* Do not affect SEO Strength.

---

# Missing Total Reviews

If review count is unavailable:

Use only the available rating information.

Never estimate review count.

---

# Missing Star Distribution

If gig star distribution is unavailable:

Calculate Buyer Trust using only:

* Average Rating
* Total Reviews (if available)

If neither exists:

Buyer Trust = **0**

---

# Missing About Profile

If About Profile is missing:

Skip its evaluation.

Do not reduce SEO Strength.

---

# Inconsistent Information

Detect inconsistencies such as:

* Title and description describe different services.
* Tags target another niche.
* Packages do not match the title.
* Seller profile contradicts expertise.
* Category does not match the service.

When inconsistencies are found:

* Explain them clearly.
* Recommend corrections.
* Reduce relevant scores only.

---

# Empty or Low-Quality Content

If content exists but is extremely poor:

* Evaluate it normally.
* Recommend improvements.
* Rewrite only when necessary.

Do not treat poor content as missing content.

---

# Invalid Values

Ignore invalid or malformed values.

Continue evaluating the remaining valid information.

Do not terminate the analysis because of one invalid field.

---

# Final Validation Checklist

Before producing the final response, verify that:

* No assumptions were made.
* Missing information was handled correctly.
* Every generated field is supported by the available data.
* Scores remain internally consistent.
* Every required output field has been produced.
* The final response follows the required output schema.