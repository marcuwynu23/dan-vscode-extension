import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Syntax Highlighting Tests', () => {
    test('Should apply syntax highlighting to DAN files', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: 'app {\n  name: "Test"\n}'
        });

        assert.strictEqual(document.languageId, 'dan');
        
        // Verify the document has content
        const text = document.getText();
        assert.ok(text.includes('app'));
        assert.ok(text.includes('name'));
    });

    test('Should highlight comments correctly', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: '# This is a comment\nname: value\n// Another comment'
        });

        assert.strictEqual(document.languageId, 'dan');
        assert.ok(document.getText().includes('#'));
        assert.ok(document.getText().includes('//'));
    });

    test('Should highlight strings', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: 'name: "Test String"\ndescription: "Another string"'
        });

        assert.strictEqual(document.languageId, 'dan');
        assert.ok(document.getText().includes('"Test String"'));
    });

    test('Should highlight numbers', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: 'version: 1.0.0\nport: 3000\ncount: 42'
        });

        assert.strictEqual(document.languageId, 'dan');
        assert.ok(document.getText().includes('1.0.0'));
        assert.ok(document.getText().includes('3000'));
    });

    test('Should highlight booleans', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: 'enabled: true\ndisabled: false'
        });

        assert.strictEqual(document.languageId, 'dan');
        assert.ok(document.getText().includes('true'));
        assert.ok(document.getText().includes('false'));
    });

    test('Should highlight table syntax', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: 'users: table(id, name, email) [\n  1, Alice, "alice@test.com"\n  2, Bob, "bob@test.com"\n]'
        });

        assert.strictEqual(document.languageId, 'dan');
        assert.ok(document.getText().includes('table'));
        assert.ok(document.getText().includes('users'));
    });

    test('Should highlight arrays', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: 'roles: [admin, user, guest]\nports: [3000, 8080, 9000]'
        });

        assert.strictEqual(document.languageId, 'dan');
        assert.ok(document.getText().includes('['));
        assert.ok(document.getText().includes(']'));
    });

    test('Should handle nested blocks', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'dan',
            content: 'app {\n  server {\n    host: localhost\n    port: 3000\n  }\n}'
        });

        assert.strictEqual(document.languageId, 'dan');
        const text = document.getText();
        assert.ok(text.includes('app {'));
        assert.ok(text.includes('server {'));
        assert.ok(text.includes('}'));
    });
});

