const fsExtra = require('fs-extra');
const replace = require('replace-in-file');
const Launcher = require('@wdio/cli').default;

// lts version - with 1.71.19 being the exception
// in that there seems to be stuff boken in ui5 > 1.71.19 <= 1.71.25
const versions = ['1.60.33', '1.71.19', '1.84.3'];

(async () => {
    for (const version of versions) {
        // create an index.html for bootstrapping per version
        const targetIndex = `test/ui5-app/webapp/index-${version}.html`;
        const bootstrapSrc = `https://openui5.hana.ondemand.com/${version}/resources/sap-ui-core.js`;
        fsExtra.copySync('test/ui5-app/webapp/index.html', targetIndex);
        const optionsIndex = {
            files: targetIndex,
            from: /src=\".*\"/,
            to: `src="${bootstrapSrc}"`
        };
        await replace(optionsIndex);
        console.log(`created index-${version}!`);

        // create a wdio/wdi5 config per version
        const targetWdioConf = `test/wdio-wdi5-ui5-${version}.conf.js`;
        fsExtra.copySync('test/wdio-browser-withUI5tooling.conf.js', targetWdioConf);
        const optionsWdioConf = {
            files: targetWdioConf,
            from: /url: 'index\.html'/,
            to: `url: "index-${version}.html"`
        };
        await replace(optionsWdioConf);
        console.log(`created wdio-wdi5-ui5-${version}.conf.js`);

        // run it
        const wdio = new Launcher(targetWdioConf);
        await wdio.run().then((code) => {
            if (code === 1) {
                process.exit(1);
            }
        });
    }
})();
