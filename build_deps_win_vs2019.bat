@echo off

:: set console parameters
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvars64.bat"

:: create folders for the compiling process
cd deps
mkdir build
cd build

:: compile dependencies -> VS2019 and architecture x64
cmake ../ -G "Visual Studio 16 2019" -A x64 -DDESTDIR="D:/work/Projects/GalaxySlicerNeo_deps" -DCMAKE_BUILD_TYPE=Release
msbuild /m ALL_BUILD.vcxproj

cd D:/work/Projects/GalaxySlicerNeo_deps

echo Start deleting unnecessary files...

:: delete all unnecessary data
powershell -command "Remove-Item 'D:/BambuStudio/deps/build' -Recurse -Force"

echo Deletion of unnecessary files completed...

:: create folder for python
mkdir python
cd python

echo Downloading Python...

:: download python zip
curl -o D:/work/Projects/GalaxySlicerNeo_deps/python/python_embed.zip https://www.python.org/ftp/python/3.12.6/python-3.12.6-embed-amd64.zip

:: expand python zip
powershell -command "Expand-Archive -Path 'D:/work/Projects/GalaxySlicerNeo_deps/python/python_embed.zip' -DestinationPath 'D:/work/Projects/GalaxySlicerNeo_deps/python'"

:: remove python zip
powershell -command "Remove-Item 'D:/work/Projects/GalaxySlicerNeo_deps/python/python_embed.zip'"

PAUSE