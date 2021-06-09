// @flow
import { KeyTool } from 'react-native-zcash'
import { bridgifyObject } from 'yaob'

const KeyTool2 = {
  deriveViewingKey: async (seedBytesHex: string): Promise<string> => {
    // const result = await KeyTool.deriveViewingKey(seedBytesHex)
    return KeyTool.deriveViewingKey(seedBytesHex)
  },
  deriveSpendingKey: async (seedBytesHex: string): Promise<string> => {
    console.log('keytool in keytool2', KeyTool)
    // const result = await KeyTool.deriveSpendingKey(seedBytesHex)
    const x = KeyTool.deriveSpendingKey(seedBytesHex)
    console.log('keytool x', x)
    return x
  }
}

// const AddressTool2 = {
//   deriveShieldedAddress: async (viewingKey: string): Promise<string> => {
//     const result = await AddressTool.deriveShieldedAddress(viewingKey)
//     return result
//   },
//   deriveTransparentAddress: async (seedHex: string): Promise<string> => {
//     const result = await AddressTool.deriveTransparentAddress(seedHex)
//     return result
//   },
//   isValidShieldedAddress: async (address: string): Promise<boolean> => {
//     const result = await AddressTool.isValidShieldedAddress(address)
//     return result
//   },
//   isValidTransparentAddress: async (address: string): Promise<boolean> => {
//     const result = await AddressTool.isValidTransparentAddress(address)
//     return result
//   }
// }
console.log('keytool outside', KeyTool)
// TODO: Remove this entire file in the next breaking change.
export default function makePluginIo() {
  bridgifyObject(KeyTool2)
  // bridgifyObject(AddressTool2)

  return {
    fetchText(uri: string, opts: Object) {
      return window.fetch(uri, opts).then(reply =>
        reply.text().then(text => ({
          ok: reply.ok,
          status: reply.status,
          statusText: reply.statusText,
          url: reply.url,
          text
        }))
      )
    },
    KeyTool2
    // AddressTool2
  }
}
