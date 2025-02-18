import { expect } from "chai";
import { LeafHash, MerkleTree } from "../merkle-tree";
import crypto from "crypto";

const SHA256 = (data: Buffer): LeafHash =>
  crypto.createHash("sha256").update(data).digest("hex");

describe("MerkleTree", () => {
  it("Should return valid root for four leaves", () => {
    const LEAVES = [
      "3493762364786270799u64",
      "2885257838413858146u64",
      "1977705045598954156u64",
      "3824841577554724530u64",
    ];
    const merkleTree = new MerkleTree(LEAVES, true);
    const root = merkleTree.calculateRoot();
    expect(root).equal("7849773981907115583u64");
  });

  it("Should return valid root with SHA256 hash", () => {
    const LEAVES = [
      "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
      "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d",
      "2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6",
    ];

    const hashFn = (left: string, right: string) => {
      const a = Buffer.from(left, "hex");
      const b = Buffer.from(right, "hex");
      return SHA256(Buffer.concat([a, b]));
    };
    const merkleTree = new MerkleTree(LEAVES, false, hashFn);
    expect(merkleTree.calculateRoot()).equal(
      "d31a37ef6ac14a2db1470c4316beb5592e6afd4465022339adafda76a18ffabe"
    );
  });
});
