# Hybrid Vector Logical Clock

A JavaScript implementation of Hybrid Vector Logical Clock (HVLC) for distributed systems. This library provides a hybrid vector clock structure that combines physical timestamps with vector clock properties for efficient event ordering and causality tracking.

## Features

- Hybrid vector clock implementation combining physical and logical timestamps
- Efficient causality tracking using Map data structure
- Support for clock comparison, merging, and base calculation
- SHA256 hash calculation for verification
- Physical timestamp integration for total ordering
- Comprehensive test coverage

## Installation

```bash
npm install @peter-jim/hvlc
```

## Usage

### Basic Clock Usage

```javascript
import { HVLCClock } from '@peter-jim/hvlc';

const clock = new HVLCClock();
const updated1 = clock.update([], 'alice');
const updated2 = updated1.update([], 'bob');

const aliceValue = updated2.inner.get('alice');  // 1
const bobValue = updated2.inner.get('bob');      // 1
const isGenesis = clock.isGenesis();             // true
const hash = await clock.calculateSha256();
```

### Advanced Usage

```javascript
const clock1 = new HVLCClock();
const clock2 = new HVLCClock();

const updated1 = clock1.update([], 'alice');
const updated2 = clock2.update([], 'bob');

const merged = updated1.merge(updated2);
const comparison = updated1.compareTo(updated2);
const base = HVLCClock.base([updated1, updated2]);
```

## API Reference

### HVLCClock Class

- `constructor()`: Create a new clock instance
- `isGenesis()`: Check if clock is in genesis state
- `merge(other)`: Merge with another clock
- `update(clocks, id)`: Update clock with others and increment ID
- `static base(others)`: Calculate base clock from multiple clocks
- `compareTo(other)`: Compare with another clock (-1, 0, 1)
- `depCmp(other, id)`: Compare dependency values for specific ID
- `reduce()`: Sum all clock values
- `clone()`: Create a deep copy of the clock
- `calculateSha256()`: Calculate verification hash

## Development

### Setup

```bash
git clone https://github.com/peter-jim/hvlc-js.git
cd hvlc-js
npm install
```

### Testing
```bash
npm test
```

### Building
```bash
npm run build
```

## Project Structure

- `src/`: Core implementation files
  - `hvlc_clock.js`: Main HVLC implementation
  - `index.js`: Library entry point
- `tests/`: Test files
- `example/`: Usage examples
- `dist/`: Built files (after build)

## Advantages

- Better total ordering through physical timestamps
- Maintained causal consistency properties
- Efficient for distributed systems
- Suitable for CRDTs implementation

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## References
- [Hybrid Logical Clocks](http://www.cse.buffalo.edu/tech-reports/2014-04.pdf)
- [Vector Clocks](https://en.wikipedia.org/wiki/Vector_clock)
- [CRDTs](https://crdt.tech/)