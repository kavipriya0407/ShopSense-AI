import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';

const dir = path.resolve('.');

async function runGitSetup() {
  console.log('📦 Initializing Git repository with isomorphic-git...');
  await git.init({ fs, dir });

  // Read files to add
  function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      if (
        file === 'node_modules' ||
        file === '.git' ||
        file === 'dist' ||
        file === 'server/node_modules'
      ) {
        return;
      }
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      } else {
        const relativePath = path.relative(dir, fullPath).replace(/\\/g, '/');
        arrayOfFiles.push(relativePath);
      }
    });

    return arrayOfFiles;
  }

  const allFiles = getAllFiles(dir);
  console.log(` Staging ${allFiles.length} files...`);

  for (const file of allFiles) {
    await git.add({ fs, dir, filepath: file });
  }

  console.log('✍️ Creating initial commit...');
  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'Kavipriya',
      email: 'kavipriya@example.com',
    },
    message: 'Initial commit: ShopSense Multi-Vendor AI Marketplace with RAG & Super-Admin Portal',
  });

  console.log(`✅ Local Git Commit Created! Commit SHA: ${sha}`);
}

runGitSetup().catch((err) => {
  console.error('Git setup error:', err);
});
