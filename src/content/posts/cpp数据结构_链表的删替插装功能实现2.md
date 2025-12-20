---
title: C++数据结构-单链表的删替插装功能实现2【7】
description: C++指针与结构体的出生操作
published: 2024-10-12 11:26:02
tags: [C++, 数据结构]                             
category: 技能 
slug: "97461e86"
---

# 链表的基本功能
> 水激石则鸣，人激志则宏。——秋瑾


1 . 基于上次写的学生管理链表，我做了一定的修改，把结构体的名称和数据域的名称修改了所以会和上次的不一样。
2 . 这次我们来继续完善链表中欠缺的功能，比如：`替换`，`插入`，`删除`，`封装`等……
3 .若搞不清代码，可参考上期的博客：[C++数据结构_单链表的实例剖析与应用1【6】](https://www.almango.cn/2024/10/05/Cpp%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84_%E5%8D%95%E9%93%BE%E8%A1%A8%E7%9A%84%E5%89%96%E6%9E%90%E5%BA%94%E7%94%A8/)

## 替换函数

### 分析
1 . 替换功能还是比较简单的。
>2 .开始我是想到了两种方法，一种是将整个节点替换成新的，一种是将节点的中的数据域换成新的。但目前只实践了第二种方法，个人觉得还是很直白易懂的，第一种方法也可以用，但需要先使用delete删除实例化的节点，在重新赋值，
>
3 . 这里说一下整个实践过程：首先是找到这个要替换的节点，可以以数据域中的某一个数据为参照物，使用while循环来查找匹配，当匹配到了，就直接给该节点的数据域赋一个新值，还有一种情况，就是当头节点就是要被替换的节点，这种就直接使用if判断一下，是则直接替换头节点的数据域。
4 . 下面的图片应该会更加直白，这就相当于直接换了一个节点的数据域嘛。

![](http://testingcf.jsdelivr.net/gh/Almango/Blog_imgbed@main/post/post_cpp7_1.png)

### 代码实现与解析
1 . 多说无益，直接上代码。

2 . 创建一个函数`ReplaceLinkNode()`，`oidName`为要被替换节点的参照物，`newAge`和`newName`为要替换的新值。

3 . 使用`if判断一下头节点是不是要替换的节点`。如果是，则直接`直接将指针指向头节点的数据域`，并赋予新的值替换掉，如果不是，则`从头节点开始循环`查找，直到找到为止并替换。

4 . 这里存在一个`新的可能性`：就是当链表不存在要找的节点参照物。这种情况都是在循环到达最后一个节点的时候发生的，我们只需要写个判断if(FindOut->Pointer_Next == nullptr)，意思是访问最后一个节点的指针域是否为nullptr，是则输出“不存在目标”。

5 . 由于while的条件是`FindOut->Person_Name != oidName`，当循环结束只会有两种结果，一种是已经匹配到目标，一种是找不到目标，所以可以直接在while外面给当前的指针空间赋值。
```cpp
void ReplaceLinkNode(string oidName, int newAge, string newName)
{
    // LinkNodeBaseStruct * NewLinkNode = CreatLinkNode(newAge,newName);
    if (HeadNode->Person_Name == oidName)
    {
        // LinkNodeBaseStruct *TempPointer = HeadNode -> Pointer_Next;
        HeadNode->Person_Age = newAge;
        HeadNode->Person_Name = newName;
        //	HeadNode -> Pointer_Next = TempPointer;
    }
    else
    {
        LinkNodeBaseStruct *FindOut = HeadNode;
        while (FindOut->Person_Name != oidName && FindOut != nullptr)
        {
            FindOut = FindOut->Pointer_Next;
            if (FindOut->Pointer_Next == nullptr)
            {
                cout << "Error: Not Found 没有找到要替换的目标" << endl;
                break;
            }
        }
        FindOut->Person_Age = newAge;
        FindOut->Person_Name = newName;
    }
}
```
5 . 以上是替换节点的操作，也不能完全说是替换节点吧，只是把数据域替换了。



## 插入函数


### 分析
1 . 这里我会实现一个往指定链表节点后面插入新的节点的功能（方法）
2 . 注意了，是往指定节点的`后面`插入新节点。
3 . 实现方法也很简单：只要通过While循环来查找指定节点，再插入新的节点，把指定节点的指针域赋值给新节点即可，这样就完美衔接了整个链表。

![](http://testingcf.jsdelivr.net/gh/Almango/Blog_imgbed@main/post/post_cpp7_2.png)

### 代码实现与解析

1 . 代码十分简短。
2 . 首先我们需要设置好形参，`target`为要指定参照节点，`Person_Age`和`Person_Name`为要插入的节点数据域内容。
3 . 调用`CreatNode方法`来创建一个节点。
4 . 设置循环，直到找到指定的参照节点才停下来，当循环结束后也就说明找到了参照节点，当然了，如果不存在指定参照节点，则会通过判断来终止循环。
5 . 此时的指针`已经指向了参照节点`，这时我们需要先将该参照节点的指针域保存到一个临时变量中，再将该参照节点的指针域修改指向新的链表，最后把临时变量赋值给新节点的指针域，这样就完美衔接了整个链表。

```c++
void InsertLinkNode(string target, int Person_Age, string Person_Name)
{
	LinkNodeBaseStruct *NewLinkNode = CreatNode(Person_Age, Person_Name);
	LinkNodeBaseStruct *FindOut = HeadNode;
	while (FindOut->Person_Name != target)
	{
		FindOut = FindOut->Pointer_Next;
		if (FindOut->Pointer_Next == nullptr && FindOut->Person_Name != target)
		{
			cout << "Error: Not Found 没有找到要操作的目标参照物" << endl;
			break;
		}
	}
	LinkNodeBaseStruct *tempnode = FindOut->Pointer_Next;
	NewLinkNode->Pointer_Next = tempnode;
	FindOut->Pointer_Next = NewLinkNode;
}
```

6 . 这样，便实现了一个插入节点的功能，当然也可以以此类推实现一个在某个节点的`前面插入节点`的功能。

## 删除指定节点函数
> 这里讲的是`删除指定的节点`。
### 分析

1 . 删除节点的原理很简单，但对于我来说，操作起来会有点麻烦。
2 . 实现原理是通过循环来查找要删除的节点，将要删除的上一个节点的指针域重新赋值为要删除节点的下一个节点，也就是说将该节点的两端切断，最后删除。另外，删除指定节点需要注意一种情况，就是当头节点为要删除的节点，这个时候需要将头节点重新赋值为头节点的指针域，相当于头节点被第二个节点覆盖了，第二个节点成为了头节点。

![](http://testingcf.jsdelivr.net/gh/Almango/Blog_imgbed@main/post/post_cpp7_3.png)

### 代码实现与解析

1 . 代码的实现这里我就不过多分析了，该说的，上面基本上已经提到了。
2 . 说实话，这代码是我无意中摸索出来的，这指针已经把我头都搞大了。

```C++
void DeleteLinkNode(string target_name)
{
	LinkNodeBaseStruct *Pointer = HeadNode;
	if (Pointer != nullptr && Pointer->Person_Name == target_name)
	{
		HeadNode = Pointer->Pointer_Next;
        delete Pointer;
	}
	else
	{
		while (Pointer->Pointer_Next->Person_Name != target_name)
		{
			Pointer = Pointer->Pointer_Next;
		}
		LinkNodeBaseStruct *temp = Pointer->Pointer_Next->Pointer_Next;
		delete Pointer->Pointer_Next;
		Pointer->Pointer_Next = temp;
	}
}
```

## 封装链表

### 分析

1 . 当我们想使用链表来实现某一个功能的时候，只需要直接通过调用几个基本功能即可，例如：添加节点`AppendLinkNode("张三", 16)`。但是，如果我们要使用链表去实现多种事件的时候，例如：将`一班的学生信息和二班的学生信息分开`存储，当前的链表肯定是不支持一表多用的。
2 . 这个时候就需要使用`class类来封装`起来，之后当我们就可以`创建多个链表对象`，每个链表对象都可以分门别类的存储不同的数据。
3 . 这里可以在class中分别用private来封装结构体,头节点，创建节点函数。public来封装各个功能函数。
4 . 这样，我们就可以通过创建对象来分开使用链表空间。

### 代码实现

> 下面是整个单链表及其已实现的基本功能

```cpp
#include <iostream>
#include <string.h>

using namespace std;
// using namespace LinkNode;

class LinkNode
{
private:
	struct LinkNodeBaseStruct
	{
		int Person_Age;
		string Person_Name;
		LinkNodeBaseStruct *Pointer_Next;
	};

	LinkNodeBaseStruct *HeadNode = NULL;

	LinkNodeBaseStruct *CreatNode(int age, string name) // 仅创建一个链表节点，但不插入到链表中
	{
		LinkNodeBaseStruct *p1 = new LinkNodeBaseStruct;
		p1->Person_Age = age;
		p1->Person_Name = name;
		p1->Pointer_Next = nullptr;
		// cout << p1 -> Person_Age << p1 -> Person_Name << endl;
		return p1;
	}

public:
	void AppendNodeToLinkNode(int Person_Age, string Person_Name)
	{
		LinkNodeBaseStruct *NewLinkNode = CreatNode(Person_Age, Person_Name);
		if (HeadNode == NULL)
		{
			HeadNode = NewLinkNode;
		}
		else
		{
			LinkNodeBaseStruct *PointerToNext = HeadNode;
			while (PointerToNext->Pointer_Next != nullptr)
			{
				PointerToNext = PointerToNext->Pointer_Next;
			}
			PointerToNext->Pointer_Next = NewLinkNode; // 将新节点连接到链表的尾部
		}
		// cout << HeadNode -> Person_Age << endl;
	}
	void ReplaceLinkNode(string oidName, int newAge, string newName)
	{
		// LinkNodeBaseStruct * NewLinkNode = CreatLinkNode(newAge,newName);
		if (HeadNode->Person_Name == oidName)
		{
			// LinkNodeBaseStruct *TempPointer = HeadNode -> Pointer_Next;
			HeadNode->Person_Age = newAge;
			HeadNode->Person_Name = newName;
			//	HeadNode -> Pointer_Next = TempPointer;
		}
		else
		{
			LinkNodeBaseStruct *FindOut = HeadNode;
			while (FindOut->Person_Name != oidName && FindOut != nullptr)
			{
				FindOut = FindOut->Pointer_Next;
				if (FindOut->Pointer_Next == nullptr)
				{
					cout << "Error: Not Found 没有找到要替换的目标" << endl;
					break;
				}
			}
			FindOut->Person_Age = newAge;
			FindOut->Person_Name = newName;
		}
	}
	void InsertLinkNode(string target, int Person_Age, string Person_Name)
	{
		LinkNodeBaseStruct *NewLinkNode = CreatNode(Person_Age, Person_Name);
		LinkNodeBaseStruct *FindOut = HeadNode;
		while (FindOut->Person_Name != target)
		{
			FindOut = FindOut->Pointer_Next;
			if (FindOut->Pointer_Next == nullptr && FindOut->Person_Name != target)
			{
				cout << "Error: Not Found 没有找到要操作的目标参照物" << endl;
				break;
			}
		}
		LinkNodeBaseStruct *tempnode = FindOut->Pointer_Next;
		NewLinkNode->Pointer_Next = tempnode;
		FindOut->Pointer_Next = NewLinkNode;
	}
	void DeleteLinkNode(string target_name)
	{
		LinkNodeBaseStruct *Pointer = HeadNode;
		if (Pointer != nullptr && Pointer->Person_Name == target_name)
		{
			HeadNode = Pointer->Pointer_Next;
			delete Pointer;
		}
		else
		{
			while (Pointer->Pointer_Next->Person_Name != target_name)
			{
				Pointer = Pointer -> Pointer_Next;
			}
			LinkNodeBaseStruct *temp = Pointer->Pointer_Next -> Pointer_Next;
			delete Pointer->Pointer_Next;
			Pointer -> Pointer_Next = temp;
		}
	}
	void PrintLinkNode()
	{
		LinkNodeBaseStruct *Start = HeadNode;
		while (Start != nullptr)
		{
			cout << Start->Person_Name << "，" << Start->Person_Age << "岁" << endl;
			Start = Start->Pointer_Next;
		}
	}
};
int main()
{
	LinkNode L;
	L.AppendNodeToLinkNode(28, "张三");  // 追加
	L.AppendNodeToLinkNode(15, "李四");  // 追加
	L.AppendNodeToLinkNode(18, "王五");  // 追加
	L.AppendNodeToLinkNode(21, "赵六");  // 追加
	L.DeleteLinkNode("王五");   // 删除

	L.PrintLinkNode();
}
```

**运行结果**：

```bash
张三，28岁
马牛逼，10岁
赵六，21岁
```