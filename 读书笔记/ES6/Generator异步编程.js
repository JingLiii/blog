// step1(function (value1) {
//   step2(value1, function (value2) {
//     step3(value2, function (value3) {
//       step4(value3, function (value4) {
//         // Do something whith value4
//       })
//     })
//   })
// })

// Promise.resolve(step1)
// .then(step2)
// .then(step3)
// .then(step4)
// .then(function (value4) {
//   // Do something whith value4
// }, function (error) {
//   // Handle error from step1 through step4
// })

// function * loadingRunningTask(value1) {
//   try {
//     var value2 = yield step1(value1)
//     var value3 = yield step2(value2)
//     var value4 = yield step3(value3)
//     var value5 = yield step1(value4)
//     // Do something with value4
//   } catch(e) {
//     // Handle any error from step1 through 4
//   }
// }


// scheduler(loadingRunningTask(initialValue));

// function scheduler(task) {
//   var taskObj = task.next(task.value)
//   // 如果Generator函数未结束
//   if (!taskObj.done) {
//     task.value = taskObj.value
//     scheduler(task)
//   }
// }

// // 可以依次执行每一个异步任务
// let steps = [step1Func, step2Func, step3Func]

// function * inerateSteps(steps) {
//   for( var i =0 ; i < steps.length; i++) {
//     var step = steps[i]
//     yield step()
//   }
// }

// // 每一个jop中包含多个step
// let jobs = [job1, job2, job3]
// function * iterateJops(job) {
//   for (var i = 0; i < jobs.length; i++) {
//     var job = jobs[i]
//     yield * inerateSteps(jop.steps)
//   }
// }

// // 利用for...of一次性循环玩所有任务的所有步骤
// for (var step of iterateJops(jobs)) {
//   console.log(step.id)
// }

// // for...of 本质上是一个while循环, 所以上面代码执行的下面的逻辑
// var it = iterateJops(jobs)
// var res = it.next()
// while (!res.done) {
//   var result = res.value
//   res = it.next()
// }






// // function * numbers() {
// //   let file = new FileReader('numbers. txt')
// //   try {
// //     while (!file.eof) {
// //       yield parseInt(file.readLine(), 10)
// //     }
// //   } finally {
// //     file.close()
// //   }
// // }


// // function * main() {
// //   debugger
// //   var result = yield request('http://some.url')
// //   debugger
// //   var resp = JSON.parse(result)
// //   debugger
// //   console.log(resp.value)
// //   debugger
// // }

// // function request(url) {
// //   debugger
// //   makeAjaxCall(url, function (resp) {
// //     debugger
// //     // 这里就通过next传参的方式, 给yield返回了我们需要的结果值
// //     it.next(resp)
// //   })
// // }

// // var it = main()
// // debugger
// // it.next()
// // debugger


// // function * loadUI() {
// //   showLoadingScreen()
// //   yield loadUIDataAsynchronously()
// //   hideLoadingScreen()
// // }

// // // 第一次调用返回一个遍历器
// // var gen = loadUI()
// // // 第一次调用next, 显示loading, 并且开始异步加载数据
// // // 加载UI
// // gen.next()
// // // 数据加载完成后, 再次调用一次next方法, 关闭loading
// // // 卸载UI
// // gen.next()
// // // 问题在于: 如何知道数据加载完成


// // function * gen() {
// //   yield 1
// //   return 2
// // }

// // let g = gen()
// // console.log(
// //   g.next().value, // 此处执行完成之后, 保存的上下执行空间
// //   g.next().value, // 此处吊起的话, 再次开始执行
// // )
// // debugger


// // 状态机
// // var ticking = true
// // var clock = function () {
// //   if (ticking) {
// //     console.log('Tick!')
// //   } else {
// //     console.log('Tock')
// //   }
// //   ticking = !ticking
// // }



// // function * gen(x) {
// //   this.a = x
// //   yield this.b = 2
// //   yield this.c = 3
// // }

// // function F(...args) {
// //   return gen.call(gen.prototype, ...args)
// // }
// // var f = F(1)
// // var res
// // debugger
// // res = f.next()
// // res = f.a



// // function * F() {
// //   this.a = 1
// //   yield this.b = 2
// //   yield this.c = 3
// // }

// // debugger
// // var f = F.call(F.prototype)
// // var f1 = F.call(F.prototype)
// // var res
// // res = f.next()
// // res = f.next()
// // res = f.next()
// // f.a = 'aaa' // 给f这个实例添加一个, 但是原型链上面的没有改
// // console.log(F.prototype)
// // res = f.a
// // res = f.b
// // res = f.c
// // debugger


// // function * g() {
// //   this.a = 11
// // }

// // let obj = g()
// // var res = obj.next()
// // var a = obj.a // 没有这个属性
// // debugger



// // function * g() {}

// // g.prototype.hello = function () {
// //   return 'hi'```
// // }
// // let obj = g() // 返回的是遍历器对象

// // var res = obj instanceof g
// // // obj 的 __proto__ 指向了 g 的prototype
// // // 但是不能把g当做构造函数, 因为返回的不是this, 而是遍历器对象
// // debugger



// // let obj = {
// //   * myGenetatorMethod() {
// //     yield 1
// //   }
// // }

// // var g = obj.myGenetatorMethod()
// // var res = g.next()
// // debugger



// //  function Tree(left, label, right) {
// //    this.left = left
// //    this.label = label
// //    this.right = right
// //  }

// //  // 中序遍历函数
// //  function * inorder(t) {
// //    if (t) {
// //      yield * inorder(t.left)
// //      yield t.label
// //      yield * inorder(t.right)
// //    }
// //  }

// //  // 生成二叉树
// //  function make(array) {
// //    // 判断是否为叶子节点
// //    if (array.length === 1) {
// //      return new Tree(null, array[0], null)
// //    } else {
// //      return new Tree(make(array[0]), array[1], make(array[2]))
// //    }
// //  }

// //  let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
// // debugger
// //  var result = []
 
// //  for (let node of inorder(tree)) {
// //    result.push(node)
// //  }
// //  console.log(result)
// //  debugger

//  // yield * iterTree(tree) {
//  //   if (Array.isArray(tree)) {
//  //     for (let i = 0; i < tree.length; i++) {
//  //       yield * iterTree(tree[i])
//  //     }
//  //   } else {
//  //     yield tree
//  //   }
//  // }

//  // const tree = ['a', ['b', 'c'], ['d', 'e']]

//  // for (let x of iterTree(tree)) {
//  //   console.log(x)
//  // }

//  // function * genFuncWithReturn() {
//  //   yield 'a'
//  //   yield 'b'
//  //   return 'The result'
//  // }

//  // function * logReturned(genObj) {
//  //   let result = yield * genObj
//  //   console.log(result)
//  // }

//  // var res = [...logReturned(genFuncWithReturn())]
//  // debugger

//  // function * foo() {
//  //   yield 2
//  //   yield 3
//  //   return 'foo'
//  // }
//  // function * bar() {
//  //   yield 1
//  //   var v = yield * foo()
//  //   console.log("v: " + v)
//  //   yield 4
//  // }
//  // debugger
//  // var it = bar()
//  // var res
//  // res = it.next()
//  // res = it.next()
//  // res = it.next()
//  // res = it.next()
//  // res = it.next()
//  // res = it.next()



//  // function  * gen() {
//  //   yield * ['a', 'b', 'c'] // 数组原生支持遍历器
//  //   yield * 'abc' // 字符串原生支持遍历器
//  // }
//  // for (let value of gen()) {
//  //   console.log(value)
//  // }

//  // var gen = function * () {
//  //   yield 'start'
//  //   return 'end'
//  // }

//  // var out = function * () {
//  //   yield yield * gen()
//  // }
//  // for (var value of out()) {
//  //   console.log(value)
//  // }


//  // function * concat(iter1, iter2) {
//  //   yield * iter1
//  //   yield * iter2
//  // }

//  // function * concat(iter1, iter2) {
//  //   for (let value of iter1) {
//  //     yield value
//  //   }
//  //   for (let value of iter2) {
//  //     yield value
//  //   }
//  // }


//  // let delegaedIterator = (function * () {
//  //   yield 'Hello'
//  //   yield 'Bye'
//  // }())

//  // let delegatingIterator = (function * () {
//  //   yield 'Greeting'
//  //   yield * delegaedIterator
//  //   yield 'Ok, bye'
//  // })

//  // for (let value of delegatingIterator()) {
//  //   console.log(value)
//  // }

//  // function * inner() {
//  //   yield 'hello'
//  // }

//  // function * outer1() {
//  //   yield 'opens'
//  //   yield * inner()
//  //   yield 'close'
//  // }
//  // debugger
//  // var gen = outer1()
//  // var res
//  // res = gen.next()
//  // res = gen.next()
//  // res = gen.next()
//  // res = gen.next()
//  // debugger
//  // // yield * : 在一个generator函数中调用另外一个generator函数
//  // function * foo () {
//  //   yield 'a'
//  //   yield 'b'
//  // }

//  // function * bar() {
//  //   yield 'x'
//  //   yield * foo()

//  //   //  => 
//  //   // yield 'a'
//  //   // yield 'b'

//  //   // =>
//  //   // for (let v of foo()) {
//  //   //   yield v
//  //   // }

//  //   yield 'y'
//  // }

//  // for (let v of bar()) {
//  //   console.log(v)
//  // }



//  // const g = function *(x, y) {
//  //   let reslut = yield x + y
//  //   return reslut
//  // }

//  // const gen = g(1, 2)
//  // debugger
//  // var res = gen.next()

//  // // res = gen.next()

//  // // res = gen.next(1) // next 替换了yield
//  // // let result = 1

//  // // res = gen.throw(new Error('出错了'))
//  // // let result = thorw(new Error('..'))

//  // res = gen.return(2)
//  // // let result = return 2
//  // debugger



//  // function * numbers () {
//  //   yield 1;
//  //   try {
//  //     yield 2;
//  //     yield 3;
//  //   } finally {
//  //     yield 4
//  //     yield 5
//  //   }
//  //   yield 6
//  // }

//  // var g = numbers()
//  // var res
//  // debugger
//  // res = g.next()
//  // debugger
//  // res = g.next()
//  // debugger
//  // res = g.return(7) // 会继续执行finally里面的语句, 一直到执行完了, 才会跳出来
//  // debugger
//  // res = g.next()
//  // debugger
//  // res = g.next()
//  // debugger


//  // function * gen() {
//  //   yield 1
//  //   yield 2
//  //   yield 3
//  // }
//  // debugger
//  // var g = gen()
//  // var res = g.next()
//  // res = g.return('foo')
//  // res = g.next()
//  // debugger



//  // function * gen() {
//  //   yield 1
//  //   console.log('thorwing an exception')
//  //   throw new Error('generator broke')
//  //   yield 2
//  //   yield 3
//  // }

//  // function log(generator) {
//  //   var v
//  //   console.log('starting generator')

//  //   try {
//  //     v = generator.next()
//  //     console.log('第一次运行next方法', v)
//  //   } catch (error) {
//  //     console.log('捕获错误', v)
//  //   }

//  //   try {
//  //     v = generator.next() // 此时报错, 状态还是1, 还状态还没有更新, 也就还没有结束
//  //     // 抛出错误, 内部, 并没有捕获, 这个时候, 停止执行, 
//  //     // 外部捕获这个错误, 并且抛出
//  //     console.log('第二次运行next方法', v)
//  //   } catch (error) {
//  //     console.log('捕获错误', error)
//  //   }

//  //   try {
//  //     v = generator.next()
//  //     console.log('第三次运行next方法', v)
//  //   } catch (error) {
//  //     console.log('捕获错误', error)
//  //   }

//  //   console.log('caller done')
//  // }

//  // log(gen())


//  // function * foo() {
//  //   var x = yield 3
//  //   var y = x.toUpperCase()
//  //   yield y
//  // }

//  // var it = foo()

//  // it.next()

//  // try {
//  //   it.next(42)
//  // } catch (error) {
//  //   console.log(error)
//  // }



//  // // throw 与个g.throw无关
//  // var gen = function * gen() {
//  //   yield console.log('hello')
//  //   yield console.log('world')
//  // }

//  // var g = gen()
//  // g.next()

//  // try {
//  //   throw new Error()
//  // } catch (error) {
//  //   g.next()
//  // }

//  // var gen = function * gen() {
//  //   try {
//  //     yield console.log('a');
//  //   } catch (error) {
//  //     console.log('内部捕获', error)
//  //   }
//  //   yield console.log('b')
//  //   yield console.log('c')
//  // }
//  // debugger
//  // var g = gen()
//  // g.next()
//  // g.throw() // thow被捕获之后, 又自动执行了一遍next

//  // // 只用函数体内部部署了trycatch, throw后, 还是可以继续执行next的
//  // g.next()
//  // g.throw('a') // 捕获一次, 就不能再捕获了


//  // var g = function * () {
//  //   debugger
//  //   while(true) {
//  //     yield
//  //     // try {
//  //     //   yield
//  //     // } catch (e) {
//  //     //   debugger
//  //     //   if (e != 'a') throw e
//  //     //   console.log('内部捕获', e)
//  //     // }
//  //   }
//  // }

//  // var i = g()
//  // debugger
//  // i.next()
//  // try {
//  //   // throw new Error('a')
//  //   // throw new Error('b')
//  //   i.throw('a')
//  //   i.throw('b')
//  // } catch (error) {
//  //   console.log('外部捕获', error)
//  // }

//  // var g = function * () {
//  //   try {
//  //     yield
//  //   } catch (error) {
//  //     console.log('内部捕获', error)
//  //   }
//  // }

//  // debugger
//  // var i = g()
//  // i.next()
//  // i.throw(new Error('出错了'))
//  // try {
//  //   i.throw('a') // 被函数体内部捕获, 直接抛出了
//  //   i.throw('b') // 函数体内部已经捕获过错误了, 所以不会再不会, 抛出了
//  //   i.throw('c') // 这个错误, 就捕获不到了
//  // } catch (error) {
//  //   console.log('外部捕获', error)
//  // }


//  // function * numbers() {
//  //   yield 1
//  //   yield 2
//  //   return 3
//  //   yield 4
//  // }

//  // // 展运算符, Array.from(), 解构赋值, for of 内部调用的都是 遍历器 接口
//  // var res 
//  // res = [...numbers()]
//  // debugger
//  // res = Array.from(numbers())
//  // debugger
//  // let [x, y] = numbers()
//  // debugger
//  // for (let n of numbers()) {
//  //   console.log(n)
//  // }
//  // debugger

//  // 为原生object对象, 添加遍历接口
//  // function * objectEntries() {
//  //   let propKeys = Object.keys(this)
//  //   for (let propKey of propKeys) {
//  //     yield [propKey, this[propKey]]
//  //   }
//  // }

//  // let jane = { first: 'Jane', last: 'Doe'}

//  // jane[Symbol.iterator] = objectEntries

//  // for (let [key, value] of jane) {
//  //   console.log(`${key}: ${value}`)
//  // }



//  // function * fibonacci() {
//  //   let [prev, curr] = [0, 1]
//  //   for(;;) {
//  //     yield curr;
//  //     [prev, curr] = [curr, prev + curr]
//  //   }
//  // }

//  // for (let n of fibonacci()) {
//  //   if (n > 1000) break
//  //   console.log(n)
//  // }

//  // function * foo() {
//  //   yield 1;
//  //   yield 2
//  //   yield 3
//  //   yield 4
//  //   return 5
//  // }

//  // for (let val of foo()) {
//  //   console.log(val)
//  // }

//  // function wrapper(generatorFunction) {
//  //   debugger
//  //   return function aaa (...args) {
//  //     debugger
//  //     let generatorObject = generatorFunction(...args)
//  //     generatorObject.next();
//  //     debugger
//  //     return generatorObject
//  //   }
//  // }


//  // const wrapped = wrapper(function *() {
//  //   console.log('start')
//  //   console.log(`First input: ${yield}`)
//  //   debugger
//  //   return 'DONE'
//  // })

//  // debugger

//  // var res = wrapped()
//  // debugger
//  // var r
//  // r = res.next('sss')
//  // debugger
//  // r = res.next('ss')
//  // debugger

//  // function * dataConsumer() {
//  //   console.log('start')
//  //   yield 'dd'
//  //   console.log(`1. ${yield}`)
//  //   console.log(`2. ${yield}`)
//  //   return 'result'
//  // }

//  // let genObj = dataConsumer()
//  // var res 
//  // debugger
//  // res = genObj.next() // res : dd
//  // debugger
//  // res = genObj.next('a') // res: undefiend, a代表了上一个yield的返回值, 所以不会输出
//  // debugger
//  // res = genObj.next('b')

//  // res = genObj.next('b')
//  // debugger


//  // 通过next注入不同的值, 来让函数体内部进行不同的操作
//  // function * foo(x) {
//  //   var y = 2 * (yield (x+1))
//  //   var z = yield (y / 3)
//  //   return (x + y + z)
//  // }
//  // debugger
//  // var a = foo(5)
//  // var res 
//  // res = a.next()
//  // res = a.next()
//  // res = a.next()

//  // var b = foo(5)
//  // var r
//  // r = b.next()
//  // r = b.next(12) // next 的参数表示上一次yield的返回值
//  // r = b.next(12)

//  // 第一个next用来启动遍历器, 所以不需要参数




//  // yield 没有返回值, 返回的是next的参数

//  // function * f() {
//  //   debugger
//  //   for (var i = 0 ; true; i++) {
//  //     debugger
//  //     var reset = yield i
//  //     debugger
//  //     if (reset) {
//  //       debugger
//  //       i = -1
//  //     }
//  //   }
//  // }

//  // var g = f()
//  // var res 
//  // debugger
//  // res = g.next()
//  // debugger
//  // res = g.next()
//  // debugger
//  // res = g.next(true)
//  // debugger


//  // var myIterable = {}
//  // myIterable[Symbol.iterator] = function *() {
//  //   yield 1
//  //   yield 2
//  //   yield 3
//  // }

//  // // 这个Gentrator函数赋值给 这个对象的 Stymbol.iterator属性
//  // // 那么这个对象, 就有了 迭代的接口 可以被 ... 运算

//  // var res = [...myIterable]
//  // debugger

//  // function * gen() {

//  // }

//  // var g = gen()
//  // debugger
//  // var res = g[Symbol.iterator]() === g
//  // debugger


//  // function * demo () {
//  //   // console.log('Hello' + yield);
//  //   // console.log('Hello' + yield 123);
//  //   console.log(1)
//  //   debugger
//  //   console.log('Hello' + (yield));
//  //   debugger
//  //   console.log(yield 123)
//  //   console.log('Hello' + (yield 123));
//  //   debugger
//  // }

//  // function * demo() {
//  //   debugger
//  //   foo(yield 'a', yield 'b')
//  //   debugger
//  //   function foo(a, b) {
//  //     debugger
//  //     console.log(a)
//  //     console.log(b)
//  //   }
//  //   let input = yield
//  // }


//  // var ff = demo()
//  // debugger
//  // var res = ff.next()
//  // debugger
//  // var res = ff.next()
//  // debugger
//  // var res = ff.next()
//  // debugger



//  // 每一次都去遍历, 然其向下不断执行
//  // var arr = [1, [[2, 3], 4], [5, 6]];

//  // var flat = function* (a) {
//  //   var length = a.length;
//  //   for (var i = 0; i < length; i++) {
//  //     var item = a[i];
//  //     if (typeof item !== 'number') {
//  //       yield* flat(item);
//  //     } else {
//  //       yield item;
//  //     }
//  //   }
//  // };

//  // for (var f of flat(arr)) {
//  //   console.log(f);
//  // }


//  // var arr = [1, [[2, 3], 4], [5, 6]];

//  // var flat = function * (a) {
//  //   for (var i = 0 ; i < arr.length; i++) {
//  //     var item = arr[i]
//  //     if (typeof item !== 'number') {
//  //       yield * flat(item)
//  //     } else {
//  //       yield item
//  //     }
//  //   }
//  // }

//  // for (var f of flat(arr)) {
//  //   console.log(f)
//  // }

//  // yeild, 暂缓执行

//  // function * f() {
//  //   console.log('执行了')
//  // }

//  // // 第一次执行的时候, 只是返回一个生成器
//  // var generator = f()

//  // setTimeout(() => {
//  //   // 只有在调用next函数的时候, 才会执行
//  //   generator.next();
//  // }, 2000);







//  // 概念
//  // function * helloWorldGenerator() {
//  //   yield 'hello'
//  //   yield 'world'
//  //   return 'end'
//  // }

//  // var res;
//  // var hw = helloWorldGenerator();
//  // debugger
//  // res = hw.next()
//  // debugger
//  // res = hw.next()
//  // debugger
//  // res = hw.next()
//  // debugger
//  // res = hw.next()
//  // debugger
//  // res = hw.next()
//  // debugger