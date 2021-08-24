# @zhengxs/composition-api

[![TypeScript](https://img.shields.io/badge/lang-typescript-informational?style=flat-square)](https://www.typescriptlang.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

纯 vue2 的 `composition-api` 实现，和 [@vue/composition-api][composition-api] 区别在于不使用 [Proxy][es6-proxy]，理论上只要 vue2 兼容的浏览器都能运行。

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

[在线DEMO](https://codesandbox.io/s/sleepy-tree-q77ji)

## 文档

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
      // 挂载前，对应 mounted
    })

    onBeforeDestroy(() => {
      // 挂载前，对应 beforeDestroy
    })

    onDestroyed(() => {
      // 挂载前，对应 destroyed
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
