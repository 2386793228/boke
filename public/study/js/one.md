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
