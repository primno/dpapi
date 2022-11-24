# DPAPI

Native module to encrypt data on Windows with DPAPI.

This native module is **prebuilt** for Node.JS running on Windows. It provides the win32-x64 N-API module.

Based on the port to N-API made by [Microsoft](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/extensions/msal-node-extensions/src/dpapi-addon) in @msal-node-extension from the work of [Brad Hughes](https://github.com/bradhugh/node-dpapi).

## Install

The win32-x64 prebuilt module will be installed with the following command.

```powershell
npm install @primno/dpapi
```

## Type definition

```ts
function protectData(
    userData: Uint8Array,
    optionalEntropy: Uint8Array,
    scope: "CurrentUser" | "LocalMachine"
): Uint8Array;

function unprotectData(
    encryptedData: Uint8Array,
    optionalEntropy: Uint8Array,
    scope: "CurrentUser" | "LocalMachine"
): Uint8Array;
```

## Example

```ts
import { Dpapi } from "node-dpapi";

const buffer = Buffer.from("Hello world", "utf-8");

const encrypted = Dpapi.protectData(buffer, null, "CurrentUser");
const decrypted = Dpapi.unprotectData(encrypted, null, "CurrentUser");
```

## Why prebuilt module ?

node-gyp require python and Visual C++.
This package can be installed without these dependencies.

## Credits

- Brad Hughes for the original code.
- Microsoft for the N-API port in MSAL-Node-Extension.