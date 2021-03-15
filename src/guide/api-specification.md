# API 规范

这是 `i-hooks` 的 API 规范文档。

## 返回值

### 无输出

允许 Hooks 无输出，一般常见于生命周期类 Hooks。

```typescript
useEffect(() => {})
```

### value 型

Hooks 输出仅有一个值。

```typescript
const documentVisibility = useDomcumentVisibility()
```

### value setValue 型

输出类型为 value 和 setValue 类型，结构为 `[value, setValue]` 的元组。

```typescript
const [state, setState] = useLocalStorage(...)
```

### value actions 型

输出值为单 value 与多 actions 类型的，结构为 `[value, actions]` 的元组。

```typescript
const [current, { inc, dec, set, reset }] = useCounter(...)
```

### values 型

输出值为多 value 类型的，结构为一个对象。

```typescript

const { text, left, right, ...rest} = useTextSelection()
```

### values actions 型

输出值为多 value 与 多 actions 类型的，结构为一个对象。

```typescript
const { data, error, loading, run } = useRequest(...)
```

## 参数

原则上不允许超过两个参数。

### 无参数

允许 Hooks 无参数。

```typescript
const documentVisibility = useDomcumentVisibility()
```

### 单输入

单参数无论是否必填直接输入。

```typescript
const size = useSize(dom)
```

### 多必选参数

必选参数小于 2 个，应平级输入。

```typescript
const ref = useKeyPress(keyFilter, eventHanlder)
```

如果多于 2 个，应以对象形式输入。

### 多非必选参数

多非必选参数以对象形式输入。

```typescript
const result = useDrop({onText?, onFiles?, onURI?, onDOM?})

const result = useRequest(service, {
  manual?,
  initialData?,
  onSuccess?,
})
```

### 必选参数 + 非必选参数

必选参数在前，非必选参数在后

```typescript
const result = useTextSelection(items, defaultSelected?)
```