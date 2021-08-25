# @zhengxs/composition-api

[![TypeScript](https://img.shields.io/badge/lang-typescript-informational?style=flat-square)](https://www.typescriptlang.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm package](https://img.shields.io/npm/v/@zhengxs/composition-api.svg?style=flat-square)](https://www.npmjs.com/package/@zhengxs/composition-api)
[![npm downloads](https://img.shields.io/npm/dt/@zhengxs/composition-api.svg?style=flat-square)](https://www.npmjs.com/package/@zhengxs/composition-api)
[![npm downloads](https://img.shields.io/npm/dm/@zhengxs/composition-api.svg?style=flat-square)](https://www.npmjs.com/package/@zhengxs/composition-api)
[![Dependency Status](https://img.shields.io/david/zhengxs2018/composition-api)](https://david-dm.org/zhengxs2018/composition-api)
[![DevDependency Status](https://img.shields.io/david/dev/zhengxs2018/composition-api?type=dev)](https://david-dm.org/zhengxs2018/composition-api)
[![License](https://img.shields.io/npm/l/@zhengxs/composition-api.svg?style=flat-square")](#License)

纯 vue2 的 `composition-api` 实现，和 [@vue/composition-api][composition-api] 区别在于不使用 [Proxy][es6-proxy]，理论上只要 vue2 兼容的浏览器都能运行。

[在线演示](https://codesandbox.io/s/sleepy-tree-q77ji)

## 快速开始

### 安装

```shell
$ npm i @zhengxs/composition-api --save
```

### 使用

```js
import CompositionAPI from '@zhengxs/composition-api'

Vue.use(CompositionAPI)
```

## 示例

响应式状态

```js
import { defineComponent, reactive, ref } from '@zhengxs/composition-api'

export default defineComponent({
  setup() {
    // 注意和官方的有区别
    const loading = ref(false)

    const state = reactive({
      msg: 'Vue',
    })

    return {
      loading,
      state,
    }
  },
})
```

生命周期

```js
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeDestroy,
  onDestroyed,
} from '@zhengxs/composition-api'

export default defineComponent({
  setup() {
    onBeforeMount(() => {
      // 挂载前，对应 created
    })

    onMounted(() => {
      // 挂载后，对应 mounted
    })

    onBeforeDestroy(() => {
      // 销毁前，对应 beforeDestroy
    })

    onDestroyed(() => {
      // 销毁后，对应 destroyed
    })
  },
})
```

数据监听

```js
import {
  defineComponent,
  reactive,
  watchEffect,
} from '@zhengxs/composition-api'

export default defineComponent({
  setup() {
    const list = reactive([])

    watchEffect(() => {
      console.log('length:', list.length)
    })

    function addItem() {
      list.push({
        id: Math.random(),
        text: `item ${list.length}`,
      })
    }

    return {
      list,
      addItem,
    }
  },
})
```

## License

- MIT

[composition-api]: https://composition-api.vuejs.org/
[es6-proxy]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
