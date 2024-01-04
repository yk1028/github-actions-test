import { LCDClient } from "@xpla/xpla.js";

// github evn로 처리
const cube = new LCDClient({
    chainID: 'cube_47-5',
    URL: 'https://cube-lcd.xpla.dev',
    gasPrices: "850000000000axpla"
})

const query = async () => {

    const contractAddress = "xpla1g8caj2wv9hlpngvtyafzlhwfctnzrezgkvgzk86725mtn2qtreps3khztz" // contract-info
    const projectName = process.argv[2]

    const result = await cube.wasm.contractQuery(
        contractAddress,
        {
            "get_code_id": { "project_name" : projectName }
        }
    );

    console.log(result["cosmwasm_info"].code_id)
}

query()