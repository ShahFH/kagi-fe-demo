/**
 * Court Hearing Time Calculator
 * 
 * Calculates when your court hearing will end based on alphabetical order
 * and number of available judges.
 * 
 * @author dev-mike2023
 * @version 1.4.2
 */

// Initial naive approach - works but slow for large inputs
function courtNaive(myName, judges, others) {
    // Just throwing everyone in an array and sorting
    // TODO: optimize this later if needed
    const allNames = [myName, ...others.split(' ')];
    allNames.sort();
    const position = allNames.indexOf(myName);
    return Math.ceil((position + 1) / judges) * 30;
}

// Better approach - avoid spread operator overhead
function courtImproved(myName, judges, others) {
    const names = others.split(' ');
    names.push(myName); // slightly faster than spread
    names.sort();
    const position = names.indexOf(myName);
    return Math.ceil((position + 1) / judges) * 30;
}

// Attempted optimization with manual insertion - actually slower!
// Keeping for reference, splice() is expensive
function courtManualInsert(myName, judges, others) {
    const names = others.split(' ');
    
    for (let i = 0; i < names.length; i++) {
        if (myName < names[i]) {
            names.splice(i, 0, myName); // this kills performance
            return Math.ceil((i + 1) / judges) * 30;
        }
    }
    
    // If we get here, myName goes at the end
    return Math.ceil((names.length + 1) / judges) * 30;
}

/**
 * FASTEST VERSION - Key insight: we don't need to sort!
 * Just count how many names come before mine alphabetically.
 * 
 * Time complexity: O(n) instead of O(n log n)
 * 
 * @param {string} myName - Your name
 * @param {number} judges - Number of judges available
 * @param {string} others - Space-separated list of other people's names
 * @returns {number} Minutes until your hearing ends
 */
function court(myName, judges, others) {
    const names = others.split(' ');
    let smallerCount = 0;
    
    // Count names that come before mine alphabetically
    for (let i = 0; i < names.length; i++) {
        if (names[i] < myName) {
            smallerCount++;
        }
    }
    
    // My position is smallerCount + 1 (1-indexed)
    // Calculate which "round" I'm in and multiply by 30 minutes
    const myPosition = smallerCount + 1;
    const roundNumber = Math.ceil(myPosition / judges);
    
    return roundNumber * 30;
}

// Experimental version trying to optimize string parsing
// Turns out it's not worth the complexity for typical inputs
function courtStringOptimized(myName, judges, others) {
    let smaller = 0;
    let i = 0;
    const len = others.length;
    
    while (i < len) {
        // Quick check on first character
        const firstChar = others.charCodeAt(i);
        const myFirstChar = myName.charCodeAt(0);
        
        if (firstChar < myFirstChar) {
            // Skip to next space
            while (i < len && others.charCodeAt(i) !== 32) i++;
            smaller++;
        } else if (firstChar > myFirstChar) {
            // Skip to next space  
            while (i < len && others.charCodeAt(i) !== 32) i++;
        } else {
            // First chars match, need full string comparison
            let j = i;
            let name = '';
            while (j < len && others.charCodeAt(j) !== 32) {
                name += others.charAt(j);
                j++;
            }
            if (name < myName) smaller++;
            i = j;
        }
        
        // Skip whitespace
        while (i < len && others.charCodeAt(i) === 32) i++;
    }
    
    return Math.ceil((smaller + 1) / judges) * 30;
}

// Simple benchmark function for testing
function benchmark(func, iterations = 50000) {
    console.log(`Benchmarking ${func.name}...`);
    
    const testCases = [
        ["Jules", 3, "Adam Betty Frank Mike"],
        ["Zane", 1, "Mark Hank Ana Vivian"],
        ["Alice", 2, "Bob Charlie David Eve"],
        ["Zebra", 4, "Apple Banana Cherry Date"]
    ];
    
    const start = Date.now();
    
    for (let i = 0; i < iterations; i++) {
        testCases.forEach(([name, judges, others]) => {
            func(name, judges, others);
        });
    }
    
    const elapsed = Date.now() - start;
    console.log(`${func.name}: ${elapsed}ms`);
    return elapsed;
}

// Run some quick tests to make sure everything works
function runTests() {
    const testCases = [
        ["Jules", 3, "Adam Betty Frank Mike", 60],
        ["Zane", 1, "Mark Hank Ana Vivian", 150]
    ];
    
    console.log("Running correctness tests...");
    
    testCases.forEach(([name, judges, others, expected]) => {
        const result = court(name, judges, others);
        const passed = result === expected;
        console.log(`${name}: ${result}min ${passed ? '✅' : '❌'} (expected ${expected})`);
    });
}

// Export the main function and utilities
if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = { 
        court, 
        benchmark, 
        runTests,
        // Export alternative versions for comparison
        courtNaive,
        courtImproved,
        courtStringOptimized
    };
} else {
    // Browser
    window.court = court;
    window.benchmark = benchmark;
    window.runTests = runTests;
}

// Auto-run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
    
    console.log("\nRunning benchmarks...");
    benchmark(courtNaive);
    benchmark(courtImproved); 
    benchmark(court);
    benchmark(courtStringOptimized);
}