export interface DpapiBindings {
    protectData(dataToEncrypt: Uint8Array, optionalEntropy: Uint8Array | null, scope: DataProtectionScope): Uint8Array;
    unprotectData(encryptData: Uint8Array, optionalEntropy: Uint8Array | null, scope: DataProtectionScope): Uint8Array;
}
export type DataProtectionScope = "CurrentUser" | "LocalMachine";
export declare var Dpapi: DpapiBindings;
export default Dpapi;
