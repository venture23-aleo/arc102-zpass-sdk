import { expect } from "chai";
import { MerkleTree } from "../merkle-tree";

const LEAVES = [
  "3824841577554724530u64",
  "2885257838413858146u64",
  "3493762364786270799u64",
  "1977705045598954156u64",
];

describe("MerkleTree", () => {
  it("Should return valid root for four leaves", () => {
    const merkleTree = new MerkleTree(LEAVES, true);
    const root = merkleTree.getRoot();
    expect(root).equal("7849773981907115583u64");
  });

  it("Should return valid merkle proof for leaves", () => {
    const merkleTree = new MerkleTree(LEAVES, true);
    const proof = merkleTree.getProof(LEAVES[0]);
    expect(proof).deep.equals([
      { position: 'right', data: '2885257838413858146u64' },
      { position: 'right', data: '9662023429270085602u64' }
    ]);
  });

  it("Should verify the merkle proof", () => {
    const merkleTree = new MerkleTree(LEAVES, true);
    for (let i = 0; i < LEAVES.length; ++i) {
      const proof = merkleTree.getProof(LEAVES[i]);
      expect(merkleTree.verify(proof, LEAVES[i], '7849773981907115583u64')).equal(true);
    }
  });
});