%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit

@echo off

@echo =========================

@echo author: lpjia

@echo run_ahk.bat

@echo =========================

timeout /t 10 /nobreak >nul

start C:\hot_key.ahk

exit