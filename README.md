# HVLC-JS

A JavaScript implementation of Hybrid Vector Logical Clock (HVLC) for distributed systems.

## Overview

This Hybrid Vector Logical Clock (HVLC) library implements a hybrid vector clock structure that combines physical timestamps with vector clock properties. It is designed for distributed systems that require both causal consistency and total ordering of events.

## Core Components

Each HVLC clock instance contains:
- A mapping table (inner) that records logical clock values for each node ID
- A physical timestamp used to provide total ordering when logical clock comparison is insufficient

### Key Features

- Combines physical timestamps with vector clock properties
- Uses Map to store logical clock values for multiple nodes
- Maintains physical timestamps for total ordering
- Provides efficient causality tracking
- Supports event ordering and clock merging
- Suitable for CRDTs (Conflict-free Replicated Data Types) in distributed scenarios

## Installation
