# ZkCertificate Class

The `ZkCertificate` class provides functionalities to generate and retrieve information from zero-knowledge certificates.

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
  const certificate = ZkCertificate.generate(fileContent, 'json');
  ```

### `getCertificateInfo(certificate: NormalizedRecord): CertificateInfo`
Retrieves information about the certificate, including the subject, issuer, and Merkle root.

- **Parameters**:
  - `certificate`: The normalized record of the certificate.

- **Returns**: An object containing the subject, issuer, and Merkle root.

- **Example**:
  ```typescript
  const info = ZkCertificate.getCertificateInfo(certificate);
  ```
