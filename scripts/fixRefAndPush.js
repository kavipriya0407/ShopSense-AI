import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

const dir = path.resolve('.');
const token = process.argv[2] || process.env.GITHUB_TOKEN;
const remoteUrl = 'https://github.com/kavipriya0407/ShopSense-AI.git';

async function fixAndPush() {
  console.log('🔍 Checking local git branches and HEAD ref...');
  const branches = await git.listBranches({ fs, dir });
  console.log('Local branches found:', branches);

  // Get current HEAD commit SHA
  const headSha = await git.resolveRef({ fs, dir, ref: 'HEAD' });
  console.log('Current HEAD SHA:', headSha);

  // Ensure 'main' branch exists pointing to HEAD
  try {
    await git.branch({ fs, dir, ref: 'main', checkout: true, force: true });
    console.log('✅ Created and checked out main branch.');
  } catch (e) {
    console.log('Branch main setup note:', e.message);
  }

  console.log(`🚀 Pushing main branch to ${remoteUrl}...`);
  const res = await git.push({
    fs,
    http,
    dir,
    url: remoteUrl,
    ref: 'main',
    force: true,
    onAuth: () => ({ username: token }),
  });

  console.log('🎉 SUCCESSFULLY PUSHED TO GITHUB REPOSITORY!');
  console.log(res);
}

fixAndPush().catch((err) => {
  console.error('❌ Push error:', err);
});
