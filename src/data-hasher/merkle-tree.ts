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

  constructor(leaves: Array<LeafHash>, hashFn?: HashFn) {
    this.leaves = leaves;
    this.hashFn = hashFn ? hashFn : hashMerge;

    // if the no of leaves is odd, we duplicate the last leaves to make it even
    if (this.leaves.length & 1)
      this.leaves.push(this.leaves[this.leaves.length - 1]);
  }

  calculateRoot(): LeafHash {
    if (this.leaves.length == 0) throw new Error("Leaf count is zero");
    if (this.leaves.length === 1) return this.leaves[0];

    let inputs = [...this.leaves];

    while (inputs.length > 1) {
      if (inputs.length & 1) {
        // Duplicate the last element
        inputs.push(inputs[inputs.length - 1]);
      }

      let outputs = [];
      for (let leaf = 0; leaf < inputs.length; leaf += 2) {
        const left = inputs[leaf];
        const right = inputs[leaf + 1];
        outputs.push(this.hashFn(left, right));
      }
      inputs = outputs;
    }
    return inputs[0];
  }
}
