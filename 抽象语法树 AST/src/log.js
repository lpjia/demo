export function log(result) {
  console.log('\n========== Config.js 配置检查结果 ==========\n');
  console.log('🔍 testHost 配置检查:');
  result.testHost.values.forEach(item => {
    const status = item.containTest ? '✅' : '❌';
    console.log(`   ${status} ${item.key}: ${item.value}`);
  });
  if (result.testHost.hasAllTest) {
    console.log('   🎉 所有 testHost 配置都包含 "test" 字符串');
  } else {
    const invalidItems = result.testHost.values.filter(item => !item.containTest);
    console.log('   ⚠️  以下配置不包含 "test" 字符串:');
    invalidItems.forEach(item => {
      console.log(`     ❌ ${item.key}: ${item.value}`);
    });
  }
  console.log('\n---\n');
  console.log('🔍 prodHost 配置检查:');
  result.prodHost.values.forEach(item => {
    const status = !item.containTest ? '✅' : '❌';
    console.log(`   ${status} ${item.key}: ${item.value}`);
  });
  if (result.prodHost.hasNoneTest) {
    console.log('   🎉 所有 prodHost 配置都不包含 "test" 字符串');
  } else {
    const invalidItems = result.prodHost.values.filter(item => item.containTest);
    console.log('   ⚠️  以下配置包含 "test" 字符串（可能存在问题）:');
    invalidItems.forEach(item => {
      console.log(`     ❌ ${item.key}: ${item.value}`);
    });
  }
  console.log('\n========== 配置检查完成 ==========\n');

}