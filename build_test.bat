@echo off
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvars64.bat"

cd deps
mkdir build
cd build

cmake ../ -G "Visual Studio 16 2019" -A x64 -DDESTDIR="D:/work/Projects/BambuStudio_dep" -DCMAKE_BUILD_TYPE=Release
msbuild /m ALL_BUILD.vcxproj

PAUSE