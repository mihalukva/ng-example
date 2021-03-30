const { spawn } = require('child_process');
const ls = spawn('npx', ['json-server --watch src/db.json'], { shell: true });

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

const PROXY_CONFIG = {
    "/api": {
        "target": "http://localhost:3000",
        "secure": false,
        pathRewrite: { '^/api': '' },
    }
}

module.exports = PROXY_CONFIG;