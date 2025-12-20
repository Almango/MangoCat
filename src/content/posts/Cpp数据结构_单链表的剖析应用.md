---
title: C++数据结构-单链表的实例剖析与应用1【6】
description: C++指针与结构体的出生操作
published: 2024-10-05 12:45:21 #  字符串日期即可，不需要 ISO 格式
tags: [C++, 数据结构] # 添加分类
category: 技能
slug: "79c36as4c"
---


# 单链表
>👍要想写单链表，首先得搞明白链表的概念


**链表**：是一种物理存储单元上`非连续`、`非顺序`的存储结构，数据元素的逻辑顺序是通过链表中的指针链接次序实现的。链表由一系列结点（链表中每一个元素称为结点）组成，结点可以在运行时动态生成。每个结点包括两个部分：一个是存储数据元素的`数据域`，另一个是存储下一个结点地址的`指针域`。 相比于线性表顺序结构，操作复杂。由于不必须按顺序存储，链表在插入的时候可以达到O(1)的复杂度，比另一种线性表顺序表快得多，但是查找一个节点或者访问特定编号的节点则需要O(n)的时间，而线性表和顺序表相应的时间复杂度分别是O(logn)和O(1)。 

**链表节点**：链表节点是链表的单元，分为`头节点`和`子节点`，头节点是链表的第一个节点，子节点是在头节点其后的节点。


![](http://testingcf.jsdelivr.net/gh/Almango/Blog_imgbed@main/photos/post_cpp6_1.png)

> 上面是简易的结构图，虽然丑了些……将就看吧。

## 手搓一个单链表

### 定义结构体

1 . 先定义一个结构体作为链表的结构
2 . 一个链表的节点被分为两个区域，一个是`数据域`（存放数据），一个是`指针域`（用于指向下一个链表节点）
3 . 这里我们在数据域声明两个变量，用于储存学生的名称和年龄。随后是指针域，因为这个指针属于这个结构体，所以指针的类型就是这个结构体。
```cpp
struct StudentLinkNode
{
    int student_age;
    string Student_name;
    StudentLinkNode * PointerToNext;
};
```

### 定义头节点
1 . 此外，我们还需要在全局变量范围下定义一个头节点，这个头节点在整个链表中至关重要，它主要用于标识一个链表，在实现头插法和遍历链表都离不开头节点。

```cpp
StudentLinkNode * HeadNode = nullptr;
```

>**注意**：这里为什么要在全局变量呢？主要是因为如果是在局部变量环境下，当我们想插入一个节点，那么它将只能在这个局部环境下生效。我之前就犯过这个错误：在插入节点方法内定义了传入头节点的形参，导致插入时不生效……

### 创建链表节点

1 . 结构体定义好之后就可以创建节点了
2 . 我们写一个带返回值的函数用来封装，这样可以获取到创建好的节点。
3 . 在函数内实例化一个节点对象，并将指针指向student_age和Student_name来`接收形参传入的年龄和姓名`。另外，指针域PointerToNext接收一个`nullptr`值，以防止野指针导致内存泄漏。
4 . 最后就可以将这个创建好的新节点对象返回出来，后续以便更好的插入到链表中。
```cpp
StudentLinkNode * CreatNodeForStudent(int age, string name)
{
    StudentLinkNode * newnode = new StudentLinkNode;
    newnode -> student_age = age;
    newnode -> Student_name = name;
    newnode -> PointerToNext = nullptr;
    return newnode;
}
```

### 将新节点插入链表（尾插法）

1 . 我们实现了链表节点的创建，现在可以将新节点插入到链表中了。（这里的尾插法虽然说是插入，但其实是追加，至于在某个节点前后插入，这个后面会学到，`暂时先用尾插法演示`）
2 . 其实这个可以照搬上面的创建节点的代码了，形参是一致的，无非是在创建新的节点对象时额外调用了CreatNodeForStudent()函数来传参，那为什么不将创建节点和插入节点合并呢？我的观点其实是为了图个简洁明了。
3 . 紧接其后，我们写一个`if来判断一下头节点是否为空`，如果为空，则`将新节点赋值给头节点`，这个不为空，则`实例化一个指向头节点的指针对象，再用while循环来一步一步往后查找，当一个节点的指针域为空时，则把新节点赋值给这个指针域`，这样不管有没有节点，我们都可以向链表插入新的节点。

```cpp
void InsertNodeForStudent(int age, string name)
{
    StudentLinkNode * newnode = CreatNodeForStudent(age, name);
    if (HeadNode == nullptr)
    {
        HeadNode = newnode;
    }
    else
    {
        StudentLinkNode * IterativeNext = HeadNode;
        while (IterativeNext -> PointerToNext != nullptr)
        {
            IterativeNext = IterativeNext -> PointerToNext;
        }
        IterativeNext -> PointerToNext = newnode;
    }
    cout << newnode -> student_age << endl;
}
```
>**温馨提示**：当链表存在多个节点，而我们要插入新的节点，为什么非得使用循环来查查找空指针域呢？这是因为链表是非连续，非顺序的存储结构，不能像数组那样可以使用下标索引，这也就是为什么链表的搜索效率低。


### 遍历链表

1 . 这一步就非常简单了。
2 . 只需要用到while循环即可。
3 . 解释一下：这个跟上面的循环很相似，先实例化一个指向头节点的指针对象。节点不为空时输出该节点的student_age和student_name。这样一来，`只要节点不为空就会不断迭代输出节点的内容`。

```cpp
void TraversalLinkNode()
{
    StudentLinkNode * TraversalNode = HeadNode;
    while (TraversalNode != nullptr)
    {
        cout << TraversalNode -> student_age << "岁, 姓名：" << TraversalNode -> student_name << endl;
        TraversalNode = TraversalNode -> PointerToNext;
    }   
}
```
>**温馨提示**：这里要注意的是，while的条件和上面的不太一样，当我们要判断一个`节点的指针域`是否为空时，用的是while(IterativeNext -> PointerToNext != nullptr)，当我们要判断一个`节点`是否为空时，用的是while(TraversalNode != nullptr)，这两个是有区别的。

4 . 最后运行一下代码，看看结果：

![](http://testingcf.jsdelivr.net/gh/Almango/Blog_imgbed@main/post/post_cpp6_2.png)

5 . 结果是没什么问题的，到这里也就结束了。
## 总结

1 . 这里我先将代码整理出来，以方便阅读。

```cpp
#include <iostream>
#include <string.h>

using namespace std;

struct StudentLinkNode   // 定义结构体
{
    int student_age;    // 数据域
    string student_name; 
    StudentLinkNode * PointerToNext; // 指针域
};

StudentLinkNode * HeadNode = nullptr;   // 全局变量下的头节点

StudentLinkNode * CreatNodeForStudent(int age, string name)   // 创建节点
{
    StudentLinkNode * newnode = new StudentLinkNode;
    newnode -> student_age = age;
    newnode -> student_name = name;
    newnode -> PointerToNext =nullptr;
    return newnode;
}

void InsertNodeForStudent(int age, string name)   // 插入节点
{ 
    StudentLinkNode * newnode = CreatNodeForStudent(age, name);  // 调用创建节点函数
    if (HeadNode == nullptr)  // 当头节点为空则将新节点赋值给头节点
    {
        HeadNode = newnode;
    }
    else // 当头节点不为空，则循环查找空的指针域，并赋值给空的指针域
    {
        StudentLinkNode * IterativeNext = HeadNode;
        while (IterativeNext -> PointerToNext != nullptr)
        {
            IterativeNext = IterativeNext -> PointerToNext;
        }
        IterativeNext -> PointerToNext = newnode;
    }
}

void TraversalLinkNode()   // 遍历链表
{
    StudentLinkNode * TraversalNode = HeadNode;
    while (TraversalNode != nullptr)
    {
        cout << TraversalNode -> student_age << "岁, 姓名：" << TraversalNode -> student_name << endl;
        TraversalNode = TraversalNode -> PointerToNext;
    }
    
}
int main()
{
    InsertNodeForStudent(18, "Almango");
    InsertNodeForStudent(17, "Boom");
    InsertNodeForStudent(20, "Fun");
    TraversalLinkNode();
}
```

3 . 链表作为一种比较常用的数据结构还是需要我们去掌握的，当然，我第一次学习确实挺困难的，但只要多练习，多去举一反三，链表也是不在话下，不仅如此这对于更加深入的去理解指针也有着很大的帮助。
4 . 这次单链表就到这里，如果不是为了加深记忆，我是真懒得写……
5 . 后面会尝试一下双链表，头插法等功能操作。
