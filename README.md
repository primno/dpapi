# DPAPI
[![npm](https://img.shields.io/npm/v/@primno/dpapi.svg)](https://www.npmjs.com/package/@primno/dpapi)
[![npm](https://img.shields.io/npm/l/@primno/dpapi.svg)](https://github.com/primno/dpapi/blob/main/LICENSE)
![build](https://img.shields.io/github/actions/workflow/status/primno/dpapi/test.yml)
[![coverage](https://codecov.io/gh/primno/dpapi/branch/main/graph/badge.svg?token=J4AVWIOR9F)](https://codecov.io/gh/primno/dpapi)

Native module to encrypt/decrypt data on Windows with DPAPI.

This native module is **prebuilt** for Node.JS running on Windows. It provides the **x64** and the **arm64** N-API modules for Windows.

This package indicates if the prebuilt module is supported on the current platform.

Based on the port to N-API made by [Microsoft](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/extensions/msal-node-extensions/src/dpapi-addon) in @msal-node-extension from the work of [Brad Hughes](https://github.com/bradhugh/node-dpapi).

> This package is part of the [Primno](https://primno.io) framework.

## Why this package?

Other similar packages require to build the native module on the target machine during the installation.
This means that you must have Python and Visual C++ installed, production environment included.

This package is prebuilt, so you don't need to have build tools installed on the target machine.

## Install

The prebuilt module will be installed with the following command.

```bash
npm install @primno/dpapi
```

## Definition

```ts
class Dpapi {
    public protectData(
        userData: Uint8Array,
        optionalEntropy: Uint8Array | null,
        scope: "CurrentUser" | "LocalMachine"
    ): Uint8Array;

    public unprotectData(
        encryptedData: Uint8Array,
        optionalEntropy: Uint8Array | null,
        scope: "CurrentUser" | "LocalMachine"
    ): Uint8Array;
}

const isPlatformSupported: boolean;
```

## Usage

### ECMAScript Module
```ts
import { Dpapi, isPlatformSupported } from "@primno/dpapi";

if (isPlatformSupported) {
    const buffer = Buffer.from("Hello world", "utf-8");

    const encrypted = Dpapi.protectData(buffer, null, "CurrentUser");
    const decrypted = Dpapi.unprotectData(encrypted, null, "CurrentUser");
}
else {
    console.error("Platform not supported. Only Windows is supported (x64, ARM64)");
}
```

### CommonJS
```js
const { Dpapi, isPlatformSupported } = require("@primno/dpapi");

if (isPlatformSupported) {
    const buffer = Buffer.from("Hello world", "utf-8");

    const encrypted = Dpapi.protectData(buffer, null, "CurrentUser");
    const decrypted = Dpapi.unprotectData(encrypted, null, "CurrentUser");
}
else {
    console.error("Platform not supported. Only Windows is supported (x64, ARM64)");
}
```

## Credits

- Brad Hughes for the original code.
- Microsoft for the N-API port in MSAL-Node-Extension.
