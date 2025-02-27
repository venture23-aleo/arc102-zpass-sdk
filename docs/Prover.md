# Prover Class

The `Prover` class provides functionalities to work with Merkle proofs and verify certificates.

## Methods

### `getMerkleProof(certificate: NormalizedRecord, leaf: U64String)`
Obtains the Merkle proof for a given leaf in the certificate.

- **Parameters**:
  - `certificate`: The normalized record of the certificate.
  - `leaf`: The leaf for which the proof is required.

- **Returns**: The Merkle proof for the specified leaf.

- **Example**:
  ```typescript
  const proof = Prover.getMerkleProof(certificate, leaf);
  ```

### `calculateLeafHash(key: string, salt: string, value: string | number | boolean, type: string, issuerAddress: string)`
Calculates the hash of a leaf node.

- **Parameters**:
  - `key`: The key of the leaf.
  - `salt`: The salt used in hashing.
  - `value`: The value of the leaf.
  - `type`: The type of the leaf.
  - `issuerAddress`: The address of the issuer.

- **Returns**: The hash of the leaf node.

- **Example**:
  ```typescript
  const leafHash = Prover.calculateLeafHash(key, salt, value, type, issuerAddress);
  ```

### `verify(certificate: NormalizedRecord, proof: string[], leafHash: string, root: string)`
Verifies the integrity of a certificate using the provided proof and root.

- **Parameters**:
  - `certificate`: The normalized record of the certificate.
  - `proof`: The Merkle proof.
  - `leafHash`: The hash of the leaf.
  - `root`: The Merkle root.

- **Returns**: A boolean indicating the verification result.

- **Example**:
  ```typescript
  const isValid = Prover.verify(certificate, proof, leafHash, root);
  ```
