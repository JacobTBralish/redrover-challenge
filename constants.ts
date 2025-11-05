export const INDENT = "  ";
export const HYPHEN = "-";
export const ASC = "ASC";
export const DESC = "DESC";

export const TEST_CASE_1 =
  "(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)";

export const TEST_CASE_1_SOLUTION_SORTED_ASC = `- email
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

export const TEST_CASE_1_SOLUTION_SORTED_DESC = `- type
  - name
  - id
  - customFields
    - c3
    - c2
    - c1
- name
- id
- externalId
- email`;

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

export const TEST_CASE_2_SOLUTION_SORTED_ASC = `- externalId
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

export const TEST_CASE_2_SOLUTION_SORTED_DESC = `- id
  - type
    - name
    - id
    - customFields
      - c3
      - c2
      - c1
  - name
  - email
- externalId`;

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

export const TEST_CASE_3 = `(id, name, type(), customFields(c1, c2, c3))`;

export const TEST_CASE_3_NESTED_PARENTHESIS = `(id, name, type((())), customFields(c1, c2, c3))`;

export const TEST_CASE_3_SOLUTION_SORTED_ASC = `- customFields
  - c1
  - c2
  - c3
- id
- name
- type`;

export const TEST_CASE_3_SOLUTION_SORTED_DESC = `- type
- name
- id
- customFields
  - c3
  - c2
  - c1`;

export const TEST_CASE_3_SOLUTION = `- id
- name
- type
- customFields
  - c1
  - c2
  - c3`;
