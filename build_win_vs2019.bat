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
echo --------------------------------------------
echo Help:
echo --------------------------------------------
echo   -A  Compile Dependencies and Slicer
echo   -D  [-Z] Compile Dependencies
echo   -S  [-Z] Compile Slicer
echo --------------------------------------------
echo Extended functions:
echo --------------------------------------------
echo   [-Z]  Zip folder
echo --------------------------------------------

goto :end

:: Define sections
:CompileDeps
echo Compiling Dependencies

:: create folders for the compiling process
cd deps
mkdir build
cd build

set BUILD=%CD%
set DEPS=%BUILD%/GalaxySlicerNeo_deps

:: compile dependencies -> VS2019 and architecture x64
cmake ../ -G "Visual Studio 16 2019" -A x64 -DDESTDIR=%DEPS% -DCMAKE_BUILD_TYPE=Release
msbuild /m ALL_BUILD.vcxproj

:: delete all unnecessary data
powershell -command "Get-ChildItem '%BUILD%' -Recurse -Exclude 'GalaxySlicerNeo_deps' | Remove-Item -Recurse -Force"

echo Downloading Python

set PY_URL=https://www.python.org/ftp/python/3.12.6/python-3.12.6-embed-amd64.zip
set PY=%BUILD%/GalaxySlicer_dep

:: create folders for the compiling process
cd %PY%
mkdir python
cd python

set PY_DIR=%CD%

curl -o %PY_DIR%\python_embed.zip %PY_URL%

:: expand python zip
powershell -command "Expand-Archive -Path '%PY_DIR%\python_embed.zip -DestinationPath %PY_DIR%'"

del %PY_DIR%\python_embed.zip

if "%~1"=="-Z" goto :CompressDeps

:ContinueCompilation

if "%~1"=="-A" goto :TriggerCompileSlicer

goto :end

:CompressDeps
echo Compress Dependencies

set DEPS_ZIP=%BUILD%/GalaxySlicerNeo_deps.zip

:: compress dependencies folder
powershell -command "Compress-Archive -Path '%DEPS%' -DestinationPath '%DEPS_ZIP%'"

goto :ContinueCompilation

:CompileSlicer
echo Compiling Slicer
:: Replace this with your actual compilation command for Slicer
goto :end

:end