:: 创建多个文件


:: md mulu
:: md mulu2 目录3
rem echo that >> file2.txt
:: echo=> file.txt


:: 可以生效
:: for /l %%i in (1,1,5) do echo=> %%i.txt

md 目录
cd 目录
for /l %%i in (1, 1, 5) do ( 
	echo=> %%i.txt 
)