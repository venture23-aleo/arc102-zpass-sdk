# ZPass Class

The `ZPass` class provides functionalities to generate and retrieve information from zero-knowledge certificates.

## Methods

### `generate(fileContent: string | Record<string, unknown>, fileType: FileType, password?: string)`
Generates a certificate from the given file content and type.

- **Parameters**:
  - `fileContent`: The content of the file, either as a string or a record.
  - `fileType`: The type of the file, either `json` or `yaml`.
  - `password` (optional): A password for additional security.

- **Returns**: A normalized record of the certificate.

- **Example**:
  ```typescript
  const certificate = ZPass.generate(fileContent, 'json');
  ```

### `getInfo(certificate: NormalizedRecord): ZPassInfo`
Retrieves information about the certificate, including the subject, issuer, and Merkle root.

- **Parameters**:
  - `certificate`: The normalized record of the certificate.

- **Returns**: An object containing the subject, issuer, and Merkle root.

- **Example**:
  ```typescript
  const info = ZPass.getInfo(certificate);
  ```

### `getMerkleProof(certificate: NormalizedRecord, leaf: U64String)`
Obtains the Merkle proof for a given leaf in the certificate.

- **Parameters**:
  - `certificate`: The normalized record of the certificate.
  - `leaf`: The leaf for which the proof is required.

- **Returns**: The Merkle proof for the specified leaf.

- **Example**:
  ```typescript
  const proof = ZPass.getMerkleProof(certificate, leaf);
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
  const leafHash = ZPass.calculateLeafHash(key, salt, value, type, issuerAddress);
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
  const isValid = ZPass.verify(certificate, proof, leafHash, root);
  ```
