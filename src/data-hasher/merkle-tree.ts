/*
import { bigIntToU64, u64ToBigInt } from "../utils/conversion";
import { hashMerge } from "../utils/hasher";
*/

import { hashMerge } from "../utils/hasher";

export type LeafHash = string;
export type HashFn = (left: LeafHash, right: LeafHash) => LeafHash;

export class MerkleTree {
  private readonly leaves: Array<LeafHash>;
  private readonly hashFn: HashFn;

  constructor(leaves: Array<LeafHash>, sortLeaves: boolean, hashFn?: HashFn) {
    this.leaves = leaves;
    this.hashFn = hashFn ? hashFn : hashMerge;

    // if the no of leaves is odd, we duplicate the last leaves to make it even
    if (this.leaves.length & 1)
      this.leaves.push(this.leaves[this.leaves.length - 1]);
    if (sortLeaves) this.leaves.sort();
  }

  calculateRoot(): LeafHash {
    if (this.leaves.length == 0) throw new Error("Leaf count is zero");
    if (this.leaves.length === 1) return this.leaves[0];

    const hashes = [...this.leaves];
    let hashCount = hashes.length;

    while (hashCount > 1) {
      if (hashes.length & 1) {
        hashes.push(hashes[hashes.length - 1]);
        hashCount += 1;
      }

      for (let leaf = 0; leaf < hashCount; leaf += 2) {
        const left = hashes[leaf];
        const right = hashes[leaf + 1];
        hashes[leaf / 2] = this.hashFn(left, right);
      }
      hashCount /= 2;
    }
    return hashes[0];
  }
}
