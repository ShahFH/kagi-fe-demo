# kagi-fe-demo

This repository contains two frontend tasks:

---

## Task 1: Recipe Widgets ([task1](task1/README.md))

([Live Demo](https://fabulous-griffin-2f46ee.netlify.app/))

A simple HTML and CSS project that demonstrates interactive recipe widgets **without any JavaScript**.

- **Features:**
  - Expandable/collapsible recipe cards for ingredients and instructions
  - Ingredient checkboxes to check off as you cook
  - Responsive, clean design
- **How it works:**  
  Uses hidden checkboxes and CSS selectors to show/hide extra content when "Show more"/"Show less" is clicked.

**Files:**
- [`task1/index.html`](task1/index.html) – Main page with widgets
- [`task1/styles.css`](task1/styles.css) – All styling and show/hide logic
- [`task1/README.md`](task1/README.md) – Approach and explanation

---

## Task 2: Court Hearing Time Calculator ([task2](task2/README.md))

A JavaScript solution to calculate when your court hearing will end, given alphabetical order and multiple judges.

- **Features:**
  - Calculates your hearing end time based on your name, number of judges, and other attendees
  - Multiple optimized algorithm versions included
  - Node.js and browser compatible
  - Includes benchmarking and test utilities

**Usage Example:**
```js
const { court } = require('./court.js');
court("Jules", 3, "Adam Betty Frank Mike"); // → 60
```

**Files:**
- [`task2/court.js`](task2/court.js) – Main implementation and benchmarks
- [`task2/README.md`](task2/README.md) – Optimization journey and usage

---

