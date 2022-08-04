

const toNumber = str => Number(str.replace(/[.]/g, ''))

// run()
// function run() {
//     const readme = generateReadme(branchesData, '2.2.2')
//     console.log(readme)
// }



function generateReadme(branchData, current) {

   const enalbed = (current, other) => {
      return toNumber(current) <= toNumber(other) ? ' ' : 'x'
   }

   try {
      const readme = `
# Serverless E2E

**Index:**
1. **Webapp:**
    1. **Hosting (S3):** where to store app assets?
       1. [${enalbed(current, '1.1.1')}] ${branchData['1.1.1'].todo}: ${branchData['1.1.1'].task} 
       2. [${enalbed(current, '1.1.2')}] ${branchData['1.1.2'].todo}: ${branchData['1.1.2'].task}
    2. **CDN (CloudFront):** How to distribute assets across the globe?
       1. [${enalbed(current, '1.2.1')}] ${branchData['1.2.1'].todo}: ${branchData['1.2.1'].task}
       2. [${enalbed(current, '1.2.2')}] ${branchData['1.2.2'].todo}: ${branchData['1.2.2'].task}
    3. **DNS (Route53):** how to set up DNS? -- optional
       1. [o] {{1.3.1}}
2. **REST API:**
    1. **handlers**
       1. [${enalbed(current, '2.1.1')}] ${branchData['2.1.1'].todo}: ${branchData['2.1.1'].task}
       2. [${enalbed(current, '2.1.2')}] ${branchData['2.1.2'].todo}: ${branchData['2.1.2'].task}
       3. [${enalbed(current, '2.1.3')}] ${branchData['2.1.3'].todo}: ${branchData['2.1.3'].task}
    2. **API (CDK/ClaudiaJS):**
       1. [${enalbed(current, '2.2.1')}] ${branchData['2.2.1'].todo}: ${branchData['2.2.1'].task}
       2. [${enalbed(current, '2.2.2')}] ${branchData['2.2.2'].todo}: ${branchData['2.2.2'].task}
       3. [${enalbed(current, '2.2.3')}] ${branchData['2.2.3'].todo}: ${branchData['2.2.3'].task}
    3. **webapp**
       1. [${enalbed(current, '2.3.1')}] ${branchData['2.3.1'].todo}: ${branchData['2.3.1'].task}
       2. [${enalbed(current, '2.3.2')}] ${branchData['2.3.2'].todo}: ${branchData['2.3.2'].task}
       
       `
      //  3. **Database:**
      //      1. **DynamoDB:**
      //         1. [${enalbed(current, '3.1.1')}] ${branchData['3.1.1'].todo}: ${branchData['3.1.1'].task}
      //         2. [${enalbed(current, '3.1.2')}] ${branchData['3.1.2'].todo}: ${branchData['3.1.2'].task}
      //      2. **handlers:**
      //         1. [${enalbed(current, '3.2.1')}] ${branchData['3.2.1'].todo}: ${branchData['3.2.1'].task}
      //         2. [${enalbed(current, '3.2.2')}] ${branchData['3.2.2'].todo}: ${branchData['3.2.2'].task}
      //         3. [${enalbed(current, '3.2.3')}] ${branchData['3.2.3'].todo}: ${branchData['3.2.3'].task}
      //  4. **Backend processes:**
      //      1. **app integration:**
      //         1. [${enalbed(current, '4.1.1')}] ${branchData['4.1.1'].todo}: ${branchData['4.1.1'].task}
      //         2. [${enalbed(current, '4.1.2')}] ${branchData['4.1.2'].todo}: ${branchData['4.1.2'].task}
      //      2. **Handlers** 
      //         1. [${enalbed(current, '4.2.1')}] ${branchData['4.2.1'].todo}: ${branchData['4.2.1'].task}
      //         2. [${enalbed(current, '4.2.2')}] ${branchData['4.2.2'].todo}: ${branchData['4.2.2'].task}
      //      3. **assign handlers:** 
      //         1. [${enalbed(current, '4.3.1')}] ${branchData['4.3.1'].todo}: ${branchData['4.3.1'].task}
      //         2. [${enalbed(current, '4.3.2')}] ${branchData['4.3.2'].todo}: ${branchData['4.3.2'].task}
      //    5.  **Security:**
      //        1. **Web App Access Control (Cognito):** How to secure app?
      //           1. [${enalbed(current, '5.1.1')}] ${branchData['5.1.1'].todo} ${branchData['5.1.1'].task}
      //           2. [${enalbed(current, '5.1.2')}] ${branchData['5.1.2'].todo} ${branchData['5.1.2'].task}
      //        2. **API Access Control (Cognito authorizer):**
      //           1. [${enalbed(current, '5.2.1')}] ${branchData['5.2.1'].todo} ${branchData['5.2.1'].task}
      //           2. [${enalbed(current, '5.2.2')}] ${branchData['5.2.2'].todo} ${branchData['5.2.2'].task}
      return readme
   } catch (err) {
      console.error(err)
      console.info('this might be due to missing task in activity title, like 1.2.1: this is missing')
   } finally { }
}


module.exports = { generateReadme }