import path from "path";

export interface DpapiBindings {
    protectData(dataToEncrypt: Uint8Array, optionalEntropy: Uint8Array | null, scope: DataProtectionScope): Uint8Array;
    unprotectData(encryptData: Uint8Array, optionalEntropy: Uint8Array | null, scope: DataProtectionScope): Uint8Array;
}

export type DataProtectionScope = "CurrentUser" | "LocalMachine";

class ErrorWithInnerError extends Error {
    public innerError: Error;

    constructor(message: string, innerError: Error) {
        super(message);
        this.innerError = innerError;
    }
}

class UnsupportedPlatformDpapiBindings implements DpapiBindings {
    private error: Error;

    constructor(error: Error) {
        this.error = error;
    }

    protectData(dataToEncrypt: Uint8Array, optionalEntropy: Uint8Array | null, scope: DataProtectionScope): Uint8Array {
        throw new ErrorWithInnerError("DPAPI is not supported on this platform.", this.error);
    }
    unprotectData(encryptData: Uint8Array, optionalEntropy: Uint8Array | null, scope: DataProtectionScope): Uint8Array {
        throw new ErrorWithInnerError("DPAPI is not supported on this platform.", this.error);
    }
}

let dpapi: DpapiBindings;

try {
    dpapi = require("node-gyp-build")(path.join(__dirname, ".."));
}
catch (e: any) {
    dpapi = new UnsupportedPlatformDpapiBindings(e);
}

export var isPlatformSupported : boolean = !(dpapi instanceof UnsupportedPlatformDpapiBindings);
export var Dpapi: DpapiBindings = dpapi;
export default Dpapi;