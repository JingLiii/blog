# JavaScript基本原理:模型和在线缓存

> 原文链接: [JavaScript engine fundamentals:Shapes and line Cahes](https://mathiasbynens.be/notes/shapes-ics)

  这篇文章描述了一些在js引擎中通用的关键点, 并不只是V8, 这个引擎的作者(Benedikt和Mathias)开发的. 作为一名JavaScript的开发者, 需要较深的理解JavaScript引擎是如何工作的, 那可以帮助你更改的冲原理层面提高你代码的性能.

## JavaScript 引擎管道

  这是你写出所有JS代码的开始. JS引擎会格式化你的代码, 并他们转成抽象语法树(AST).基于这个AST,解析器能够开始做他的事情, 开始产生字节码. 完美, 就在那一刻, 引擎开始真正的运行JS代码.

  ![图片](https://mathiasbynens.be/_img/js-engines/js-engine-pipeline.svg)

  为了能让他跑的更快,这些字节码能够和压缩后的数据一起发送给优化编译器, 这些优化编译器能够根据基于压缩后的代码, 做出某些确认的假设. 然后产生优化程度更高的代码.

  如果某些假设是不正确的, 那么优化编译器会自动去优化, 并返回解释器. (TODO: 不太理解退回到解释器, 是退回成初识的代码吗?)

## JavaScript引擎中的解释器和编译器管道

  现在让我们放到到在管道中的一个部分, 那是你真正运行JavaScript的地方. 就是代码被解析和优化的地方. 然后去对比一些在流行的JavaSript引擎中某些不同的地方.

  总的来说, 一个管道包含一个解析器和一个优化编译器 . 解释器会快速并源源不断的产生没有被优化过的字节码. 然后优化编译器会多花点时间.  但是最后产生一些优化程度更高的机器码.

  ![图片](https://mathiasbynens.be/_img/js-engines/interpreter-optimizing-compiler.svg)

  这种常见的管道, 几乎和V8中存在的一样. JavaScript引擎在Chrome和Node中是使用方式如下:

  ![图片](https://mathiasbynens.be/_img/js-engines/interpreter-optimizing-compiler-v8.svg)

  解释器在V8中被称为启动装置(Ignition), 负责生成和执行字节码. 当运行这些字节码的时候, 他会收集分析数据, 这些数据用来加速后面的执行. 当一个函数***hot***的时候. 举个例子, 就是他经常执行的时候, 生成字节码和分析的数据会被通过到TurboFan, 我们的优化编译器, 基于分析的数据会生成更高优化程度的机器码.

  ![图片](https://mathiasbynens.be/_img/js-engines/interpreter-optimizing-compiler-spidermonkey.svg)

  SpiderMonkey,   Mozilla的JavaScript引擎被用在火狐和SpriderNode上面, 他有一点点的不同. 他有两个优化编译器. 解释器首先使用基础的优化器优化, 产生一些优化后的代码. 当代码开始运行的时候, 会产生一些分析的数据, IonMonkey能够基于这些分析的数据产生更高程度的优化代码, 如果推测的优化项是错误的, 那么IconMonkey就会退回到基础优化器产生的代码.

  ![图片](https://mathiasbynens.be/_img/js-engines/interpreter-optimizing-compiler-chakra.svg)

  Chakra, 被用在Edge和Node-ChakraCore中的JavaScript引擎,设置了两个非常小的优化编译器. 解析器使用SimpleJIT开始优化, (JIT表示Just-In-Time compiler实时编译器), 哪里会产生一个优化后的代码. 产生一些分析后的数据, 这个FullJIT能够产生优化程度更高的代码.

  ![图片](https://mathiasbynens.be/_img/js-engines/interpreter-optimizing-compiler-jsc.svg)

  JavaScriptCore(简称JSC), 苹果用在Sarari上的和React Native上的JavaScript引擎. 使用三种不同的优化引擎, 使他变得极致. LLInt(Low-Level Interpreter), 最底层的的解析器, 使用基层优化器优化, 然后使用DFG(Data Flow Graph)优化器, 然后再使用FTL(Faster Than Light)优化器.

  为什么一些引擎比其他的引擎使用的更多的优化编译器. 这是权衡利弊的结果. 一个解析器能够分成快速的产生字节码, 但是字节码通常不够高效. 另一个方面来说, 一个优化编译器需要花费更长的事件, 但是最终可以产生一些更加高效的机器码. 这就是在更加快速的运行代码或者牺牲一些时间, 最后运行一些性能更高的代码. 一些引擎选择增加多个使用不同时间/高性能的优化编译器, 允许他们对于权衡利弊这事进行更高程度的控制, 但是增加了复杂性. 另一个方面, 权衡利弊也和内存的使用有关系. 后面的文章会有介绍.

  我们只是重点讲了在每一个浏览器中, 关于管道中的解析器和优化器的不同. 但基于这些不同, 在更高的层面上, **所有的JavaScript引擎都有相同的特性**: 那就是格式化和一些在管道中解析器和优化器的特性.

## JavaScript的对象模型

  让我们通过放到一些方面的实现来看看JavaScript引擎相同的部分.

  举个例子: JavaScript引擎如何实现的JavaScript的对象模型? 又使用来的哪些技巧来提升访问JavaScript对象的性能. 事实证明: 所有主要引擎的实现都非常相似.

  ECMAScript规范在本质上定义了所有的对象都作为一个字典, 用一些
  key, 去对应一些属性的描述.

  ![图片](https://mathiasbynens.be/_img/js-engines/object-model.svg)

  除了表示本身的`[[value]]`, 这个规范定义了一些其他的属性.

    * `[[writable]]` 确定这个属性是否可以重新分配,
    * `[[Enumerable]]` 确定了这个属性能否在`for-in`循环中展示,
    * 和`[[Configurable]]` 确定了这个属性能否被删除.

  这两个中括号(double square brackets)的表示, 看起来非常有趣, 这是规范表示不能直接保留的JavaScript属性. 通过使用JavaScript中的`Object.getOwnPropertyDesriptor`API, 你仍然可以任何给定的对象上面属性的描述.

  ```js
  const obj = {a:1}
  Object.getOwnPropertyDescriptor(obj, 'a')
  // {value: 1, writable: true, enumerable: true, configurable: true}
  ```

  好了, JavaScript就是这么定义对象的. 但是对于数组又是如何定义的呢?

  你一定能够想到, 数组作为一个特殊的类型的对象. 其中一个区别就是数组对于数组的索引, 有特殊的处理. ESMA规范规定 ***数组 索引*** 是一个特殊的术语. 在JS中数组的最大限制为2^23-1个元素. 数组的索引是任何在限制内的有效值, 就是从0到2^23-2的任何整数.

  另一个不同就是数组会有一个特殊的`length`属性.

  ```js
  const array = ['a', 'b']
  array.length  // 2
  array[2] = 'c'
  array.length  // 3
  ```

  在这个例子中, 数组被创建的时候`length`是`2`. 当我们分配另一个元素到索引2的位置上的时候, `length`属性自动被修改了.

  JavaScript定义数组的方式和对象类似. 例如: 所有的属性, 包括数组的索引, 都使用明确的使用字符串表示. 在数组中的第一个元素, 就是存储在属性`'0'`下面.

  ![图片](https://mathiasbynens.be/_img/js-engines/array-1.svg)

  `'length'`属性这是一个不能枚举和删除的属性.

  当一个元素被添加到数组中的时候, JavaScript会自动的更新`length`属性的`[[value]]`属性.

  通常来说, 数组和对象非常相似.

