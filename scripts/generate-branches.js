const { exec } = require('child_process')
const { read } = require('fs')
const { readFile, writeFile } = require('fs/promises')
const { generateReadme } = require('./generate-readme')

const prefix = 'md'


// const { branchData } = require('./branch-data')
const branchData = require('../step-by-step.json')

async function wait(time = 1_000) {
    return new Promise(resolve => setTimeout(resolve, time))
}


function command(commands) {
    return new Promise((resolve, reject) => {

        const ls = exec(commands, (error, stdout, stderr) => {
            if (error) {
                return reject(error)
            }
            // console.log('STDOUT: ' + stdout)
            resolve({ stderr, stdout })
        })

        ls.on('exit', function (code) {
            // console.log('Child process exited with exit code ' + code)
        })
    })
}

async function createBranch(newBranch) {
    const branchName = prefix + newBranch
    console.log('create branch', await command(`git checkout -b ${branchName}`))
    await wait(100)
    console.log('merge with previous', await command(`git merge -`))
    await wait(100)
    // try {
    //     console.log('commit changes', await command(`git commit -am "${newBranch}"`))
    // } catch (err) { console.log('===\n', err.message) }
}


async function commit(newBranch) {
    try {
        console.log('commit changes', await command(`git commit -am "${newBranch}"`))
    } catch (err) { console.log('===\n', err.message) }
}

async function deleteBranch(branch) {
    return command(`git branch -D ${prefix}${branch}`)
    // return command(`git branch -D ${branch}`)
}

async function generateReadme2(readme, branches, current) {
    console.log('generating readme for', current)
    let newReadme
    for (let id in branches) {
        try {

            const branch = branches[id]
            const toNumber = str => Number(str.replace(/[.]/g, ''))
            // let done = false
            let done = toNumber(current) > toNumber(branch.todo)
            const fill = done ? '[x]' : '[ ]'
            console.log(`${fill} =>${toNumber(current)} > ${toNumber(branch.todo)}`, done)
            // console.log(`branch.todo ${branch.todo} with [${done ? 'x' : ' '}] ${branch.todo} ${branch.task}`)
            const replaceText = ` ${done} ${branch.todo} ${branch.task}`
            // const replaceText = ` ${fill} ${branch.todo} ${branch.task}`
            console.log(replaceText)
            readme = readme.replace(`{{${branch.todo}}}`, replaceText)
        } catch (err) { console.log('esto es parce !!!') }
        // console.log('from fe\n',newReadme, current)
    }
    // console.log('from fn\n',newReadme, current)
    await wait(10)
    return readme
}

async function setUpPkgNavigation(chapter, chapters, index) {
    const prev = index < 1 ? chapters.length - 1 : index - 1
    const next = index >= chapters.length - 1 ? 0 : index + 1
    // read package.json
    const pkg = JSON.parse(await readFile('./package.json'))
    // console.log('prev', prev, 'next', next)
    // update scripts.[next, back] 
    pkg.scripts.next = `git checkout ${prefix}${chapters[next]}`
    pkg.scripts.back = `git checkout ${prefix}${chapters[prev]}`
    // overwrite package
    // console.log(pkg)
    await writeFile('./package.json', JSON.stringify(pkg, null, 2))
}


async function updateFiles(branches, current) {
    // console.log(branches[current].content)
    const update = await updateFile(branches, current)
    for (let file of branches[current].content) {
        // console.log('file', file, update)
        await update(file)
    }
}

async function updateFile(branches, current) {
    const branch = branches[current]
    // console.log('branch', branch)
    return async (file, index, files) => {
        // console.log('on update')
        const originalContent = (await readFile(file.path)).toString('utf-8')
        // console.log('originalContent\n\n', originalContent)
        const taskDef = `${branch.todo}: ${branch.task}`
        const originalStr = !file.key ? `[ ] ${taskDef}` : file.key
        const replaceStr = !file.key ? `[x] ${taskDef}\n${file.value}` : file.value
        // console.log(originalStr, replaceStr)
        const newContent = originalContent.replace(originalStr, replaceStr)
        // console.log('newContent\n\n', newContent)
        await writeFile(file.path, newContent)
        return newContent
    }
}


// run()
// deleteAll()

async function run() {
    // start on master
    // deleteAll()

    // const 
    const branchesIds = Object.keys(branchData)
    console.log(branchesIds)
    // read readme.template

    readme = await generateReadme(branchData, '1.1.1')
    // console.log(readme)

    // return

    for (let index in branchesIds) {
        const id = branchesIds[index]
        console.log(id, index)

        await createBranch(id)
        // // console.log
        await wait(200)
        await setUpPkgNavigation(id, branchesIds, Number(index))
        await wait(200)

        const readme = await generateReadme(branchData, branchData[id].todo)
        // console.log(readme)
        await writeFile('./README.out.md', readme)

        await wait(200)

        if (index > 0) {
            let prevIndex = index - 1
            const prevId = branchesIds[prevIndex]
            await updateFiles(branchData, branchData[prevId].todo)
        }
        // await updateFiles(branchesData, branchesData[id].todo)

        await wait(200)
        await commit(id)
    }

    // await command('git commit -am "done"')
    // create all branch structure
    // replace empty todo with solved todo and code 



}


async function deleteAll() {

    const branchesIds = Object.keys(branchData)
    console.log(branchesIds)

    for (let index in branchesIds) {
        const id = branchesIds[index]
        console.log(id, index)
        try {
            await deleteBranch(id)
        } catch(err) {console.warn(err.message)}
        await wait(500)
    }

}


module.exports = {
    deleteAll,
    run,
    command,
}


// git commit -am "next and prev"; npm run next; git merge -