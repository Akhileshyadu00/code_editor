document.addEventListener('DOMContentLoaded', function() {
    const codeArea = document.getElementById('code-area');
    const copyButton = document.getElementById('copy-button');
    const saveButton = document.getElementById('save-button');
    const lockButton = document.getElementById('lock-button');
    let locked = false;

    // Load code from localStorage if available
    if (localStorage.getItem('savedCode')) {
        codeArea.value = localStorage.getItem('savedCode');
    } else {
        codeArea.value = `function helloWorld() {
    console.log('Hello, World!');
}`;
    }

    // Copy button
    copyButton.addEventListener('click', function() {
        codeArea.select();
        document.execCommand('copy');
        alert('Code Copied!');
    });

    // Save button
    saveButton.addEventListener('click', function() {
        localStorage.setItem('savedCode', codeArea.value);
        alert('Code Saved!');
    });

    // Lock/Unlock button
    lockButton.addEventListener('click', function() {
        locked = !locked;
        codeArea.readOnly = locked;

        if (locked) {
            lockButton.textContent = 'Unlock';
            alert('Locked!')
        } else {
            lockButton.textContent = 'Lock';
            alert('Unlocked!')
        }
    });

    // Indent text with Tab key
    codeArea.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && !locked) {
            e.preventDefault();
            const start = codeArea.selectionStart;
            const end = codeArea.selectionEnd;
            codeArea.value = codeArea.value.substring(0, start) + '\t' + codeArea.value.substring(end);
            codeArea.selectionStart = codeArea.selectionEnd = start + 1;
        }

        // indent after opening curly braces
        if (e.key === '{' && !locked) {
            e.preventDefault();
            const cursorPosition = codeArea.selectionStart;
            const currentLine = codeArea.value.substr(0, cursorPosition);
            const leadingSpaces = currentLine.match(/\s*$/)[0];
            const indent = '    '; // 4 spaces for indentation

            codeArea.value = codeArea.value.substring(0, cursorPosition) + ' {\n' + leadingSpaces + indent + codeArea.value.substring(cursorPosition);
            codeArea.selectionStart = codeArea.selectionEnd = cursorPosition + 5;
        }

        // unindent after closing curly braces
        if (e.key === '}' && !locked) {
            e.preventDefault();
            const cursorPosition = codeArea.selectionStart;
            const currentLine = codeArea.value.substr(0, cursorPosition);
            const leadingSpaces = currentLine.match(/\s*$/)[0];
            codeArea.value = codeArea.value.substring(0, cursorPosition) + '\n' + leadingSpaces + '}' + codeArea.value.substring(cursorPosition);
            codeArea.selectionStart = codeArea.selectionEnd = cursorPosition + 1;
        }
    });
});
