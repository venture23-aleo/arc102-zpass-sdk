import { MerkleTree as MerkleTreeJS } from 'merkletreejs'
import { hash128, mergeU64 } from '../utils/hasher';
import { U64String } from '../model';
import { u64ToBigInt } from '../utils/conversion';

const defaultHashFN = (data: Buffer): Buffer => {
  const input = data.toString();
  return Buffer.from(hash128(input));
}

const concatenator = (inputs: Buffer[]): Buffer => {
  if (inputs.length != 2) throw new Error(`Expected 2 arguments, got ${inputs.length}`);
  const left = inputs[0].toString();
  const right = inputs[1].toString();
  return Buffer.from(mergeU64(left, right));
}

// Wrapper around the implementation of merkletreejs
export class MerkleTree {

  tree: MerkleTreeJS

  constructor(leaves: Array<U64String>, sortLeaves: boolean) {
    if (sortLeaves)
      leaves.sort((a: U64String, b: U64String) => u64ToBigInt(a) < u64ToBigInt(b) ? -1 : 1);

    this.tree = new MerkleTreeJS(leaves, defaultHashFN, {
      concatenator,
    });
  }

  getRoot(): string {
    return this.tree.getRoot().toString();
  }

  _getProof(hash: U64String) {
    return this.tree.getProof(hash);
  }

  getProof(hash: U64String): { position: 'left' | 'right', data: string }[] {
    const found = this.tree.getLeaves().find((leaf) => {
      return leaf.toString() == hash;
    });
    if (!found) throw new Error("Leaf is not valid and doesn't contains in the tree");

    return this.tree.getProof(hash).map(entry => (
      {
        ...entry,
        data: entry.data.toString()
      }
    ));
  }

  verify(proof: unknown[], leaf: string, root: string) {
    return this.tree.verify(proof, leaf, root);
  }

}
