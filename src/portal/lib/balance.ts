import { Keyring } from '@polkadot/keyring'
export async function getBalance (api: { query: { system: { account: (arg0: string) => {data: any} } } }, address: string) {
   const res = await api.query.system.account(address)
   const balance = res.data
   return balance.free.toJSON()
  }

export async function getMoreFunds(substrateAccountID: string, api: { tx: { balances: { transfer: (arg0: string, arg1: number) => any } } }, callback: any) {
    const keyring = new Keyring({ type: 'sr25519' })
    const alice = keyring.addFromUri('//Alice')
  
    const transfer = api.tx.balances.transfer(substrateAccountID, 100*1e7)
  
    transfer.signAndSend(alice, callback)
  }