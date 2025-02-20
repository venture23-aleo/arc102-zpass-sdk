import { DataHasher } from "../data-hasher";
import { MerkleTree } from "../data-hasher/merkle-tree";
import { U64String, NormalizedRecord } from "../model";

export class Prover {
    static getProof(certificate: NormalizedRecord, leaf: U64String) {
        const leaves = DataHasher.calculateLeaves(certificate);
        const merkleTree = new MerkleTree(leaves, true);
        return merkleTree.getProof(leaf);
    }
}