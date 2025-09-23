' 单引号是注释
' 开机自启动, 想有管理员权限, 没生效

WScript.Sleep 10000 ' 延时, 单位是毫秒

set ws=WScript.CreateObject("WScript.Shell")

ws.Run "C:\z_software\hot_key.ahk",0