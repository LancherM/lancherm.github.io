---
title: 引擎简介
date: 2022-01-01
math: true
category:
  - 寒蝉游戏引擎
tag:
  - 文档
  - 寒蝉
---
# 引擎简介

这部分会对游戏引擎做整体上的介绍，不会介绍过多细节。

我们主要依靠steam版罪灭篇游戏。此游戏基于游戏引擎unity，编程语言是C#。C#是C语言家族的一员，因此我们需要了解一些C语言基本语法。

打开游戏根目录，可以看到2个文件和1个文件夹

<img src="/img/1.png">

steam_api.dll是steam相关的动态资源库，无用。

HigurashiEp06.exe是游戏主程序。

HigurashiEp06_Data是储存数据的文件夹，非常重要。

双击打开HigurashiEp06_Data，有一堆文件夹和文件。

<img src="/img/2.png">
 
先看文件。

除output_log.txt外，其它文件大多是引擎的资源库，比如UI之类的。我们不修改引擎本身，所以尽情无视这些文件。

Output_log.txt是日志文件，游戏运行过程中产生的错误都会显示在里面，所以在调试中是很重要的，后面我们会重点讲这个文件。

再看文件夹。

StreamingAssets文件夹是储存资源文件的地方，包括BGM, CG, 立绘, 音效, 脚本等等，是最重要的文件夹。

其余文件夹都是些引擎底层相关的文件，请尽情无视它们。

打开StreamingAssets文件夹

<img src="/img/3.png">
 
这里有各种资源文件，从上到下依次介绍。

1. BGM  顾名思义，是储存BGM 的文件夹

2. CG 该文件夹储存萌化版图片，包括背景、立绘、CG等等。

打开CG文件夹

<img src="/img/4.png">
 
在CG文件夹根目录的龙绘原版图片大多都无用。只有上面文件夹内的图片会被用到！

几个重要文件夹：

1.	Background 储存背景图  
2. 	Sprite 储存立绘

其中立绘比较特殊，每一个表情有三张图片，分别编号0、1、2，如图：

<img src="/img/5.png">
 
从0到2，角色嘴巴张开程度越来越大，其余部分完全一样。这是为了实现嘴型动画效果，在三张图片之间来回切换，以实现嘴动的效果。

当然我们不做嘴型动画，只需要关注0编号的立绘即可。

CG文件夹介绍到这里，接下来是CGAlt、OGBackground和OGSprites。

CGAlt储存steam版立绘和背景。

OGBackground储存原版背景

OGSprites储存原版龙绘

这三个文件夹存在意义是使玩家可以在游戏内随时切换立绘风格，不过我们小剧场只采用萌化立绘，所以可以无视。

Movie文件夹储存OP，在小剧场里派不上用场，所以也请无视。

SE文件夹储存音效（sound effects），可以来此文件夹调用音效。

Voice储存语音，我们不做语音，所以也用不到。

Spectrum储存嘴型动画，和voice中的文件一一对应。其文件都是由0，1，2构成的txt文本，游戏就按照其排列顺序变换0，1，2三种图片以实现嘴动效果。用不到

接下来重点讲解CompiledScripts，CompiledUpdateScripts，Scripts以及update文件夹。

这几个文件夹储存脚本，脚本分为可读（.txt）与不可读（.mg）两种（可读与否是相对人而言的）。CompiledScripts，CompiledUpdateScripts中的脚本是不可读（.mg）的，Scripts与update中的脚本是可读（.txt）的。

但是CompiledScripts和Scripts的优先级较弱，一般不会被游戏读取，下面只讲update和CompiledUpdateScripts。

可读脚本可以直接用notepad++查看修改，但是无法被游戏直接读取。是制作小剧场时的主要编辑对象。如图：

<img src="/img/6.png">
 
不可读脚本则无法打开，但是可以被游戏直接读取。

<img src="/img/7.png">
 
游戏本身无法读取可读脚本（.txt），但游戏内置编译器，可以把可读脚本（.txt）编译（compile）成不可读脚本（.mg），供游戏读取

$$
可读文件(.txt) \stackrel{编译}{\longrightarrow} 不可读文件(.mg)
$$

游戏会把update中的可读脚本编译成CompiledUpdateScripts中的不可读脚本，而且是一一对应的。

<img src="/img/8.png">

<img src="/img/9.png">

  
游戏每次运行的时候，会自动检测update中的文件是否与CompiledUpdateScripts不同，如果不同将执行编译，此时游戏会白屏一段时间。编译完成后游戏将正常运行。

编译过程都被记录在前面提到的output_log.txt里

<img src="/img/10.png">
 
编译失败会出现下面的提示：

<img src="/img/11.png">
 
会告诉你到底是哪里写错了导致的编译失败。比如上面这个错误出现在131行。

有时不会告诉你到底哪里写错了，这种时候就要仔细对整个脚本进行检查，尤其是要注意有没有漏掉括号。

<img src="/img/12.png">
 
上面这个便是漏掉括号导致的编译错误。

当然导致编译错误的原因很多，如果你在制作小剧场过程中不明白哪里出了错，欢迎随时来问我。
