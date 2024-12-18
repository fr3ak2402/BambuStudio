find_package(OpenGL QUIET REQUIRED)

galaxyslicerneo_add_cmake_project(TIFF
    URL https://gitlab.com/libtiff/libtiff/-/archive/v4.7.0/libtiff-v4.7.0.zip
    URL_HASH SHA256=6431504a36fd864c8c83c4d0e2e18496e6968b4061d347988e20df04c7bbda96
    DEPENDS ${ZLIB_PKG} ${PNG_PKG} ${JPEG_PKG}
    CMAKE_ARGS
        -Dlzma:BOOL=OFF
        -Dwebp:BOOL=OFF
        -Djbig:BOOL=OFF
        -Dzstd:BOOL=OFF
        -Dpixarlog:BOOL=OFF
)
