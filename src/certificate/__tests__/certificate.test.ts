import { TEST_INPUT_DATA } from "../../data-formatter/__tests__/test-input";
import { FileType, ZkCertificate } from '../index'

describe("Certificate", () => {

    it.skip("Should generate certificate info", () => {
        const certificate = ZkCertificate.generate(TEST_INPUT_DATA, FileType.JSON);
        const certificateInfo = ZkCertificate.getCertificateInfo(certificate);
        console.log(certificateInfo);
    });
});