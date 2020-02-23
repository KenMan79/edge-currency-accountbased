/* global */
// @flow

import type { EdgeCurrencyInfo } from 'edge-core-js/types'
import { EthereumEngine } from './ethEngine'
import type { RskSettings } from './rskTypes.js'

export const imageServerUrl = 'https://developer.airbitz.co/content'

export const checkUpdateNetworkFees = async (engine: EthereumEngine) => {
  const actualGasPrice = parseInt(engine.walletLocalData.otherData.networkFees['default'].gasPrice.standardFeeLow)
  try {
    const jsonObj = await engine.fetchPostPublicNode('eth_gasPrice', [])
    const newGasPrice = parseInt(jsonObj.result, 16)

    if (newGasPrice !== actualGasPrice) {
      // check first if changed
      engine.walletLocalData.otherData.networkFees['default'].gasPrice.standardFeeLow = newGasPrice.toString()
      engine.walletLocalData.otherData.networkFees['default'].gasPrice.standardFeeHigh = Math.round(newGasPrice * 1.25).toString()
      engine.walletLocalData.otherData.networkFees['default'].gasPrice.standardFeeLowAmount = newGasPrice.toString()
      engine.walletLocalData.otherData.networkFees['default'].gasPrice.standardFeeHighAmount = Math.round(newGasPrice * 1.25).toString()
      engine.walletLocalData.otherData.networkFees['default'].gasPrice.highFee = Math.round(newGasPrice * 1.5).toString()
      engine.walletLocalDataDirty = true
    }
  } catch (err) {
    engine.log('Error fetching networkFees')
    engine.log(err)
  }
}

const otherSettings: RskSettings = {
  etherscanApiServers: [
    'https://blockscout.com/rsk/mainnet'
  ],
  blockcypherApiServers: [],
  superethServers: [],
  infuraServers: ['https://public-node.rsk.co'],
  iosAllowedTokens: { RIF: true },
  uriNetworks: ['rsk', 'rbtc'],
  ercTokenStandard: 'RRC20',
  chainId: 30,
  checkUnconfirmedTransactions: false
}

const defaultSettings: any = {
  customFeeSettings: ['gasLimit', 'gasPrice'],
  otherSettings
}

export const currencyInfo: EdgeCurrencyInfo = {
  // Basic currency information:
  currencyCode: 'RBTC',
  displayName: 'RSK',
  pluginName: 'rsk',
  walletType: 'wallet:rsk',

  defaultSettings,

  addressExplorer: 'https://explorer.rsk.co/address/%s',
  transactionExplorer: 'https://explorer.rsk.co/tx/%s',

  denominations: [
    // An array of Objects of the possible denominations for this currency
    {
      name: 'RBTC',
      multiplier: '1000000000000000000',
      symbol: 'RBTC'
    }
  ],
  symbolImage: `${imageServerUrl}/rsk-logo-solo-64.png`, // TODO: add logo
  symbolImageDarkMono: `${imageServerUrl}/rsk-logo-solo-64.png`,
  metaTokens: [
    // Array of objects describing the supported metatokens
    {
      currencyCode: 'RIF',
      currencyName: 'RIF Token',
      denominations: [
        {
          name: 'RIF',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x2acc95758f8b5f583470ba265eb685a8f45fc9d5',
      symbolImage: `${imageServerUrl}/rif-logo-solo-64.png` // TODO: add rif logo
    }
  ]
}
