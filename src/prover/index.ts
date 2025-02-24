import { DataHasher } from "../data-hasher";
import { MerkleTree } from "../data-hasher/merkle-tree";
import { U64String, NormalizedRecord } from "../model";

export class Prover {
    static getMerkleProof(certificate: NormalizedRecord, leaf: U64String) {
        const leaves = DataHasher.calculateLeaves(certificate);
        const merkleTree = new MerkleTree(leaves, true);
        return merkleTree.getProof(leaf);
    }

    static calculateLeafHash(key: string, salt: string, value: string | number | boolean, type: string, issuerAddress: string) {
        return DataHasher.calculateLeafHash(key, salt, value, type, issuerAddress);
    }

    static verify(certificate: NormalizedRecord, proof: string[], leafHash: string, root: string) {
        const leaves = DataHasher.calculateLeaves(certificate);
        const merkleTree = new MerkleTree(leaves, true);
        return merkleTree.verify(proof, leafHash, root)
    }
}