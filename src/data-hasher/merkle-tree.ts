import { bigIntToU64, u64ToBigInt } from "../utils/conversion";
import { hashMerge } from "../utils/hasher";

export class MerkleTree {
  private leaves: Array<bigint>;

  constructor(leaves: Array<bigint>, sortLeaves: boolean) {
    this.leaves = leaves;
    this.extendTillPowerOf2(this.leaves, 0n);
    if (sortLeaves) this.leaves.sort();
  }

  private extendTillPowerOf2(leaves: Array<bigint>, dummyLeaf: bigint) {
    while (true) {
      const length = leaves.length;
      if ((length & (length - 1)) == 0) break;
      leaves.unshift(dummyLeaf);
    }
  }

  calculateMerkleRoot(): bigint {
    const depth = Math.log2(this.leaves.length);
    let leafCount = this.leaves.length / 2;
    const result = Array(leafCount).fill(0);

    let inputs = this.leaves;
    for (let d = 0; d < depth; ++d) {
      for (let leaf = 0; leaf < leafCount; ++leaf) {
        const left = bigIntToU64(inputs[leaf * 2]);
        const right = bigIntToU64(inputs[leaf * 2 + 1]);
        result[leaf] = u64ToBigInt(hashMerge(left, right));
      }

      leafCount /= 2;
      inputs = result;
    }
    return result[0];
  }
}
