# Flutter 学习记录

## `my_flutter_app`学习记录

### 安装依赖

* `flutter packages` 代替 `pub`
* flutter packages get

### `flutter package get`卡住

* [Flutter 卡在 package get 的解决办法](https://jimbray.xyz/post/using-flutter-in-china/)
* [flutter packages get command takes a long time to run](https://github.com/flutter/flutter/issues/15162#issuecomment-374588792)
* 然后等了一会, 就好了, 没有往深了看.

### 快速启动

* ios:
  * xcrun instruments -w "iPhone X (12.1)"
  * [从命令行启动Xcode模拟器](https://www.jianshu.com/p/c5ad2e2be367)
* andorid:
  * [mac电脑上命令行启动安卓模拟器](https://juejin.im/post/5bcfe1e7518825779a41fa5e)
  * emulator -list-avds
  * emulator -avd Nexus_5X_API_28

## 语法方法

### 类被当做方法执行??

* 类被当做方法执行的时候, 执行的是那个属性
* widget 类执行的是build函数, ThemeData执行的是什么方法??factory??