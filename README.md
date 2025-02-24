# ZK-PASS-SDK

This module is used to transform the nested data into the format required by zPass Model specified by [ARC-0102]('https://github.com/ProvableHQ/ARCs/discussions/84')

## Features

- Supports yaml file

## Examples
``` js 
import { Prover, ZkCertificate } from 'zk-pass-sdk'

const input = {
    type: "KYC",
    issuer: "aleo1plxqr032wuel5hfyfs94ka9hfx7wfcgzrgqfreulkqkur6a4esqqh6ffw5",
    dob: 284838282,
    address: "Wonderland"
};

// Create certificate from json/yaml file
const certificate = ZkCertificate.generate(input, "json");

// Get certificate metadata
const { subject: type, issuer, merkleRoot } = ZkCertificate.getCertificateInfo(certificate);

// Calculate hash and generate merkle proof
const { salt, value } = certificate["address"];
const leafHash = Prover.calculateLeafHash("address", salt, value, type, issuer);
const proof = Prover.getMerkleProof(certificate, leafHash).map(({ _position, data }) => data);

// Verify the proof locally
console.log(Prover.verify(certificate, proof, leafHash, merkleRoot));
```