const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
console.log(4)
// 定义最大允许的提交大小，这里设置为 30MB
const MAX_SIZE = 10 * 1024;

// 获取本次提交的文件列表
const files = execSync('git diff --cached --name-only --diff-filter=ACM').toString().trim().split('\n');

// 初始化总大小为 0
let totalSize = 0;

// 遍历每个文件并计算总大小
files.forEach((file) => {
  if (file) {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    }
  }
});

// 检查总大小是否超过最大允许大小
if (totalSize > MAX_SIZE) {
  console.error(`Error: The total size of the commit (${Math.floor(totalSize / (1024 * 1024))}MB) exceeds the limit of 30MB.`);
  process.exit(1);
}

process.exit(0);
