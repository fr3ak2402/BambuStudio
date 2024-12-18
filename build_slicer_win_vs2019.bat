@echo off

:: set console parameters
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvars64.bat"

cd D:/work/Projects

echo create folders for the compiling process

:: create folders for the compiling process
mkdir GalaxySlicerNeo

cd D:/BambuStudio

:: create folders for the compiling process
mkdir build
cd build

echo start compiling...

:: compile slicer -> VS2019 and architecture x64
cmake .. -G "Visual Studio 16 2019" -DBBL_RELEASE_TO_PUBLIC=1 -DCMAKE_PREFIX_PATH="D:/work/Projects/GalaxySlicerNeo_deps/usr/local" -DCMAKE_INSTALL_PREFIX="D:/work/Projects/GalaxySlicerNeo" -DCMAKE_BUILD_TYPE=Release -DWIN10SDK_PATH="C:/Program Files (x86)/Windows Kits/10/Include/10.0.22621.0"
cmake --build . --target install --config Release

cd D:/work/Projects/GalaxySlicerNeo

echo create folder for python

mkdir python

echo Start deleting unnecessary files...

:: delete all unnecessary data
powershell -command "Remove-Item 'D:/BambuStudio/build' -Recurse -Force"

echo Deletion of unnecessary files completed...

echo copying Python...

powershell -command "Copy-Item -Path D:/work/Projects/GalaxySlicerNeo_deps/python/* -Destination D:/work/Projects/GalaxySlicerNeo/python -Recurse"

PAUSE