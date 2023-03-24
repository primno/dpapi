# DPAPI
[![npm](https://img.shields.io/npm/v/@primno/dpapi.svg)](https://www.npmjs.com/package/@primno/dpapi)
[![npm](https://img.shields.io/npm/l/@primno/dpapi.svg)](https://github.com/primno/dpapi/blob/main/LICENSE)
![build](https://img.shields.io/github/actions/workflow/status/primno/dpapi/test.yml)
![codecov](https://img.shields.io/codecov/c/github/primno/dpapi)

Native module to encrypt/decrypt data on Windows with DPAPI.

This native module is **prebuilt** for Node.JS running on Windows. It provides the win32-x64 N-API module.

Based on the port to N-API made by [Microsoft](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/extensions/msal-node-extensions/src/dpapi-addon) in @msal-node-extension from the work of [Brad Hughes](https://github.com/bradhugh/node-dpapi).

## Why this package?

Other similar packages require to build the native module on the target machine during the installation.
This means that you must have Python and Visual C++ installed, production environment included.

This package is prebuilt, so you don't need to have build tools installed on the target machine.

## Install

The win32-x64 prebuilt module will be installed with the following command.

```bash
npm install @primno/dpapi
```

## Definition

```ts
function protectData(
    userData: Uint8Array,
    optionalEntropy: Uint8Array | null,
    scope: "CurrentUser" | "LocalMachine"
): Uint8Array;

function unprotectData(
    encryptedData: Uint8Array,
    optionalEntropy: Uint8Array | null,
    scope: "CurrentUser" | "LocalMachine"
): Uint8Array;
```

## Usage

```ts
import { Dpapi } from "@primno/dpapi";

const buffer = Buffer.from("Hello world", "utf-8");

const encrypted = Dpapi.protectData(buffer, null, "CurrentUser");
const decrypted = Dpapi.unprotectData(encrypted, null, "CurrentUser");
```

## Credits

- Brad Hughes for the original code.
- Microsoft for the N-API port in MSAL-Node-Extension.
