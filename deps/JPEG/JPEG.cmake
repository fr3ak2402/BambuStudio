if(CMAKE_SYSTEM_NAME STREQUAL "Linux")
    if (JPEG_VERSION STREQUAL "6")
        message("Using Jpeg Lib 62")
        set(jpeg_flag "")
    elseif (JPEG_VERSION STREQUAL "7")
        message("Using Jpeg Lib 70")
        set(jpeg_flag "-DWITH_JPEG7=ON")
    else ()
        message("Using Jpeg Lib 80")
        set(jpeg_flag "-DWITH_JPEG8=ON")
    endif ()
endif()

galaxyslicerneo_add_cmake_project(JPEG
    URL https://github.com/libjpeg-turbo/libjpeg-turbo/archive/refs/tags/3.0.4.zip
    URL_HASH SHA256=0c58853494f31a65329e567569d8614f35a74c1251bdcca10bb3d01689b35035
    DEPENDS ${ZLIB_PKG}
    CMAKE_ARGS
        -DENABLE_SHARED=OFF
        -DENABLE_STATIC=ON
        ${jpeg_flag}
)
