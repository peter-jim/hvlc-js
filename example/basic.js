import { HVLCClock } from '@peter-jim/hvlc';

// HVLC Clock examples
console.log('=== HVLC Clock Examples ===');

// Basic clock operations
console.log('\n1. Basic Clock Operations:');
const clock = new HVLCClock();
console.log('Is genesis?', clock.isGenesis());

// Update operations
console.log('\n2. Update Operations:');
const updated1 = clock.update([], 'alice');
const updated2 = updated1.update([], 'alice');
console.log('After updates:', {
    alice: updated2.inner.get('alice'),
    timestamp: updated2.timestamp
});

// Merge operations
console.log('\n3. Merge Operations:');
const clock2 = new HVLCClock();
const updated3 = clock2.update([], 'bob');
const merged = updated2.merge(updated3);
console.log('After merge:', {
    alice: merged.inner.get('alice'),
    bob: merged.inner.get('bob'),
    timestamp: merged.timestamp
});

// Comparison
console.log('\n4. Clock Comparison:');
console.log('Compare result:', updated2.compareTo(updated3));
console.log('Dependency compare for alice:', updated2.depCmp(updated3, 'alice'));
console.log('Dependency compare for bob:', updated2.depCmp(updated3, 'bob'));

// Base clock
console.log('\n5. Base Clock:');
const base = HVLCClock.base([updated2, updated3]);
console.log('Base clock:', {
    alice: base.inner.get('alice'),
    bob: base.inner.get('bob'),
    timestamp: base.timestamp
});

// Reduction
console.log('\n6. Clock Reduction:');
console.log('Reduced value:', merged.reduce());

// Hash calculation
console.log('\n7. Hash Calculation:');
merged.calculateSha256().then(hash => {
    console.log('Clock hash:', hash);
}); 