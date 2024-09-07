@echo off

:: Checks if a parameter was passed
if "%~1"=="-h" goto :HELP

:: Evaluates the parameter
if "%~1"=="-A" (
    echo Compiling Deps & Slicer
    :: Replace this with your actual compilation command for Deps & Slicer
) else if "%~1"=="-D" (
    echo Compiling Deps
    :: Replace this with your actual compilation command for Deps
) else if "%~1"=="-S" (
    echo Compiling Slicer
    :: Replace this with your actual compilation command for Slicer
) else (
    echo Invalid parameter: %~1
    goto :help
)

goto :end

:HELP
echo Help:
echo   -A  Compile Deps & Slicer
echo   -D  Compile Deps
echo   -S  Compile Slicer

:end