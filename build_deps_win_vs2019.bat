@echo off

:: set console parameters
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvars64.bat"

echo create folders for the compiling process

:: create folders for the compiling process
cd deps
mkdir build
cd build

echo start compiling...

:: compile dependencies -> VS2019 and architecture x64
cmake ../ -G "Visual Studio 16 2019" -A x64 -DDESTDIR="D:/work/Projects/GalaxySlicerNeo_deps" -DCMAKE_BUILD_TYPE=Release
msbuild /m ALL_BUILD.vcxproj

cd D:/work/Projects/GalaxySlicerNeo_deps

echo Start deleting unnecessary files...

:: delete all unnecessary data
powershell -command "Remove-Item 'D:/BambuStudio/deps/build' -Recurse -Force"

echo Deletion of unnecessary files completed...

:: create folder for pkg-config
mkdir pkg-config

echo Start downloading pkg-config files...

:: download pkg-config zip
powershell -Command "Invoke-WebRequest https://github.com/fr3ak2402/GalaxySlicer_deps/releases/download/September_23/pkg-config-lite-0.28.1.zip -OutFile D:/work/Projects/GalaxySlicerNeo_deps/pkg-config.zip"

:: expand pkg-config zip
powershell -command "Expand-Archive -Path 'D:/work/Projects/GalaxySlicerNeo_deps/pkg-config.zip' -DestinationPath 'D:/work/Projects/GalaxySlicerNeo_deps/pkg-config'"

:: remove pkg-config zip
powershell -command "Remove-Item 'D:/work/Projects/GalaxySlicerNeo_deps/pkg-config.zip'"

::copy pkg-config.exe to deps bin folder
powershell -command "Copy-Item 'D:\work\Projects\GalaxySlicerNeo_deps\pkg-config\bin\pkg-config.exe' -Destination 'D:\work\Projects\GalaxySlicerNeo_deps\usr\local\bin'"

::copy pkg-config files to deps share folder
powershell -command "Copy-Item -Path 'D:\work\Projects\GalaxySlicerNeo_deps\pkg-config\share\aclocal' -Destination 'D:\work\Projects\GalaxySlicerNeo_deps\usr\local\share' -Recurse"

:: remove pkg-config folder
powershell -command "Remove-Item 'D:/work/Projects/GalaxySlicerNeo_deps/pkg-config' -Recurse"

:: create folder for python
mkdir python
cd python

echo Downloading Python...

:: download python zip
curl -o D:/work/Projects/GalaxySlicerNeo_deps/python/python_embed.zip https://www.python.org/ftp/python/3.13.1/python-3.13.1-embed-amd64.zip

:: expand python zip
powershell -command "Expand-Archive -Path 'D:/work/Projects/GalaxySlicerNeo_deps/python/python_embed.zip' -DestinationPath 'D:/work/Projects/GalaxySlicerNeo_deps/python'"

:: remove python zip
powershell -command "Remove-Item 'D:/work/Projects/GalaxySlicerNeo_deps/python/python_embed.zip'"

PAUSE