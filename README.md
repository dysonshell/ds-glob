# ds-glob
find {APP_ROOT}/dsc/some_module first, then {APP_ROOT}/node_modules/@dsc/some_module

[dysonshell](https://www.npmjs.com/package/dysonshell) 框架中约定 `require('dsc/abc')` 会先查找 `${APP_ROOT}/dsc/abc` 再查找 `${APP_ROOT}/node_module/@dsc/abc` 因此达到能将 `dsc/abc` 目录直接打包发布的目的。此模块用于代替 glob 来使用，`dsGlob('dsc/abc')` 即会按前述规则查找文件。

## License
MIT
