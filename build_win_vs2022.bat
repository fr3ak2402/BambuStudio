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
:: Create folders for the compiling process
cd deps
mkdir build
cd build

set BUILD=%CD%
set DEPS=%BUILD%/GalaxySlicerNeo_deps

:: compile dependencies -> VS2022 and architecture x64
cmake ../ -G "Visual Studio 17 2022" -A x64 -DDESTDIR=%DEPS% -DCMAKE_BUILD_TYPE=Release
cmake --build . --config Release --target deps -- -m

:: delete all unnecessary data
$AuszuschliessenderOrdner = "GalaxySlicerNeo_deps"
Get-ChildItem %BUILD% -Recurse -Exclude $AuszuschliessenderOrdner | Remove-Item -Recurse -Force

:: create folders for the compiling process
if "%~1"=="-A" goto :TriggerCompileSlicer

goto :end

:CompileSlicer
echo Compiling Slicer
:: Replace this with your actual compilation command for Slicer
goto :end

:end