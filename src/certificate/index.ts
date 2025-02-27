import { DataFormatter } from "../data-formatter";
import { DataHasher } from "../data-hasher";
import { MerkleTree } from "../data-hasher/merkle-tree";
import { YAMLTransformer } from "../data-transformer";
import { ZPassInfo, FlattenedRecord, NormalizedRecord, NormalizedRecordValueType, U64String } from "../model";

type FileType = "json" | "yaml";

export class ZPass {
    static generate(fileContent: string | Record<string, unknown>, fileType: FileType, seed?: string) {
        switch (fileType) {
            case "yaml":
                fileContent = new YAMLTransformer().transfrom(fileContent as string)
                break;
            case "json":
                break;
            default:
                throw new Error(`Unsupported file type ${fileType}`);
        }
        const flattened: FlattenedRecord = {};
        DataFormatter.flatten(fileContent as Record<string, unknown>, flattened);

        if (!flattened['type'] || !flattened['issuer'])
            throw new Error(`Invalid certificate type, missing issuer and/or type`);
        return DataFormatter.normalize(flattened, seed);
    }

    static getRoot(certificate: NormalizedRecord): string {
        const leaves = DataHasher.calculateLeaves(certificate);
        return (new MerkleTree(leaves)).getRoot();
    }

    static getInfo(certificate: NormalizedRecord): ZPassInfo {
        const type = certificate['type'].value as string;
        const issuer = certificate['issuer'].value as string;

        const root = this.getRoot(certificate);

        return {
            type,
            issuer,
            root
        };
    }

    static getValueByIdentifier(certificate: NormalizedRecord, keyIdentifier: string): NormalizedRecordValueType | undefined {
        const type = certificate['type'].value as string;
        const issuer = certificate['issuer'].value as string;

        const parsedKey = Object.keys(certificate).find(key => DataHasher.getKeyIdentifier(key, type, issuer) === keyIdentifier);
        if (!parsedKey) return undefined;

        return certificate[parsedKey];
    };

    static getValueByKey(certificate: NormalizedRecord, key: string) {
        return certificate[key];
    }

    static getMerkleProof(certificate: NormalizedRecord, leaf: U64String) {
        const leaves = DataHasher.calculateLeaves(certificate);
        const merkleTree = new MerkleTree(leaves);

        return merkleTree.getProof(leaf);
    }

    static calculateLeafHash(keyIdentifier: string, salt: string, value: string | number | boolean) {
        return DataHasher.calculateLeafHash(keyIdentifier, salt, value);
    }

    /**
     * 
     * @param certificate 
     * @returns string[] : Unsorted merkle tree leaves
     */
    static getLeafHashes(certificate: NormalizedRecord) {
        const leaves = DataHasher.calculateLeaves(certificate);

        return leaves;
    }

    static verify(leaves: string[], proof: string[], leafHash: string, root: string) {
        const merkleTree = new MerkleTree(leaves);

        // Using cached merkle for verification
        return merkleTree.verify(proof, leafHash, root)
    }
}