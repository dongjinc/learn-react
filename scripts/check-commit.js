const chalk = require('chalk')
const fetch = require('node-fetch')


function exitProcess(code = 1){
    console.log('');
    process.exitCode = code
}


function Promises(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({name: 123})
        }, 2000)
    })
}

async function checkVersion(){
    const {versions} = await fetch('http://registry.npmjs.org/antd').then(res => {
        return res.json()
    })
    const {name} = await Promises().then(res => {
        const {name} = res
        return {name: '2332'}
    })
    // console.log(chalk.yellow('😈 Current version already exists. Forget update package.json?'))
    console.log(chalk.cyan('😈 Current version already exists. Forget update package.json?'))
    exitProcess()
}
checkVersion()