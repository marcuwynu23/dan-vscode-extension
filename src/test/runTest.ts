import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
    try {
        // The folder containing the Extension Manifest package.json
        // Passed to `--extensionDevelopmentPath`
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');

        // The path to test runner
        // Passed to --extensionTestsPath
        const extensionTestsPath = path.resolve(__dirname, './suite/index');

        console.log('Extension Development Path:', extensionDevelopmentPath);
        console.log('Extension Tests Path:', extensionTestsPath);
        console.log('VS Code Version:', process.env.VSCODE_TEST_VERSION || 'stable');
        console.log('DISPLAY:', process.env.DISPLAY || 'not set');

        // Download VS Code, unzip it and run the integration test
        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            version: process.env.VSCODE_TEST_VERSION || 'stable',
            // Platform-specific launch args for headless environments
            launchArgs: process.platform === 'linux' && process.env.DISPLAY 
                ? ['--no-sandbox', '--disable-gpu']
                : ['--no-sandbox']
        });
    } catch (err) {
        console.error('Failed to run tests');
        console.error(err);
        process.exit(1);
    }
}

main();

