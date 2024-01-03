import { isTxError, LCDClient, MnemonicKey, MsgExecuteContract, MsgStoreCode } from "@xpla/xpla.js";
import * as fs from 'fs'
import * as path from 'path'

const cube = new LCDClient({
    chainID: 'cube_47-5',
    URL: 'https://cube-lcd.xpla.dev',
    gasPrices: "850000000000axpla"
})

const store = async () => {

    const projectName = process.argv[2]
    const adminMnemonic = process.argv[3]
    const wasmPath = projectName + ".wasm"

    console.log(projectName)
    console.log(wasmPath)
    console.log(adminMnemonic)

    const cube_wallet01 = cube.wallet(new MnemonicKey({mnemonic: adminMnemonic}))

    const storeCode = new MsgStoreCode(
        cube_wallet01.key.accAddress,
        fs.readFileSync(path.resolve(__dirname, wasmPath), 'base64')
    )

    const storeCodeTx = await cube_wallet01.createAndSignTx({
        msgs: [storeCode],
    });

    const storeCodeTxResult = await cube.tx.broadcast(storeCodeTx);

    console.log(storeCodeTxResult);

    if (isTxError(storeCodeTxResult)) {
        throw new Error(
            `store code failed. code: ${storeCodeTxResult.code}, codespace: ${storeCodeTxResult.codespace}, raw_log: ${storeCodeTxResult.raw_log}`
        );
    }

    const {
        store_code: { code_id },
    } = storeCodeTxResult.logs[0].eventsByType;

    console.log(code_id)

    // 위 정보를 바탕으로 contract에 추가하는 작업 진행..
    // 저장까지 된 정보를 바탕으로 

    const contractAddress = "xpla1g8caj2wv9hlpngvtyafzlhwfctnzrezgkvgzk86725mtn2qtreps3khztz"


    const testExec = new MsgExecuteContract(
        cube_wallet01.key.accAddress,
        contractAddress,
        {
            "store_cosmwasm_project": {
                "info": {
                    "project_name": projectName, 
                    "code_id": code_id // cosmwasm에서 i128로 선언했는데 string으로 넣어야 동작
                } 
           }
        }
    );

    const tx = await cube_wallet01.createAndSignTx({
        msgs: [testExec],
    });

    const result = await cube.tx.broadcast(tx);

    console.log(result);
}

store();