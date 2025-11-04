export const INDENT = "  ";
export const HYPHEN = "-";

export const TEST_CASE_1 =
  "(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)";

export const TEST_CASE_1_SOLUTION = `- id
- name
- email
- type
  - id
  - name
  - customFields
    - c1
    - c2
    - c3
- externalId`;

export const TEST_CASE_2 =
  "(id, (name, email, type(id, name, customFields(c1, c2, c3))), externalId)";
