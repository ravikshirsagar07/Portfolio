@echo off
echo ================================================
echo  Opening Firewall Port 5500 for Portfolio Server
echo ================================================
echo.

:: Add inbound firewall rule for port 5500
netsh advfirewall firewall delete rule name="Portfolio Dev Server 5500" >nul 2>&1
netsh advfirewall firewall add rule name="Portfolio Dev Server 5500" dir=in action=allow protocol=TCP localport=5500

if %errorlevel% == 0 (
    echo.
    echo  SUCCESS! Port 5500 is now open.
    echo  Open this on your phone:
    echo.
    echo     http://192.168.1.21:5500
    echo.
) else (
    echo  ERROR: Could not open firewall port.
    echo  Please run this file as Administrator.
)

echo.
pause
