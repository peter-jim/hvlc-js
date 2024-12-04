/**
 * Hybrid Verifiable Logical Clock implementation
 */
export class HVLCClock {
    constructor() {
        this.inner = new Map();
        this.timestamp = Date.now() * 1000000; // Convert to nanoseconds
    }

    isGenesis() {
        return Array.from(this.inner.values()).every(n => n === 0);
    }

    merge(other) {
        const merged = new HVLCClock();
        const allKeys = new Set([...this.inner.keys(), ...other.inner.keys()]);
        
        allKeys.forEach(id => {
            const value = Math.max(
                this.inner.get(id) || 0,
                other.inner.get(id) || 0
            );
            merged.inner.set(id, value);
        });
        
        merged.timestamp = Math.max(this.timestamp, other.timestamp);
        return merged;
    }

    update(clocks, id) {
        let updated = clocks.reduce((acc, clock) => acc.merge(clock), this.clone());
        
        updated.timestamp = Date.now() * 1000000; // Convert to nanoseconds
        
        updated.inner.set(id, (updated.inner.get(id) || 0) + 1);
        return updated;
    }

    static base(others) {
        const base = new HVLCClock();
        let minTimestamp = Number.MAX_SAFE_INTEGER;

        others.forEach(clock => {
            minTimestamp = Math.min(minTimestamp, clock.timestamp);
            
            clock.inner.forEach((value, key) => {
                const currentValue = base.inner.get(key);
                if (currentValue === undefined) {
                    base.inner.set(key, value);
                } else {
                    base.inner.set(key, Math.min(currentValue, value));
                }
            });
        });

        base.timestamp = minTimestamp;
        return base;
    }

    compareTo(other) {
        const ge = (clock1, clock2) => {
            for (const [otherId, otherN] of clock2.inner.entries()) {
                if (otherN === 0) continue;
                const n = clock1.inner.get(otherId);
                if (n === undefined || n < otherN) return false;
            }
            return true;
        };

        const selfGe = ge(this, other);
        const otherGe = ge(other, this);

        if (selfGe && otherGe) {
            return this.timestamp === other.timestamp ? 0 : 
                   this.timestamp > other.timestamp ? 1 : -1;
        }
        if (selfGe) return 1;
        if (otherGe) return -1;
        return this.timestamp === other.timestamp ? 0 : 
               this.timestamp > other.timestamp ? 1 : -1;
    }

    depCmp(other, id) {
        const selfValue = this.inner.get(id);
        const otherValue = other.inner.get(id);

        if (selfValue === undefined && otherValue !== undefined) return -1;
        if (selfValue !== undefined && otherValue === undefined) return 1;
        if (selfValue === undefined && otherValue === undefined) return 0;
        return selfValue === otherValue ? 0 : selfValue > otherValue ? 1 : -1;
    }

    reduce() {
        return Array.from(this.inner.values())
            .reduce((acc, value) => acc + value, 0);
    }

    clone() {
        const cloned = new HVLCClock();
        cloned.inner = new Map(this.inner);
        cloned.timestamp = this.timestamp;
        return cloned;
    }

    async calculateSha256() {
        const data = JSON.stringify({
            inner: Array.from(this.inner.entries()),
            timestamp: this.timestamp
        });
        
        const msgBuffer = new TextEncoder().encode(data);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
} 