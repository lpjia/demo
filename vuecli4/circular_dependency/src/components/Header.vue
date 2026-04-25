<template>
  <div>
    <header class="bg-gray-800 h-16 flex text-gray-300 px-5">
      <a href="#" class="mr-5 py-2">
        <img class="h-full" src="@/assets/logo.png" alt="">
      </a>
      <nav class="flex items-center">
        <a href="#" class="hover:bg-black mx-1 px-5 py-2 rounded-lg">仪表盘</a>
        <a href="#" class="hover:bg-black mx-1 px-5 py-2 rounded-lg">工程</a>
        <a href="#" class="hover:bg-black mx-1 px-5 py-2 rounded-lg">团队</a>
        <a href="#" class="hover:bg-black mx-1 px-5 py-2 rounded-lg">日历</a>
      </nav>
      <div class="group relative ml-auto flex items-center">
        <img class="h-9 rounded-full" src="@/assets/user.jpg" alt="">
        <div
          class="absolute bg-white text-gray-700 text-sm top-14 w-48 right-0 ring-black ring-opacity-5 py-2 rounded-md scale-0 group-hover:scale-100 duration-300 origin-top-right">
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">个人资料</a>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">设置</a>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">退出</a>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>
