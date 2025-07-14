import { promises as fs } from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');
const ftpReadyDir = path.resolve(process.cwd(), 'ftp-ready');

async function prepareForFtp() {
  try {
    // 1. Remove existing ftp-ready directory if it exists
    await fs.rm(ftpReadyDir, { recursive: true, force: true });
    console.log(`Removed existing ${ftpReadyDir}`);

    // 2. Create a new ftp-ready directory
    await fs.mkdir(ftpReadyDir, { recursive: true });
    console.log(`Created ${ftpReadyDir}`);

    // 3. Copy contents of dist to ftp-ready
    await fs.cp(distDir, ftpReadyDir, { recursive: true });
    console.log(`Copied contents from ${distDir} to ${ftpReadyDir}`);

    console.log('\nWebsite prepared for FTP deployment in the "ftp-ready" folder.');
    console.log('Please upload the *contents* of the "ftp-ready" folder to your web server.');

  } catch (error) {
    console.error('Error preparing for FTP deployment:', error);
    process.exit(1);
  }
}

prepareForFtp();
