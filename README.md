# HVLC-JS

A JavaScript implementation of Hybrid Vector Logical Clock (HVLC) for distributed systems.

## Overview

HVLC-JS implements a hybrid vector clock structure that combines physical timestamps with vector clock properties. It is designed for distributed systems that require both causal consistency and total ordering of events.

### Key Features

- Combines physical timestamps with vector clock properties
- Uses Map to store logical clock values for multiple nodes
- Maintains physical timestamps for total ordering
- Provides efficient causality tracking
- Supports event ordering and clock merging
- Suitable for CRDTs (Conflict-free Replicated Data Types) in distributed scenarios

## Installation
