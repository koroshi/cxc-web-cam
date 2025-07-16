// frontend/scripts/fix-relative-paths.js
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// 解决 ES6 模块中 __dirname 未定义的问题
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), '..');

// 目标目录（docs 文件夹路径，根据你的实际结构调整）
const docsDir = join(__dirname, '../docs');

/**
 * 替换文件中的绝对路径为相对路径
 * @param {string} filePath - 文件路径
 */
function replaceAbsolutePaths(filePath) {
  let content = readFileSync(filePath, 'utf8');
  
  // 替换规则：
  // 1. 处理 _next 目录下的静态资源（CSS/JS/字体等）
  // 2. 适配不同文件中可能出现的路径格式
  content = content
    // 处理 /cxc-web-cam/_next/... 格式的绝对路径
    .replace(/\/cxc-web-cam\/_next/g, './_next')
    // // 处理可能的根路径引用（如 /_next/...）
  
  writeFileSync(filePath, content, 'utf8');
}

/**
 * 递归处理目录下的所有文件
 * @param {string} dir - 目录路径
 */
function processDirectory(dir) {
  readdirSync(dir).forEach((item) => {
    const itemPath = join(dir, item);
    const stat = statSync(itemPath);
    
    if (stat.isDirectory()) {
      // 递归处理子目录
      processDirectory(itemPath);
    } else {
      // 处理需要替换路径的文件类型（新增 .css 和字体相关文件）
      const ext = item.split('.').pop().toLowerCase();
      if (['html', 'js', 'css', 'woff2', 'woff', 'ttf', 'eot', 'svg'].includes(ext)) {
        replaceAbsolutePaths(itemPath);
      }
    }
  });
}

// 执行处理
processDirectory(docsDir);
console.log('✅ 所有文件的绝对路径已替换为相对路径（包括字体文件）');