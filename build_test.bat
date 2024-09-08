@echo off

:: set console parameters
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvars64.bat"

:: function menu
:start
echo -----------------------------------------------------------
echo Functions:
echo -----------------------------------------------------------
echo   -A Compile Dependencies and Slicer
echo   -D Compile Dependencies
echo   -S Compile Slicer
echo -----------------------------------------------------------
echo Extended functions:
echo -----------------------------------------------------------
echo   -E Exit
echo -----------------------------------------------------------
echo Notice:
echo -----------------------------------------------------------
echo The option to create a zip is available after compilation 
echo -----------------------------------------------------------

SET /p function=Please enter a function: 
PAUSE

if "%function%"=="-A" (
    goto :CompileDeps
:TriggerCompileSlicer
    goto :CompileSlicer
)
if "%function%"=="-D" goto :CompileDeps
if "%function%"=="-S" goto :CompileSlicer
if "%function%"=="-E" goto :end
else (
    echo Invalid parameter: %function%
    goto :start
)

:: Define sections
:CompileDeps

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

echo download python
PAUSE

echo Downloading Python

set PY_URL=https://www.python.org/ftp/python/3.12.6/python-3.12.6-embed-amd64.zip

cd GalaxySlicerNeo_deps

:: create folder for python
mkdir python
cd python

set PY_DIR=%CD%

:: download python zip
curl -o %PY_DIR%\python_embed.zip %PY_URL%

:: expand python zip
powershell -command "Expand-Archive -Path '%PY_DIR%\python_embed.zip -DestinationPath %PY_DIR%'"

del %PY_DIR%\python_embed.zip

:: go back to build folder
cd ..
cd ..

echo Compile dependencies completed

:: Query whether the dependencies should be zipped
SET /p zipdeps=Should the dependencies be zipped? (Y/N): 
PAUSE

:: Zip dependencies
if "%zipdeps%"=="Y" (

echo Zip dependencies
set DEPS_ZIP=%BUILD%/GalaxySlicerNeo_deps.zip

:: compress dependencies folder
powershell -command "Compress-Archive -Path '%DEPS%' -DestinationPath '%DEPS_ZIP%'"
)

:: If both are to be compiled, the batch should jump to the next position
if "%function%"=="-A" goto :TriggerCompileSlicer

goto :start

:CompileSlicer
echo Compiling Slicer
:: Replace this with your actual compilation command for Slicer
goto :start

:end