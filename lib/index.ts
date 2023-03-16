import path from "path";

export interface DpapiBindings {
    protectData(dataToEncrypt: Uint8Array, optionalEntropy: Uint8Array | null, scope: DataProtectionScope): Uint8Array;
    unprotectData(encryptData: Uint8Array, optionalEntropy: Uint8Array | null, scope: DataProtectionScope): Uint8Array;
}

export type DataProtectionScope = "CurrentUser" | "LocalMachine";

export var Dpapi: DpapiBindings = require("node-gyp-build")(path.join(__dirname, ".."));
export default Dpapi;