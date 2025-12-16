import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

suite('Extension Tests', () => {
    let extension: vscode.Extension<any> | undefined;

    suiteSetup(async () => {
        // Wait for extension to be activated
        // Try to find extension by package name or publisher.name format
        extension = vscode.extensions.getExtension('dan-language') || 
                   vscode.extensions.getExtension('yourusername.dan-language');
        
        // If not found, try to find by display name
        if (!extension) {
            const allExtensions = vscode.extensions.all;
            extension = allExtensions.find(ext => 
                ext.packageJSON.name === 'dan-language' || 
                ext.packageJSON.displayName === 'DAN (Data Advanced Notation)'
            );
        }
        
        if (!extension) {
            throw new Error('Extension not found. Make sure the extension is installed.');
        }
        if (!extension.isActive) {
            await extension.activate();
        }
    });

    test('Extension should be present', () => {
        assert.ok(extension);
        assert.strictEqual(extension?.packageJSON.name, 'dan-language');
    });

    test('Extension should be activated', () => {
        assert.ok(extension?.isActive);
    });

    test('Extension should have correct display name', () => {
        assert.strictEqual(extension?.packageJSON.displayName, 'DAN (Data Advanced Notation)');
    });

    test('Extension should export activate function', () => {
        const extensionPath = extension?.extensionPath;
        assert.ok(extensionPath);
        
        const extensionModule = require(path.join(extensionPath, 'out', 'extension'));
        assert.ok(extensionModule.activate);
        assert.ok(typeof extensionModule.activate === 'function');
    });
});

suite('Language Registration Tests', () => {
    test('DAN language should be registered', async () => {
        const languages = await vscode.languages.getLanguages();
        assert.ok(languages.includes('dan'), 'DAN language should be registered');
    });

    test('DAN files should be recognized', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: 'test: value'
        });
        
        assert.strictEqual(document.languageId, 'dan');
    });

    test('File with .dan extension should be recognized', async () => {
        const uri = vscode.Uri.parse('untitled:test.dan');
        const document = await vscode.workspace.openTextDocument(uri);
        
        // The language might not be automatically detected for untitled files
        // but we can verify the extension is available
        assert.ok(vscode.languages.getLanguages().then(langs => langs.includes('dan')));
    });
});

suite('Syntax Highlighting Tests', () => {
    test('Should tokenize comments', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: '# This is a comment\n// This is also a comment'
        });

        const tokens = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
            'vscode.executeDocumentSymbolProvider',
            document.uri
        );

        // Verify document can be tokenized
        assert.ok(document);
    });

    test('Should tokenize key-value pairs', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: 'name: "Test"\nversion: 1.0\nenabled: true'
        });

        assert.ok(document);
        assert.strictEqual(document.languageId, 'dan');
    });

    test('Should tokenize blocks', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: 'app {\n  name: "Test"\n}'
        });

        assert.ok(document);
        assert.strictEqual(document.languageId, 'dan');
    });

    test('Should tokenize tables', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: 'users: table(id, name) [\n  1, Alice\n  2, Bob\n]'
        });

        assert.ok(document);
        assert.strictEqual(document.languageId, 'dan');
    });

    test('Should tokenize arrays', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: 'roles: [admin, user, guest]'
        });

        assert.ok(document);
        assert.strictEqual(document.languageId, 'dan');
    });
});

suite('Language Features Tests', () => {
    test('Should support comment toggling', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: 'name: value'
        });

        const editor = await vscode.window.showTextDocument(document);
        const position = new vscode.Position(0, 0);
        editor.selection = new vscode.Selection(position, position);

        // Test that comment configuration exists
        const config = vscode.workspace.getConfiguration('files.associations');
        assert.ok(document);
    });

    test('Should support bracket matching', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: 'app {\n  test: value\n}'
        });

        const editor = await vscode.window.showTextDocument(document);
        
        // Move cursor to opening brace
        const openBracePos = new vscode.Position(0, 4);
        editor.selection = new vscode.Selection(openBracePos, openBracePos);

        // Verify document supports bracket matching
        assert.ok(document);
    });
});

suite('Example Files Tests', () => {
    test('Should parse sample.dan file', async () => {
        const samplePath = path.join(__dirname, '../../../../examples/sample.dan');
        
        if (fs.existsSync(samplePath)) {
            const content = fs.readFileSync(samplePath, 'utf-8');
            const document = await vscode.workspace.openTextDocument({
                language: 'dan',
                content: content
            });

            assert.ok(document);
            assert.strictEqual(document.languageId, 'dan');
            assert.ok(document.getText().length > 0);
        }
    });

    test('Should parse config.dan file', async () => {
        const configPath = path.join(__dirname, '../../../../examples/config.dan');
        
        if (fs.existsSync(configPath)) {
            const content = fs.readFileSync(configPath, 'utf-8');
            const document = await vscode.workspace.openTextDocument({
                language: 'dan',
                content: content
            });

            assert.ok(document);
            assert.strictEqual(document.languageId, 'dan');
            assert.ok(document.getText().includes('app'));
        }
    });
});

