---
title: 脚本简介 2
date: 2022-01-01
category:
  - 寒蝉游戏引擎
tag:
  - 文档
  - 寒蝉
---
# 脚本简介 2



接下来继续讲脚本的第二部分。

第一部分只是简要介绍了怎么读脚本，一些函数的使用方法并没有细讲。所以这次我们重点讲一讲各种函数如何使用。

我们从基本的应用场景讲起。

首先是构建场景，显示立绘。这是制作小剧场的第一步。

比如我们要构建一个在教室的场景，加载几个角色，我们可以写以下的代码：

```c
	DrawSceneWithMask( "background/gk2", "maskm1", 1, 0, 1300 );
	ModSetLayerFilter(1, 256, "none");
	ModDrawCharacter(1, 1, "sprite/kei1_def_a1_", "0", 160, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 600, FALSE );
```

OK，最终效果大概是先用淡入的方式加载教室，然后加载圭一的立绘。

加载多人的方式也一样，无非是把后两行代码复制几遍，但是要注意立绘不要重叠，水平位置一定要错开。

```c#
	ModSetLayerFilter(1, 256, "none");
	ModDrawCharacter(1, 1, "sprite/kei1_def_a1_", "0", 160, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 600, FALSE );
	ModSetLayerFilter(2, 256, "none");
	ModDrawCharacter(2, 1, "sprite/re1a_def_a1_", "0", -160, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 600, TRUE );
```

此处要注意，不要把多个角色设置到同一图层，一个图层只能有一名角色。

把前几个人的最后一个参数设置为FALSE，最后一个人的参数设置为TRUE，即可实现多人同时出现的效果。（依次出现就全设置为TRUE）。

OK，接下来我们让角色说话。

```c#
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#5ec69a>魅音</color>", NULL, "<color=#5ec69a>魅音</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"来测试一下，", Line_WaitForInput);
	OutputLine(NULL, "",
		   NULL, "开始吧。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
```

这样就实现了让角色说话的效果，而且说完后会自动清屏。

这里说了两句话，而且以用户输出为间隔。那么单句怎么写？

```c#
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#5ec69a>魅音</color>", NULL, "<color=#5ec69a>魅音</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"开始吧。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
```

这样就可以输出一句话。三句、四句如何输出？是一样的。

```c#
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#5ec69a>魅音</color>", NULL, "<color=#5ec69a>魅音</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"来测试一下，", Line_WaitForInput);
	OutputLine(NULL, "",
		   NULL, "来测试一下，", Line_WaitForInput);		   
	OutputLine(NULL, "",
		   NULL, "开始吧。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
```

这样就说了三句话，其余的同理。只要注意最后一句是GetGlobalFlag(GLinemodeSp)，而其它的是Line_WaitForInput即可。

当然也不必这么死板。如果我们只在GADV模式下制作，可以把最后一个语句换成ClearMessage();

在说话过程中显示新角色，往往需要用DisableWindow()让观众的注意力放到立绘上。在写ModDrawCharacter之前加上一句DisableWindow();是个好习惯。

```c#
	DisableWindow();
	ModDrawCharacter(2, 3, "sprite/me1a_warai_a1_", "0", 160, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 200, TRUE );
```

再介绍另一个显示立绘的函数，这个在上一部分中没有提到。

```c#
	ModDrawCharacterWithFiltering(1, 2, "sprite/re2a_warai_a1_", "0", "maskright", 1, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 300, TRUE );
```

这个函数和DrawSceneWithMask函数比较像，可以以特定特效显示立绘，比如从左到右显示等等。一般用在人物出场部分。

说明一下各个参数的作用。1是图层。2是角色嘴型动画文件夹。"sprite/re2a_warai_a1_"是立绘图片位置。"0"是嘴型动画编号。"maskright"是效果。1未知。第一个0是垂直位置，第二个0是水平位置。最后的TRUE是是否允许同时执行多条指令。300是淡入时间。最后一个0是权重。

和ModDrawCharacter的不同之处在于多了"maskright"参数，而且水平位置垂直位置参数的位置有变化，其余部分基本一致。

接下来介绍角色如何换表情。这个非常简单，只需再用一次ModDrawCharacter函数即可。

```c#
	//显示立绘
	ModSetLayerFilter(1, 256, "none");
	ModDrawCharacter(1, 1, "sprite/kei1_def_a1_", "0", 160, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 600, FALSE );
	//换表情
	DisableWindow();
	ModDrawCharacter(1, 1, "sprite/kei1_komaru_a1_", "0", 160, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 600, FALSE );
```

无非是把显示立绘的函数复制一遍，然后改下立绘文件。其它参数尽量不要动，除非是为了一些特殊演出。尤其是权重不要动，否则可能造成其它角色立绘消失的bug。

想让某角色消失，可以用FadeBustshot函数。

```c#
	FadeBustshot( 5, FALSE, 0, 0, 0, 0, 300, TRUE );
```

其中5是图层，300是淡出时间。

DrawScene函数可以绘制场景。绘制新场景时原有的立绘都会消失。所以当立绘太多时，可以用DrawScene函数快速消除立绘。

```c#
	DrawScene("gk2", 1000);
	加载了很多立绘……
	……
	……
	
	DrawScene("gk2", 400);//重新加载场景，消除所有立绘
```

接下来讲另一个比较重要的函数——CallScript()  这个函数可以调用一些已经写好的演出效果，比如滴血演出，转场演出等等。

打开脚本文件夹，会看到一些@xxx.txt。这些txt便是写好的演出脚本，可以用CallScript函数调用。

比如滴血特效

```c#
	CallScript("&toketu");
```

当然也可以自己撰写演出脚本来调用。

总之，写好的演出脚本类似于c语言中的函数，可以随时用CallScript调用。

讲完这些就可以写一些简单的场景了，下一部分讲如何上手写脚本。