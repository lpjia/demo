@echo off

@echo =========================

@echo author: lpjia

@echo =========================

:: SVN��װĿ¼

set svn_home=C:\z_software\SVN\bin

:: SVN����Ŀ¼

set svn_work=C:\items_zj
:: set svn_work=C:\items_child

:: SVN��־Ŀ¼, ִ�����������־

set setup_path=D:\

@echo ���ڸ���Ŀ¼ %svn_work%

if exist %svn_work% GOTO :gengxin else GOTO :MK

:MK

@echo �������Ĺ���Ŀ¼�Ƿ���ȷ

echo & pause GOTO :END

@echo ��������˳�

goto :END

:END

exit

:gengxin

if exist "%setup_path%"\autoUpdate.log (echo update:   %svn_work%   %date% %time%  >> "%setup_path%"\autoUpdate.log) else echo create:   %svn_work%   %date% %time% >"%setup_path%"\autoUpdate.log

"%svn_home%"\TortoiseProc.exe/command:update /path:"%svn_work%" /notempfile /closeonend:1

exit

