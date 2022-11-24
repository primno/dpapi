{
  "targets": [
    {
      'target_name': 'dpapi',
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'xcode_settings': { 'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
        'CLANG_CXX_LIBRARY': 'libc++',
        'MACOSX_DEPLOYMENT_TARGET': '10.7',
      },
      'msvs_settings': {
        'VCCLCompilerTool': { 'ExceptionHandling': 1 },
      },
      'version': '0.5.0',
      'sources': [
        'src/main.cpp',
        'src/dpapi_addon.h'
      ],
      'include_dirs': [
        '<!(node -p "require(\'node-addon-api\').include_dir")'
       ],
      'conditions': [
        ['OS=="win"', {
          'sources': [
            'src/dpapi_win.cpp',
          ],
          'libraries': [
              '-lcrypt32.lib'
            ],
        }],
        ['OS not in ["win"]', {
            'sources': [ 'src/dpapi_not_supported.cpp' ]
        }]
      ]
    }
  ]
}
