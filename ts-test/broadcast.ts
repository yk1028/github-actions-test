import { isTxError, LCDClient, MnemonicKey, MsgStoreCode } from "@xpla/xpla.js";
import * as fs from 'fs'
import * as path from 'path'
import * as core from '@actions/core';

const cube = new LCDClient({
    chainID: 'cube_47-5',
    URL: 'https://cube-lcd.xpla.dev',
    gasPrices: "850000000000axpla"
})

const store = async () => {

    const wasmPath = process.argv[2]
    const adminMnemonic = process.argv[3]

    // const wasmPath = core.getInput('wasmPath');
    // const adminMnemonic = core.getInput('mnemonic');

    console.log(wasmPath)
    console.log(adminMnemonic)

    // const cube_wallet01 = cube.wallet(new MnemonicKey({mnemonic: adminMnemonic}))

    // const storeCode = new MsgStoreCode(
    //     cube_wallet01.key.accAddress,
    //     fs.readFileSync(path.resolve(__dirname, wasmPath), 'base64')
    // )

    // const storeCodeTx = await cube_wallet01.createAndSignTx({
    //     msgs: [storeCode],
    // });

    // const storeCodeTxResult = await cube.tx.broadcast(storeCodeTx);

    // console.log(storeCodeTxResult);

    // if (isTxError(storeCodeTxResult)) {
    //     throw new Error(
    //         `store code failed. code: ${storeCodeTxResult.code}, codespace: ${storeCodeTxResult.codespace}, raw_log: ${storeCodeTxResult.raw_log}`
    //     );
    // }

    // const {
    //     store_code: { code_id },
    // } = storeCodeTxResult.logs[0].eventsByType;

    // console.log(code_id)
}

store();