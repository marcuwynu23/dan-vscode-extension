import * as path from 'path';
import * as Mocha from 'mocha';
import * as fs from 'fs';

export async function run(): Promise<void> {
    // Create the mocha test
    const mocha = new Mocha({
        ui: 'tdd',
        color: true,
        timeout: 10000
    });

    const testsRoot = path.resolve(__dirname, '..');

    try {
        // Find all test files recursively
        function findTestFiles(dir: string, fileList: string[] = []): string[] {
            const files = fs.readdirSync(dir);
            
            files.forEach((file: string) => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                
                if (stat.isDirectory()) {
                    findTestFiles(filePath, fileList);
                } else if (file.endsWith('.test.js')) {
                    fileList.push(filePath);
                }
            });
            
            return fileList;
        }

        const files = findTestFiles(testsRoot);

        // Add files to the test suite
        files.forEach((f: string) => mocha.addFile(f));

        // Run the mocha test
        return new Promise((c, e) => {
            mocha.run(failures => {
                if (failures > 0) {
                    e(new Error(`${failures} tests failed.`));
                } else {
                    c();
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

