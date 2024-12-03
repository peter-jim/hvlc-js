# Core Functional Libraries

The JavaScript implementation of core functional libraries for distributed systems.

## [hvlc-js](./src/)

- This Hybrid Vector Logical Clock (HVLC) library implements a hybrid vector clock structure that combines physical timestamps with vector clock properties.
- HVLC uses a Map to store logical clock values for multiple nodes while maintaining a physical timestamp, enabling efficient tracking of causality and concurrent events in distributed systems.
- Each clock instance contains:
  - A mapping table (inner) that records logical clock values for each node ID
  - A physical timestamp used to provide total ordering when logical clock comparison is insufficient
- The implementation provides core functionalities like event ordering, clock merging, and base calculation, suitable for scenarios requiring distributed causality tracking.
- Compared to regular vector clocks, HVLC offers better total ordering support through physical timestamps while maintaining the causal consistency properties of vector clocks.
- It can be used as the [CRDTs](https://crdt.tech/)(Conflict-free Replicated Data Type) algorithm in distributed scenarios for providing total ordering.

## [example](./example/)

- A simple example application demonstrating HVLC usage.
- Includes basic operations like:
  - Clock creation and updates
  - Clock merging and comparison
  - Base clock calculation
  - Hash generation
- Shows how to integrate HVLC in distributed applications.
- All operations are demonstrated with clear examples and outputs.

## [tests](./tests/)

- Comprehensive test suite for the HVLC implementation.
- Covers all core functionalities:
  - Basic clock operations
  - Update and merge operations
  - Clock comparison and ordering
  - Base clock calculation
  - Hash generation
- Includes edge cases and error handling tests.

## [src](./src/)

- Core implementation of the HVLC library.
- Contains the main HVLC clock class with all core functionalities.
- Implements efficient data structures for clock operations.
- Provides a clean and well-documented API for users.

## Installation

npm install @peter-jim