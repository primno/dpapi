/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import Dpapi from "../lib";
import { platform } from "process";

// DPAPI is only available on windows
if(platform === "win32"){
    describe('Test DPAPI addon', () => {
        test('Protect and Unprotect data', () => {
            const data = Buffer.from("DPAPITestString");

            const encryptedData = Dpapi.protectData(data, null, "CurrentUser");
            const decryptedData = Dpapi.unprotectData(encryptedData, null, "CurrentUser");
            expect(decryptedData).toEqual(data);
        });

        test('Protect and Unprotect data with entropy', () => {
            const data = Buffer.from("DPAPITestString");
            const entropy = Buffer.from("entropy");

            const encryptedData = Dpapi.protectData(data, entropy, "CurrentUser");
            const decryptedData = Dpapi.unprotectData(encryptedData, entropy, "CurrentUser");
            expect(decryptedData).toEqual(data);
        });

        test('Protect and Unprotect data with local machine scope', () => {
            const data = Buffer.from("DPAPITestString");

            const encryptedData = Dpapi.protectData(data, null, "LocalMachine");
            const decryptedData = Dpapi.unprotectData(encryptedData, null, "LocalMachine");
            expect(decryptedData).toEqual(data);
        });
    });
} else {
    // Jest require that a .spec.ts file contain at least one test.
    test("Empty test", () => {});
}