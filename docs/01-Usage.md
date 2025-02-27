# Usage
``` js
import { ZPass, DataHasher } from 'arc102-zpass-sdk';

const input = {
    type: "KYC",
    issuer: "aleo1plxqr032wuel5hfyfs94ka9hfx7wfcgzrgqfreulkqkur6a4esqqh6ffw5",
    dob: 284838282,
    address: { street: "Wonderland", city: 'Fairyland' },
};

// Create certificate from json/yaml file
const certificate = ZPass.generate(input, "json");

// Get certificate metadata
const { type, issuer, root } = ZPass.getInfo(certificate);

// Calculate hash and generate merkle proof
const dobKeyIdentifier = "3220137136791564816u64" // key,type,issuer
const keyValue = ZPass.getValueByIdentifier(certificate, dobKeyIdentifier);

if (!keyValue) throw Error("No value found")

const { salt, value } = keyValue;

const identifier = DataHasher.getKeyIdentifier("dob", type, issuer);
const leafHash = ZPass.calculateLeafHash(identifier, salt, value);
const proof = ZPass.getMerkleProof(certificate, leafHash).map(({ data }) => data);

// Verify the proof locally
const leaves = ZPass.getLeafHashes(certificate);
console.log(ZPass.verify(leaves, proof, leafHash, root));
```