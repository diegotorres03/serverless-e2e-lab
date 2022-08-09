const fs = require('fs/promises')

run()
.then(() => generateStudentSteps())
.then(() => console.log('DONE!'))
// generateStudentSteps()


async function generateStudentSteps() {
    const readme = (await fs.readFile('./step-by-step.md')).toString('utf8')
    
    const filesRegex = /\*\*file:\*\* `(.*)`/g
    const replaceKeysRegex = /\*\*replace key:\*\* `(.*)`/g
    const contentRegex = /\`\`\`(.*)([\s\S]*?)\`\`\`/g

    const studentReadme = readme
        .replace(filesRegex, '')
        .replace(replaceKeysRegex, '')
        .replace(contentRegex, '')
        .replace(/^_note: then next updates are set up for next chapter_$/g, '')
        // .replace(new RegExp('_note: then next updates are set up for next chapter_'), '')

    // console.log('studentReadme')
    // console.log(studentReadme)
    await fs.writeFile('./student-guide.md', studentReadme)

}

async function run() {
    const readme = (await fs.readFile('./step-by-step.md')).toString('utf8')
    // console.log(readme)
    const steps = readme.split(new RegExp('---'))
    // console.log(steps)
    const stepsJson = {}

    console.log(steps.length)
    steps.forEach((step, index) => {
        const items = []
        try {
            // regex test online
            const [_, chapter, task] = step.match(/# (\d\.\d\.\d): `(.*)`/)
            const files = step.match(/\*\*file:\*\* `(.*)`/g)
            const replaceKeys = step.match(/\*\*replace key:\*\* `(.*)`/g)
            const content = step.match(/\`\`\`(.*)([\s\S]*?)\`\`\`/g)



            console.log(chapter)
            console.log('content')
            console.log(content)
            console.log(content && content.length)
            console.log('================')

            Array.isArray(files) && files.forEach((file, index) => {
                console.log('file, index', file, index)
                if (!items[index]) items[index] = {}
                items[index].path = file.match(/\*\*file:\*\* `(.*)`/).pop()
            })

            Array.isArray(replaceKeys) && replaceKeys.forEach((key, index) => {
                console.log('key, index', key, index)
                if (!items[index]) items[index] = {}
                items[index].key = key.match(/\*\*replace key:\*\* `(.*)`/).pop()
            })


            Array.isArray(content) && content.forEach((code, index) => {
                // const code = item.match(/\`\`\`(.*)([\s\S]*?)\`\`\`/)[2]
                console.log('key, index', code, index)
                if (!items[index]) items[index] = {}
                items[index].value = code.match(/\`\`\`(.*)([\s\S]*?)\`\`\`/)[2]
            })
            stepsJson[chapter] = {
                task,
                branch: `git checkout -b md${chapter}`,
                todo: chapter,
                content: items
            }
        } catch (err) {
            console.warn(err.message)
            console.info('it might be an empty item, if  --- are left at the end, the next item will be empty')
        }
    })

    console.log(JSON.stringify(stepsJson, null, 2))
    await fs.writeFile('./step-by-step.json', JSON.stringify(stepsJson, null, 2))
    // steps.map(step => {})
}


