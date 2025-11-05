export const INDENT = "  ";
export const HYPHEN = "-";
export const ASC = "ASC";
export const DESC = "DESC";

export const TEST_CASE_1 =
  "(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)";

export const TEST_CASE_1_SOLUTION_SORTED = `- email
- externalId
- id
- name
- type
  - customFields
    - c1
    - c2
    - c3
  - id
  - name`;

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

export const TEST_CASE_2_SOLUTION_SORTED = `- externalId
- id
  - email
  - name
  - type
    - customFields
      - c1
      - c2
      - c3
    - id
    - name`;

export const TEST_CASE_2_SOLUTION = `- id
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
