# vcsass 遇到的其他零碎地方

## 顶级路由实现

* 接触element中的`NavMenu`组件实现
* 加入`router`指令, 使用`vue-router`模式
* '/src/vue_expand/view/home/index.vue'作为类似的顶级组件
* 其中引入了`top-nav`作为其中`<router-view></router-view>`的路由跳转
* `:index`作为其要跳转的地址

### 备注: 顶级路由的方式修改

* 因为加入了二级菜单页, 更改为点击事件的跳转

## keyboard.js中引入`autobind-decorator`

* autobind-decorator: npm包: 我理解的是自动绑定this

## 样式绑定问题

* 在`<style>`样式中, 添加module关键字
* 在文件中 使用`$style`来表示不同的样式
* 我认为这种写法有些麻烦, 是可以更改和优化的.
