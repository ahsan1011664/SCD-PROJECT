@echo off

rem runner will replace key words in the template and generate a batch script to run.
rem Keywords: 
rem  PROCESSID = pid
rem  RUNNERPROCESSNAME = Runner.Listener[.exe]
rem  ROOTFOLDER = ./
rem  EXISTRUNNERVERSION = 2.100.0
rem  DOWNLOADRUNNERVERSION = 2.101.0 
rem  UPDATELOG = _diag/SelfUpdate-UTC.log
rem  RESTARTINTERACTIVERUNNER = 0/1

setlocal
set runnerpid=18484
set runnerprocessname=Runner.Listener.exe
set rootfolder=C:\Users\gj\Desktop\Semester6\SCD_Project\iNotebook-scd\actions-runner
set existrunnerversion=2.311.0
set downloadrunnerversion=2.323.0
set logfile=C:\Users\gj\Desktop\Semester6\SCD_Project\iNotebook-scd\actions-runner\_diag\SelfUpdate-20250512-073621.log
set restartinteractiverunner=0

rem log user who run the script
echo [%date% %time%] --------whoami-------- >> "%logfile%" 2>&1
whoami >> "%logfile%" 2>&1
echo [%date% %time%] --------whoami-------- >> "%logfile%" 2>&1

rem wait for runner process to exit.
echo [%date% %time%] Waiting for %runnerprocessname% (%runnerpid%) to complete >> "%logfile%" 2>&1
:loop
tasklist /fi "pid eq %runnerpid%" | find /I "%runnerprocessname%" >> "%logfile%" 2>&1
if ERRORLEVEL 1  (
  goto copy
)

echo [%date% %time%] Process %runnerpid% still running, check again after 1 second. >> "%logfile%" 2>&1
ping -n 2 127.0.0.1 >nul
goto loop

rem start re-organize folders
:copy
echo [%date% %time%] Process %runnerpid% finished running >> "%logfile%" 2>&1
echo [%date% %time%] Sleep 1 more second to make sure process exited >> "%logfile%" 2>&1
ping -n 2 127.0.0.1 >nul
echo [%date% %time%] Re-organize folders >> "%logfile%" 2>&1

rem the folder structure under runner root will be
rem ./bin -> bin.2.100.0 (junction folder)
rem ./externals -> externals.2.100.0 (junction folder)
rem ./bin.2.100.0
rem ./externals.2.100.0
rem ./bin.2.99.0
rem ./externals.2.99.0
rem by using the juction folder we can avoid file in use problem.

rem if the bin/externals junction point already exist, we just need to delete the juction point then re-create to point to new bin/externals folder.
rem if the bin/externals still are real folders, we need to rename the existing folder to bin.version format then create junction point to new bin/externals folder.

rem check bin folder
rem we do findstr /C:" bin" since in migration mode, we create a junction folder from runner to bin.
rem as result, dir /AL | findstr "bin" will return the runner folder. output looks like (07/27/2016  05:21 PM    <JUNCTION>     runner [E:\bin])
dir "%rootfolder%" /AL 2>&1 | findstr /C:" bin" >> "%logfile%" 2>&1
if ERRORLEVEL 1 (
  rem return code 1 means it can't find a bin folder that is a junction folder
  rem so we need to move the current bin folder to bin.2.99.0 folder.
  echo [%date% %time%] move "%rootfolder%\bin" "%rootfolder%\bin.%existrunnerversion%" >> "%logfile%" 2>&1
  move "%rootfolder%\bin" "%rootfolder%\bin.%existrunnerversion%" >> "%logfile%" 2>&1
  if ERRORLEVEL 1 (
    echo [%date% %time%] Can't move "%rootfolder%\bin" to "%rootfolder%\bin.%existrunnerversion%" >> "%logfile%" 2>&1
    goto fail
  )
  
) else (
  rem otherwise it find a bin folder that is a junction folder
  rem we just need to delete the junction point.
  echo [%date% %time%] Delete existing junction bin folder >> "%logfile%" 2>&1
  rmdir "%rootfolder%\bin" >> "%logfile%" 2>&1
  if ERRORLEVEL 1 (
    echo [%date% %time%] Can't delete existing junction bin folder >> "%logfile%" 2>&1
    goto fail
  )
)

rem check externals folder
dir "%rootfolder%" /AL 2>&1 | findstr "externals" >> "%logfile%" 2>&1
if ERRORLEVEL 1 (
  rem return code 1 means it can't find a externals folder that is a junction folder
  rem so we need to move the current externals folder to externals.2.99.0 folder.
  echo [%date% %time%] move "%rootfolder%\externals" "%rootfolder%\externals.%existrunnerversion%" >> "%logfile%" 2>&1
  move "%rootfolder%\externals" "%rootfolder%\externals.%existrunnerversion%" >> "%logfile%" 2>&1
  if ERRORLEVEL 1 (
    echo [%date% %time%] Can't move "%rootfolder%\externals" to "%rootfolder%\externals.%existrunnerversion%" >> "%logfile%" 2>&1
    goto fail
  )  
) else (
  rem otherwise it find a externals folder that is a junction folder
  rem we just need to delete the junction point.
  echo [%date% %time%] Delete existing junction externals folder >> "%logfile%" 2>&1
  rmdir "%rootfolder%\externals" >> "%logfile%" 2>&1
  if ERRORLEVEL 1 (
    echo [%date% %time%] Can't delete existing junction externals folder >> "%logfile%" 2>&1
    goto fail
  )
)

rem create junction bin folder
echo [%date% %time%] Create junction bin folder >> "%logfile%" 2>&1
mklink /J "%rootfolder%\bin" "%rootfolder%\bin.%downloadrunnerversion%" >> "%logfile%" 2>&1
if ERRORLEVEL 1 (
  echo [%date% %time%] Can't create junction bin folder >> "%logfile%" 2>&1
  goto fail
)

rem create junction externals folder
echo [%date% %time%] Create junction externals folder >> "%logfile%" 2>&1
mklink /J "%rootfolder%\externals" "%rootfolder%\externals.%downloadrunnerversion%" >> "%logfile%" 2>&1
if ERRORLEVEL 1 (
  echo [%date% %time%] Can't create junction externals folder >> "%logfile%" 2>&1
  goto fail
)

echo [%date% %time%] Update succeed >> "%logfile%" 2>&1

type nul > update.finished
echo [%date% %time%] update.finished file creation succeed >> "%logfile%" 2>&1

rem rename the update log file with %logfile%.succeed/.failed/succeedneedrestart
rem runner service host can base on the log file name determin the result of the runner update
echo [%date% %time%] Rename "%logfile%" to be "%logfile%.succeed" >> "%logfile%" 2>&1
move "%logfile%" "%logfile%.succeed" >nul

rem restart interactive runner if needed
if %restartinteractiverunner% equ 1 (
  echo [%date% %time%] Restart interactive runner >> "%logfile%.succeed" 2>&1
  endlocal
  start "Actions Runner" cmd.exe /k "C:\Users\gj\Desktop\Semester6\SCD_Project\iNotebook-scd\actions-runner\run.cmd"
) else (
  endlocal
)

goto :eof

:fail
echo [%date% %time%] Rename "%logfile%" to be "%logfile%.failed" >> "%logfile%" 2>&1
move "%logfile%" "%logfile%.failed" >nul
goto :eof

