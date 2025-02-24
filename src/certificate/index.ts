import { DataFormatter } from "../data-formatter";
import { DataHasher } from "../data-hasher";
import { MerkleTree } from "../data-hasher/merkle-tree";
import { YAMLTransformer } from "../data-transformer";
import { CertificateInfo, FlattenedRecord, NormalizedRecord } from "../model";

type FileType = "json" | "yaml";

export class ZkCertificate {

    static generate(fileContent: string | Record<string, unknown>, fileType: FileType, password?: string) {
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
        return DataFormatter.normalize(flattened, password);
    }

    static getCertificateInfo(certificate: NormalizedRecord): CertificateInfo {
        const subject = certificate['type'].value as string;
        const issuer = certificate['issuer'].value as string;

        const leaves = DataHasher.calculateLeaves(certificate);
        const merkleTree = new MerkleTree(leaves, true);
        const merkleRoot = merkleTree.getRoot();

        return {
            subject,
            issuer,
            merkleRoot
        };
    }
}