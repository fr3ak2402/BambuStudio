@echo off

:: Main execution
if "%~1"=="" goto :HELP
if "%~1"=="-h" goto :HELP

if "%~1"=="-A" (
    goto :CompileDeps
:TriggerCompileSlicer
    goto :CompileSlicer
)
if "%~1"=="-D" goto :CompileDeps
if "%~1"=="-S" goto :CompileSlicer
else (
    echo Invalid parameter: %~1
    goto :help
)

goto :end

:HELP
echo ------------------------------
echo Help:
echo ------------------------------
echo   -A  Compile Dependencies and Slicer
echo   -D  Compile Dependencies
echo   -S  Compile Slicer
echo ------------------------------

goto :end

:: Define sections
:CompileDeps
echo Compiling Dependencies
:: Replace this with your actual compilation command for Deps

if "%~1"=="-A" goto :TriggerCompileSlicer

goto :end

:CompileSlicer
echo Compiling Slicer
:: Replace this with your actual compilation command for Slicer
goto :end

:end