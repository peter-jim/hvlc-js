import { HVLCClock } from '@peter-jim/hvlc';

// Example 1: Basic Usage
console.log('\nExample 1: Basic Usage');
const clock1 = new HVLCClock();
const clock2 = new HVLCClock();

// Update clocks
const updated1 = clock1.update([], 'node1');
const updated2 = clock2.update([], 'node2');

console.log('Clock 1:', updated1);
console.log('Clock 2:', updated2);

// Example 2: Merging Clocks
console.log('\nExample 2: Merging Clocks');
const merged = updated1.merge(updated2);
console.log('Merged Clock:', merged);

// Example 3: Comparing Clocks
console.log('\nExample 3: Comparing Clocks');
const comparison = updated1.compareTo(updated2);
console.log('Comparison result:', comparison);

// Example 4: Multiple Updates
console.log('\nExample 4: Multiple Updates');
const multiClock = new HVLCClock();
const update1 = multiClock.update([], 'node1');
const update2 = update1.update([], 'node1');
const update3 = update2.update([], 'node2');

console.log('Multiple updates:', update3);

// Example 5: Base Clock
console.log('\nExample 5: Base Clock');
const baseClock = HVLCClock.base([updated1, updated2]);
console.log('Base Clock:', baseClock);

// Example 6: Hash Calculation
console.log('\nExample 6: Hash Calculation');
async function calculateHashes() {
    const hash1 = await updated1.calculateSha256();
    const hash2 = await updated2.calculateSha256();
    console.log('Hash of Clock 1:', hash1);
    console.log('Hash of Clock 2:', hash2);
}

calculateHashes(); 