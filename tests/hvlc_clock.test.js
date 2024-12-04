import { HVLCClock } from '../src/hvlc_clock';

describe('HVLCClock', () => {
    let clock1, clock2;

    beforeEach(() => {
        clock1 = new HVLCClock();
        clock2 = new HVLCClock();
    });

    describe('constructor and isGenesis', () => {
        test('should create new clock in genesis state', () => {
            expect(clock1.isGenesis()).toBe(true);
            expect(clock1.inner.size).toBe(0);
            expect(typeof clock1.timestamp).toBe('number');
        });
    });

    describe('merge', () => {
        test('should merge two clocks correctly', () => {
            clock1.inner.set('A', 1);
            clock2.inner.set('B', 2);

            const merged = clock1.merge(clock2);
            expect(merged.inner.get('A')).toBe(1);
            expect(merged.inner.get('B')).toBe(2);
        });

        test('should take maximum value when merging same keys', () => {
            clock1.inner.set('A', 1);
            clock2.inner.set('A', 2);

            const merged = clock1.merge(clock2);
            expect(merged.inner.get('A')).toBe(2);
        });

        test('should take maximum timestamp', () => {
            clock1.timestamp = 100;
            clock2.timestamp = 200;

            const merged = clock1.merge(clock2);
            expect(merged.timestamp).toBe(200);
        });
    });

    describe('update', () => {
        test('should increment counter for specified ID', () => {
            const updated = clock1.update([], 'A');
            expect(updated.inner.get('A')).toBe(1);
        });

        test('should merge with other clocks before update', () => {
            clock2.inner.set('B', 2);
            const updated = clock1.update([clock2], 'A');
            
            expect(updated.inner.get('A')).toBe(1);
            expect(updated.inner.get('B')).toBe(2);
        });

        test('should update timestamp if no merges occurred', async () => {
            const clock = new HVLCClock();
            const originalTimestamp = clock.timestamp;
            
            await new Promise(resolve => setTimeout(resolve, 1));
            
            const updated = clock.update([], 'A');
            expect(updated.timestamp).toBeGreaterThan(originalTimestamp);
        });
    });

    describe('base', () => {
        test('should create base clock with minimum values', () => {
            clock1.inner.set('A', 1);
            clock2.inner.set('A', 2);
            clock2.inner.set('B', 3);

            const base = HVLCClock.base([clock1, clock2]);
            expect(base.inner.get('A')).toBe(1);
            expect(base.inner.get('B')).toBe(3);
        });

        test('should use minimum timestamp', () => {
            clock1.timestamp = 200;
            clock2.timestamp = 100;

            const base = HVLCClock.base([clock1, clock2]);
            expect(base.timestamp).toBe(100);
        });
    });

    describe('compareTo', () => {
        test('should return 1 when greater than other', () => {
            clock1.inner.set('A', 2);
            clock2.inner.set('A', 1);

            expect(clock1.compareTo(clock2)).toBe(1);
        });

        test('should return -1 when less than other', () => {
            clock1.inner.set('A', 1);
            clock2.inner.set('A', 2);

            expect(clock1.compareTo(clock2)).toBe(-1);
        });

        test('should compare timestamps when clocks are equal', () => {
            clock1.inner.set('A', 1);
            clock2.inner.set('A', 1);
            clock1.timestamp = 200;
            clock2.timestamp = 100;

            expect(clock1.compareTo(clock2)).toBe(1);
        });
    });

    describe('depCmp', () => {
        test('should compare dependencies correctly', () => {
            clock1.inner.set('A', 2);
            clock2.inner.set('A', 1);

            expect(clock1.depCmp(clock2, 'A')).toBe(1);
            expect(clock2.depCmp(clock1, 'A')).toBe(-1);
        });

        test('should handle undefined values', () => {
            clock1.inner.set('A', 1);

            expect(clock1.depCmp(clock2, 'A')).toBe(1);
            expect(clock2.depCmp(clock1, 'A')).toBe(-1);
            expect(clock1.depCmp(clock2, 'B')).toBe(0);
        });
    });

    describe('reduce', () => {
        test('should sum all values', () => {
            clock1.inner.set('A', 1);
            clock1.inner.set('B', 2);
            clock1.inner.set('C', 3);

            expect(clock1.reduce()).toBe(6);
        });

        test('should return 0 for empty clock', () => {
            expect(clock1.reduce()).toBe(0);
        });
    });

    describe('clone', () => {
        test('should create deep copy', () => {
            clock1.inner.set('A', 1);
            clock1.timestamp = 100;

            const cloned = clock1.clone();
            
            expect(cloned.inner.get('A')).toBe(1);
            expect(cloned.timestamp).toBe(100);
            
            // Modify original should not affect clone
            clock1.inner.set('A', 2);
            clock1.timestamp = 200;
            
            expect(cloned.inner.get('A')).toBe(1);
            expect(cloned.timestamp).toBe(100);
        });
    });

    describe('calculateSha256', () => {
        test('should generate consistent hash', async () => {
            clock1.inner.set('A', 1);
            clock1.timestamp = 100;

            const hash1 = await clock1.calculateSha256();
            const hash2 = await clock1.calculateSha256();

            expect(hash1).toBe(hash2);
            expect(typeof hash1).toBe('string');
            expect(hash1.length).toBe(64); // SHA-256 produces 64 character hex string
        });

        test('should generate different hashes for different states', async () => {
            clock1.inner.set('A', 1);
            clock2.inner.set('A', 2);

            const hash1 = await clock1.calculateSha256();
            const hash2 = await clock2.calculateSha256();

            expect(hash1).not.toBe(hash2);
        });
    });
}); 