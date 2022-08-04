
const { spawn, exec } = require('child_process')

const prefix = 'md'
const branchData = require('../step-by-step.json')

run()


async function wait(time = 1_000) {
    return new Promise(resolve => setTimeout(resolve, time))
}

async function run() {
    // start on master
    // deleteAll()

    // const 
    const branchesIds = Object.keys(branchData)
    console.log(branchesIds)
    // read readme.template

    // readme = await generateReadme(branchData, '1.1.1')
    // console.log(readme)

    // return

    for (let index in branchesIds) {
        const id = branchesIds[index]
        const branchName = prefix + id

        console.log(id, index, branchName)
        await command(`git checkout ${branchName}`)
        await wait(300)
        console.log(await command(`git push origin ${branchName}`))
        await wait(300)
    }
}



function command(commands) {
    return new Promise((resolve, reject) => {

        const ls = exec(commands, (error, stdout, stderr) => {
            if (error) {
                return reject(error)
                // console.log(error.stack)
                // console.log('Error code: ' + error.code)
                // console.log('Signal received: ' + error.signal)
            }
            console.log('STDOUT: ' + stdout)
            // console.log('Child Process STDERR: ' + stderr)
            resolve({ stderr, stdout })
        })

        ls.on('exit', function (code) {
            // console.log('Child process exited with exit code ' + code)
        })
    })
}
