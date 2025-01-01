/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * 
 * Modified by Xavier Monin.
 */

import { Dpapi, isPlatformSupported } from "../lib";
import { platform, arch } from "process";

// DPAPI is only available on windows x64 and arm64
if(platform === "win32" && (arch === "x64" || arch === "arm64")) {
    describe('Test DPAPI addon on supported platform', () => {
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

        test('Platform support', () => {
             expect(isPlatformSupported).toBe(true);
        });
    });
} else {
    describe('Test DPAPI addon on unsupported platform', () => {
        test('Platform support', () => {
            expect(isPlatformSupported).toBe(false);
        });

        test('Protect and Unprotect data', () => {
            const data = Buffer.from("DPAPITestString");

            expect(() => Dpapi.protectData(data, null, "CurrentUser")).toThrow("DPAPI is not supported on this platform.");
            expect(() => Dpapi.unprotectData(data, null, "CurrentUser")).toThrow("DPAPI is not supported on this platform.");
        });
    });
}