// 引入dart提供的方法
import 'dart:async';

// 引入外部包
// import 'package:angular2/angular2.dart';
// 直接引入某个路径
// import 'path/to/my_path/test.dart';

// 变量声明
var name = "this is name";
var year = 1997;
var antennaDiameter = 3.7;
var flybyObjects = ['aaa', 'bbbd', 'ccc', 'dddd'];
var image = {
  'tags': ['tag1', 'tag2'],
  'url': '//path/to/aaa.jpg',
};

int testVariables() {
  print(name);
  print(year);
  print(antennaDiameter);
  print(flybyObjects);
  print(image);
}

Future getAJoke() {
  return new Future.delayed(new Duration(milliseconds: 2000), () {
    // throw new Exception('No joke for you ');
    return 'this is a joke';
  });
}

int controlFlowStatements() {
  if (year >= 2001) {
    print('21st century');
  } else if (year >= 1901) {
    print('20th century');
  }

  for (var object in flybyObjects) {
    print(object);
  }

  for (int month = 1; month <= 12; month++) {
    print(month);
  }

  while(year < 2016) {
    print(year);
    year += 1;
  }
}

// 函数
int fibonacci (int n) {
  if (n == 0 || n == 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}
// 普通注释
/// 文档注释? 还有这种货?
/// 嘿, 一回车, 还挺方便的
/**
 * 还是习惯这种多行注释
 * 
 * 
 */

testAsync () async {
  try {
    String result = await getAJoke();
    print(result);
  } catch (e) {
    print('Error');
  }
}

void main() async {
  // testVariables();
  // controlFlowStatements();
  // var result = fibonacci(20);
  // print(result);
  // flybyObjects.where((name) => name.contains('d')).forEach(print);
  // 如果这里不加await, 会先执行下面的, 再去执行定时器
  // 不太清楚触发机制
  await testAsync();
  print('Another print statement');
  return;
}
