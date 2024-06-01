# 从ECMAScript规范解读this

[摘抄自git](https://github.com/mqyqingfeng/Blog/issues/7)

当javascript代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)。

对于每个执行上下文，都有三个重要属性

- 变量对象(Variable object, VO)
- 作用域链(Scope chain)
- this

从ECMEScript5规范讲起

[英文版](http://es5.github.io/#x15.1)
[中文版](http://yanhaijing.com/es5/#115)

## 1. Types （类型）

首先是第8章Types

> Types are further subclassified into ECMAScript language types and specification types.

> An ECMAScript language type corresponds to values that are directly manipulated by an ECMAScript programmer using the ECMAScript language. The ECMAScript language types are Undefined, Null, Boolean, String, Number, and Object.

> A specification type corresponds to meta-values that are used within algorithms to describe the semantics of ECMAScript language constructs and ECMAScript language types. The specification types are Reference, List, Completion, Property Descriptor, Property Identifier, Lexical Environment, and Environment Record.

ECMAScript 的类型分为语言类型和规范类型：

语言类型也就是我们开发时候可以直接通过js代码进行操作的，例如Undefined、Null、Boolean、String、Number和Object。（常说的基本类型跟引用类型）

而规范类型相当于 meta-values，是用来用算法描述 ECMAScript 语言结构和 ECMAScript 语言类型的。规范类型包括：Reference, List, Completion, Property Descriptor, Property Identifier, Lexical Environment, 和 Environment Record。

**`我们只需要知道在ECMAScript规范中还有一种只存在于规范中的类型，它们的作用是用来描述语言底层行为逻辑。下面主要讲的就是其中的Reference类型，它与this的指向有着密切的的关联`**

## 2. Reference （参考）

什么是Reference呢？
我们看到8.7章的The Reference Specification Type：

> The Reference type is used to explain the behaviour of such operators as delete, typeof, and the assignment operators.

所以 Reference 类型就是用来解释诸如 delete、typeof 以及赋值等操作行为的。

抄袭尤雨溪大大的话，就是：

> 这里的 Reference 是一个 Specification Type，也就是 “只存在于规范里的抽象类型”。它们是为了更好地描述语言的底层行为逻辑才存在的，但并不存在于实际的 js 代码中。

再来看看这段具体介绍Reference的内容

> A Reference is a resolved name binding.

> A Reference consists of three components, the base value, the referenced name and the Boolean valued strict reference flag.

> The base value is either undefined, an Object, a Boolean, a String, a Number, or an environment record (10.2.1).

> A base value of undefined indicates that the reference could not be resolved to a binding. The referenced name is a String.

主要说明了Reference主要由三部分组成，分别是

- base value
- referenced name
- strict reference

base value 就是属性所在的对象或者就是 EnvironmentRecord，它的值只可能是 undefined, an Object, a Boolean, a String, a Number, or an environment record中的一种

referenced name 就是属性的名称

举个例子：

```javascript
var foo = 1

// 对应的Reference是：
var fooReference = {
  base: EnvironmentRecord,
  name: 'foo',
  strict: false
}
```

再举个例子：

```javascript
var foo = {
  bar: function () {
    return this
  }
}

foo.bar() // foo

// bar对应的Reference是：
var BarReference = {
  base: foo,
  propertyName: 'bar',
  strict: false
}
```

规范中还提供了获取Reference组成部分的方法，比如GetBase和IsPropertyReference。

1. GetBase

   > GetBase(V). Returns the base value component of the reference V.

   返回reference的 base value

2. IsPropertyReference

   > IsPropertyReference(V). Returns true if either the base value is an object or HasPrimitiveBase(V) is true; otherwise returns false.

   简单的理解： 如果 base value 是一个对象，就返回true。

## 3. GetValue

除此之外，紧接着在8.7.1章规范中就讲了一个用于从 Reference 类型获取对应值的方法： GetValue。

```javascript
var foo = 1

var fooReference = {
  base: EnvironmentRecord,
  name: 'foo',
  strict: false
}

GetValue(fooReference) // 1;
```

GetValue 返回对象属性真正的值，但是要注意：

**调用GetValue，返回的将是具体的值，而不再是一个Reference**

## 4. 如何确定this的值

前面讲诉的都是Reference，下面才是重点，为啥要介绍Reference呢？它与this到底有啥关系？

文档的第11.2.3 Function Calls：

这里讲述了当函数调用的时候，如何确定this的取值。

只看第一步、第六步、第七步：

> 1.Let ref be the result of evaluating MemberExpression.

> 6.If Type(ref) is Reference, then

> ```javascript
>   a.If IsPropertyReference(ref) is true, then
> ```

> ```javascript
>       i.Let thisValue be GetBase(ref).
> ```

> ```javascript
>   b.Else, the base of ref is an Environment Record
> ```

> ```javascript
>       i.Let thisValue be the result of calling the ImplicitThisValue concrete method of GetBase(ref).
> ```

> 7.Else, Type(ref) is not Reference.

> ```javascript
>   a. Let thisValue be undefined.
> ```

简单描述一下：

1.计算MemberExpression的结果赋值给ref

2.判断ref 是不是一个Reference类型

```javascript
2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)

2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)

2.3 如果 ref 不是 Reference，那么 this 的值为 undefined
```

## 5. 具体分析

让我们一步一步看：

1. 计算MemberExpression的结果赋值给ref

什么是 MemberExpression? 看规范11.2 Left-Hand-Side Expression：

MemberExpression：

- PrimaryExpression // 原始表达式 可以参见《JavaScript权威指南第四章》
- FunctionExpression // 函数定义表达式
- MemberExpression [ Expression ] // 属性访问表达式
- MemberExpression . IdentifierName // 属性访问表达式
- new MemberExpression Arguments // 对象创建表达式

举个例子

```javascript
function foo() {
  console.log(this)
}

foo() // MemberExpression 是 foo

function foo() {
  return function () {
    console.log(this)
  }
}

foo()() // MemberExpression 是 foo()

var foo = {
  bar: function () {
    return this
  }
}

foo.bar() // MemberExpression 是 foo.bar
```

所以简单理解 MemberExpression 其实就是()左边的部分

2. 判断ref是不是一个 Reference 类型。

关键在于规范如何处理各种 MemberExpression，返回的结果是不是一个 Reference 类型。

```javascript
var value = 1

var foo = {
  value: 2,
  bar: function () {
    return this.value
  }
}

//示例1
console.log(foo.bar())
//示例2
console.log((foo.bar = foo.bar)())
//示例3
console.log((false || foo.bar)())
//示例4
console.log((foo.bar, foo.bar)())
```

### foo.bar()

在示例 1 中， MemberExpression计算的结果是 foo.bar ，那么 foo.bar 是不是一个 Reference 呢？

规范11.2.1中的 Property Accessors，这里展示了一个计算的过程，我们看最后一步：

> Return a value of type Reference whose base value is baseValue and whose referenced name is propertyNameString, and whose strict mode flag is strict.

根据计算我们得知该表达式返回了一个 Reference 类型！

根据之前的内容，我们知道这个值是：

```javascript
var Reference = {
  base: foo,
  name: 'bar',
  strict: false
}
```

接下来按照2.1的判断流程走：

> 2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)

该值是 Reference 类型， 那么IsPropertyReference(ref) 的结果是啥呢？

前面我们已经铺垫了 IsPropertyReference 方法，如果 base value 是一个对象， 结果返回true。

base value 为 foo, 是一个对象， 所以 IsPropertyReference(ref) 结果为 true。

这个时候我们就可以确定 this 的值了：

```javascript
this = GetBase(ref)
```

GetBase 也已经铺垫了，获得 base value 的值，这个例子中就是 foo， 所以 this 的值就是 foo，示例1的结果为 2！

**可以简单的理解为， base value 是一个对象，那么this就返回这个对象**

**`知道了原理，剩下的就很快了`**

### (foo.bar = foo.bar)()

示例2，有赋值操作符，规范11.13.1 Simple Assignment ( = )：

规范中计算的第三步：

> 3.Let rval be GetValue(rref).

因为使用了 GetValue, 所以返回的值不是 Reference 类型，

按照之前2.3的判断逻辑

> 2.3 如果 ref 不是Reference，那么 this 的值为 undefined

this 为undefined， 非严格模式下，this 的值为 undefined 的时候 会隐式转换为 全局对象window，所以这里的this是window，示例2的结果为 1！

### (false || foo.bar)()

示例3， 逻辑与算法，查看规范 11.11 Binary Logical Operators：

规范中计算的第二步：

> 2.Let lval be GetValue(lref).

逻辑与示例2同理

### (foo.bar, foo.bar)()

示例4， 逗号操作符， 查看规范11.14 Comma Operator ( , )

规范中计算的第二步：

> 2.Call GetValue(lref).

逻辑与示例2同理

### 再来个最普遍的情况：

```javascript
function foo() {
  console.log(this)
}

foo()
```

MemberExpression 是 foo, 查看规范 10.3.1 Identifier Resolution，会返回一个 Reference 类型的值：

```javascript
var fooReference = {
  base: EnvironmentRecord,
  name: 'foo',
  strict: false
}
```

接下来进行判断

> 2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)

因为 base value 是 EnvironmentRecord，并不是一个 Object 类型，还记得前面讲过的 base value 的取值可能吗？ 只可能是 undefined, an Object, a Boolean, a String, a Number, 和 an environment record 中的一种。

IsPropertyReference(ref) 的结果为 false，进入下个判断：

> 2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)

查看规范 10.2.1.1.6，ImplicitThisValue 方法的介绍：该函数始终返回 undefined。 所以this的值为undefined
