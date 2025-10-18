@echo off

@echo =========================

@echo author: lpjia

@echo run_ahk.bat

@echo =========================

:: 上面是打印输出作者信息, 为了版权
:: @echo off 为了不显示文件的路径, 简洁美观
:: 第二行信息是显示执行的bat脚本名


:: 注释, 推荐
rem 注释, 容易和其他关键词搅合, 不好记


:: bat执行完命令窗口不关闭
pause


:: 延时, 数字单位是秒, 最大99999秒, 不支持运算表达式
timeout /t 60 /nobreak >nul
:: 推荐timeout, 语义
choice /t 10 /d y /n >nul


:: 放到第一行, 使bat脚本获取管理员权限
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit


:: 执行其他程序
start C:\hot_key.ahk
:: start 命令, 调用外部程序，所有的DOS命令和命令行程序都可以由start命令来调用。
start test.bat
:: 打开 git 终端
start C:\z_software\Git\git-bash.exe
:: 并进入某文件夹
start C:\z_software\Git\git-bash.exe --cd=C:\tempStableVersion\submana_bg
:: 再输入命令执行
start C:\z_software\Git\git-bash.exe --cd=C:\tempStableVersion\submana_bg -c "npm run dev"
:: 打开日志
start %setup_path%\%log_name%.log


:: 设置变量
set svn_home=C:\z_software\SVN\bin
set svn_work=C:\items_zj
set setup_path=D:\
set log_name=autoUpdate

:: 使用变量, 变量名前后加%
%svn_work%


:: 退出cmd窗口
exit


:: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
:: 只总结了run_ahk.bat, 其他还没总结, 等用到了其他再总结吧
:: 所有正常使用的bat脚本都不要加注释
:: 总结txt文件里的bat语法, 然后删除txt文件, 保留bat文件



::::::::::::::::::::::::创建文件夹::::::::::::::::::::::::::::::::

:: 创建文件夹
md mulu

:: 创建多个文件夹
md mulu mulu2 mulu3

:: 创建中文目录
:: 需要先把 .bat 文件使用 ANSI 编码, 推荐用 Notepad++ 编辑器, 然后再输入中文目录
md 目录2

:: 进入目录
cd mulu




::::::::::::::::::::::::创建文件::::::::::::::::::::::::::::::::

:: 创建任意大小文件
:: fsutil file createnew 文件名(可以加路径) 文件大小
:: 最后的数字, 单位是字节(Byte), 1024Bytes=1kB   1024KB=1MB   1024MB=1GB
:: 文件名和文件大小缺一不可
fsutil file createnew D:\test.txt 1048576
fsutil file createnew null.zip 10485760


:: 创建文件
echo=> file.txt


:: 创建多个文件
for /l %%i in (1,1,3) do echo=> %%i.txt
:: 创建多个文件, 加了括号
for /l %%i in (1, 1, 3) do ( 
	echo=> %%i.txt 
)


:: 会多出来个=号
echo => file.txt


:: 创建文件并写入内容
echo that >> file2.txt


:: 创建文件并写入多行内容
:: +4 的意思是输出第四行以后的内容
@echo off
more +4 %0 >> a.txt
exit /b

123=0
asd=1
mdf=2
zxc=3
369=4
n
n+1


:: 如果不想某些信息写入, 把需要写入的内容放到最后面
:: 保证+数字对应上即可
@echo off
more +8 %0 >> a.txt
exit /b
假设这是不想写入的信息
假设这是不想写入的信息2
假设这是不想写入的信息3
假设这是不想写入的信息4

123=0
asd=1
mdf=2
zxc=3
369=4
n
n+1