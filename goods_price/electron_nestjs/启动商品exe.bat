@echo off
chcp 65001 >nul
echo 正在启动 PowerShell 并运行程序...

powershell -NoExit -Command "cd 'D:\demo\goods_price\electron_nestjs\release\win-unpacked'; & '.\商品.exe'"

pause