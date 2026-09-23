const fs = require('fs');
const path = require('path');

// Folders to completely ignore
const IGNORE_DIRS = new Set(['.git', 'node_modules', '.next', 'public', 'dist', 'build', '.vscode']);

// Dynamically ignore this script itself
const SCRIPT_NAME = path.basename(__filename);
const OUTPUT_FILE = "project_structure.txt";

function getProjectStructure(dir, baseDir = dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filepath = path.join(dir, file);
        const stats = fs.statSync(filepath);

        if (stats.isDirectory()) {
            // Skip the ignored directories entirely
            if (!IGNORE_DIRS.has(file)) {
                getProjectStructure(filepath, baseDir, fileList);
            }
        } else if (stats.isFile()) {
            // Skip this script and the output file
            if (file !== SCRIPT_NAME && file !== OUTPUT_FILE) {
                // Generate a clean relative path using forward slashes (standard for AI)
                const relPath = path.relative(baseDir, filepath).replace(/\\/g, '/');
                fileList.push(relPath);
            }
        }
    }
    
    return fileList;
}

console.log(`Scanning project structure...`);

// Run the scan starting from the current directory
const projectDir = process.cwd();
const allPaths = getProjectStructure(projectDir);

// Write the result to a text file, separated by newlines
fs.writeFileSync(OUTPUT_FILE, allPaths.join(' ; '), 'utf-8');

console.log(`Done! Extracted ${allPaths.length} file paths into ${OUTPUT_FILE}.`);