@echo off

@echo =========================

@echo author: lpjia

@echo =========================


set git_work=C:\demo


set setup_path=D:\


@echo Pushing %git_work%

if exist %git_work% GOTO :gengxin else GOTO :MK

:MK

@echo Please check if your working directory is correct

echo & pause GOTO :END

@echo Pushed and exit

goto :END

:END

exit

:gengxin


cd %git_work%


if exist "%setup_path%"\autoPush.log (echo update:   %git_work%   %date% %time%  >> "%setup_path%"\autoPush.log) else echo create:   %git_work%   %date% %time% >"%setup_path%"\autoPush.log

git push

exit

