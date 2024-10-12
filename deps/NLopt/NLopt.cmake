galaxyslicerneo_add_cmake_project(NLopt
  URL "https://github.com/stevengj/nlopt/archive/v2.8.0.tar.gz"
  URL_HASH SHA256=e02a4956a69d323775d79fdaec7ba7a23ed912c7d45e439bc933d991ea3193fd
  CMAKE_ARGS
    -DNLOPT_PYTHON:BOOL=OFF
    -DNLOPT_OCTAVE:BOOL=OFF
    -DNLOPT_MATLAB:BOOL=OFF
    -DNLOPT_GUILE:BOOL=OFF
    -DNLOPT_SWIG:BOOL=OFF
    -DNLOPT_TESTS:BOOL=OFF
)

if (MSVC)
    add_debug_dep(dep_NLopt)
endif ()
