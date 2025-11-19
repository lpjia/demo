const fs = require('fs');
const path = require('path');

class MdImageComparator {
  constructor() {
    this.imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
  }

  // 从MD文件中提取图片名称
  extractImagesFromMd(mdContent) {
    const imageRegex = /!\[.*?\]\((.*?)\)|<img.*?src=["'](.*?)["']/g;
    const images = new Set();

    let match;
    while ((match = imageRegex.exec(mdContent)) !== null) {
      const imagePath = match[1] || match[2];
      if (imagePath) {
        const imageName = path.basename(imagePath);
        if (this.isImageFile(imageName)) {
          images.add(imageName);
        }
      }
    }
    return images;
  }

  // 检查是否为图片文件
  isImageFile(filename) {
    return this.imageExtensions.some(ext =>
      filename.toLowerCase().endsWith(ext)
    );
  }

  // 比较MD文件和图片文件夹
  compare(mdFilePath) {
    try {
      if (!fs.existsSync(mdFilePath)) {
        return { error: `MD文件不存在: ${mdFilePath}` };
      }

      const mdDir = path.dirname(mdFilePath);
      const mdImgsDir = path.join(mdDir, 'md_imgs');

      if (!fs.existsSync(mdImgsDir)) {
        return { error: `md_imgs文件夹不存在: ${mdImgsDir}` };
      }

      const mdContent = fs.readFileSync(mdFilePath, 'utf8');
      const mdImages = this.extractImagesFromMd(mdContent);

      const allFiles = fs.readdirSync(mdImgsDir);
      const imageFiles = allFiles.filter(file => this.isImageFile(file));

      const inconsistentImages = imageFiles.filter(file => !mdImages.has(file));

      return {
        mdFile: path.basename(mdFilePath),
        mdDir: mdDir,
        mdImgsDir: mdImgsDir,
        mdImages: Array.from(mdImages),
        folderImages: imageFiles,
        inconsistent: inconsistentImages,
        isConsistent: inconsistentImages.length === 0
      };

    } catch (error) {
      return { error: error.message };
    }
  }

  // 删除不一致的图片
  deleteInconsistentImages(result) {
    if (result.error || result.isConsistent) {
      return { deleted: [], errors: [] };
    }

    const deleted = [];
    const errors = [];

    result.inconsistent.forEach(imageName => {
      try {
        const imagePath = path.join(result.mdImgsDir, imageName);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          deleted.push(imageName);
          console.log(`🗑️  已删除: ${imageName}`);
        }
      } catch (error) {
        errors.push({ image: imageName, error: error.message });
        console.log(`❌ 删除失败: ${imageName} - ${error.message}`);
      }
    });

    return { deleted, errors };
  }

  // 批量处理所有MD文件
  batchCompare(deleteInconsistent = false) {
    const currentDir = process.cwd();
    const mdFiles = fs.readdirSync(currentDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(currentDir, file));

    if (mdFiles.length === 0) {
      console.log('当前目录下没有找到MD文件');
      return [];
    }

    console.log(`找到 ${mdFiles.length} 个MD文件，开始检查...`);
    const results = [];

    mdFiles.forEach(mdFile => {
      console.log(`\n📄 处理文件: ${mdFile}`);
      const result = this.compare(mdFile);

      if (result.error) {
        console.log(`\n❌ 错误: ${result.error}`);
      } else {
        console.log(`\nMD文件中的图片: ${result.mdImages.join(', ') || '无'}`);
        console.log(`\nmd_imgs文件夹中的图片: ${result.folderImages.join(', ') || '无'}`);

        if (result.isConsistent) {
          console.log('\n✅ 所有图片都一致！');
        } else {
          console.log('\n❌ 不一致的图片:');
          result.inconsistent.forEach(image => {
            console.log(`   - ${image}`);
          });

          // 如果设置了删除选项，则删除不一致的图片
          if (deleteInconsistent) {
            console.log('\n🗑️  开始删除不一致的图片...');
            const deleteResult = this.deleteInconsistentImages(result);

            if (deleteResult.deleted.length > 0) {
              console.log(`✅ 成功删除 ${deleteResult.deleted.length} 个文件`);
            }
            if (deleteResult.errors.length > 0) {
              console.log(`❌ 删除过程中出现 ${deleteResult.errors.length} 个错误`);
            }
          }
        }
      }

      results.push(result);
    });

    return results;
  }
}

// 主函数
function main() {
  const comparator = new MdImageComparator();

  // 从命令行参数判断是否要删除不一致的图片
  const deleteInconsistent = process.argv.includes('--delete');

  if (deleteInconsistent) {
    console.log('⚠️  注意：将自动删除不一致的图片\n');
  } else {
    console.log('💡 提示：使用 --delete 参数可以自动删除不一致的图片\n');
  }

  comparator.batchCompare(deleteInconsistent);
}

// 当直接运行此文件时(node md-image-checker.js), 就是主模块, 才执行main()
if (require.main === module) {
  main();
}

module.exports = MdImageComparator;