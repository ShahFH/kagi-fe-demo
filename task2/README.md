# explain optimization
# Court Hearing Time Calculator

A JavaScript solution for calculating when your court hearing will end, given alphabetical ordering and multiple judges.

## Problem

You're at court with 4 other people. Hearings are conducted in alphabetical order by name, each taking 30 minutes. Multiple judges can work simultaneously. Calculate when your hearing will finish.

## Usage

```javascript
const { court } = require('./court.js');

// Basic usage
court("Jules", 3, "Adam Betty Frank Mike"); // Returns: 60
court("Zane", 1, "Mark Hank Ana Vivian");   // Returns: 150
```

### Parameters
- `myName` (string): Your name
- `judges` (number): Number of judges available  
- `others` (string): Space-separated names of other people

### Returns
- (number): Minutes until your hearing ends

## How it Works

The key insight is that we don't need to sort all names - we just need to count how many names come before yours alphabetically. This gives us your position directly.

**Algorithm:**
1. Split the other names into an array
2. Count names that are alphabetically smaller than yours
3. Your position = count + 1
4. Calculate which "round" you're in: `Math.ceil(position / judges)`
5. Multiply by 30 minutes per hearing

**Time Complexity:** O(n) where n is the number of people

## Optimization Journey

I tried several approaches while optimizing this:

### v1: Basic Sort Approach
```javascript
// Works but O(n log n) due to sorting
const allNames = [myName, ...others.split(' ')];
allNames.sort();
const position = allNames.indexOf(myName);
return Math.ceil((position + 1) / judges) * 30;
```

### v2: Avoid Spread Operator  
```javascript
// Slightly faster, avoid spread overhead
const names = others.split(' ');
names.push(myName);
names.sort();
// ...
```

### v3: Manual Insertion (Failed)
Tried manually inserting name in sorted position to avoid full sort, but `splice()` operations made it slower.

### v4: Count Smaller Names 
```javascript
// O(n) solution - just count names before mine
let smallerCount = 0;
for (let i = 0; i < names.length; i++) {
    if (names[i] < myName) smallerCount++;
}
return Math.ceil((smallerCount + 1) / judges) * 30;
```

### v5: String Parsing Optimization (Overkill)
Attempted to optimize string parsing with character codes, but added complexity wasn't worth it for typical name lengths.

## Performance

The final version is ~2-3x faster than the naive approach:

```
Benchmarking courtNaive: 127ms
Benchmarking courtImproved: 98ms  
Benchmarking court: 42ms ⚡
Benchmarking courtStringOptimized: 51ms
```

## Running Tests

```bash
# Node.js
node court.js

## Files

- `court.js` - Main implementation with multiple versions for comparison
- `README.md` - This file

## Notes

- All alternative implementations are kept in the file for benchmarking
- The main `court()` function uses the fastest O(n) algorithm
- Includes both Node.js and browser compatibility
- Auto-runs tests when executed directly

---
