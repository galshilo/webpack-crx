const fs = require("fs");
const path = require("path");
const keypair = require('keypair');
const ChromeExtension = require("crx");

function WebpackCrxPlugin(options) {
    this.options = options || {};
    this.tempKey = path.resolve(__dirname, "tempKey.pem");
    this.outputFileName = `${options.name || "packed"}.crx`;

    if (this.options.key) {
        this.key = path.resolve(__dirname, options.key);
    } else {
        const pair = keypair();
        fs.writeFileSync(this.tempKey, pair.private);
        this.key = this.tempKey;
    }

    this.src = path.resolve(__dirname, this.options.src);
    this.dest = path.resolve(__dirname, this.options.dest);
    this.updateFile = path.resolve(__dirname, this.dest, options.updateFile || "update.xml");
    this.crxFile = path.resolve(__dirname, path.join(this.dest, this.outputFileName));
}

WebpackCrxPlugin.prototype.apply = function (compiler) {
    let self = this;
    return compiler.plugin('done', function () {
        self.pack.call(self);
    });
};

WebpackCrxPlugin.prototype.pack = function () {
    const crx = new ChromeExtension({
        codebase: `http://localhost:8000/${this.outputFileName}`,
        privateKey: fs.readFileSync(this.key)
    });

    crx.load(this.src)
        .then(crx => crx.pack())
        .then(crxBuffer => {
            const updateXML = crx.generateUpdateXML();
            if (!fs.existsSync(this.dest)) {
                fs.mkdirSync(this.dest);
            }
            fs.writeFileSync(this.updateFile, updateXML);
            console.info(`Saving CRX file to ${this.crxFile}`);
            fs.writeFileSync(this.crxFile, crxBuffer);
            if (fs.existsSync(this.tempKey)) {
                fs.unlinkSync(this.tempKey);
            }
        })
        .catch(err => {
            console.error(err);
        });
};

module.exports = WebpackCrxPlugin;