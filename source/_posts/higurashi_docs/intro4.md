---
title: 编写脚本
date: 2022-01-01
category:
  - 寒蝉游戏引擎
tag:
  - 文档
  - 寒蝉
---

# 编写脚本

{% note info %}
本文译自07th-mod开发者wiki，如需阅读原文，请<a href="https://07th-mod.com/dev-wiki/on-scripting/">点此</a>
{% endnote %}

**※如无特殊说明，以下的“我”指原文作者或07th-mod组织**

## 简介

本文的目标是描述如何编写脚本，以使其无缝而流畅地运行。读完本文，您将有能力从头开始正确地编写出整个场景的脚本。

## 理解脚本

对新人而言，阅读脚本可能等同于阅读神秘的涂鸦，偶尔能明白一部分意思。但总会有某个时刻，您将能辨别并理解每部分的含义。

这是因为脚本的每一行代码都有意义，不过您也可以看到一些可以被移除而不会有任何后果的冗余代码。每一行代码都要消耗储存空间并增加编译时间，因此减少冗余代码是很重要的。

您可以通过阅读文档或者直接写代码看效果来学习每一部分代码的功能。将方法和结果结合起来，您就能边阅读脚本边在脑海中将其可视化。

亲身体验效果是学习的重要环节，这使您能预见移除或添加某一部分代码带来的效果，特别是当您需要修改脚本以适应从一个篇章到另一个篇章带来的引擎上的变化时（*译注：不同篇章采用的unity引擎版本不同，因此语法上也有不同，所以更换篇章时需要对脚本做出一些修改。不过我们只用罪灭篇引擎制作，所以无需关心这一点*）。

我推荐边阅读脚本边推游戏对应的场景，甚至可以直接猜接下来会有什么样的演出并看看实际的演出效果是否和预想的一样，这样更容易理解一些容易错过的细节。

为了更好地理解，这里有鬼隐篇的一个片段：

```c#
if (GetGlobalFlag(GADVMode)) { OutputLineAll("", NULL, Line_ContinueAfterTyping); }

OutputLine(NULL, "　今日はレナと魅音に雛見沢をいろいろと案内してもらう日だ。",
       NULL, "今天是蕾娜和魅音带我参观雏见泽的日子。", Line_Normal);

ClearMessage();
```
这是脚本中最常见的片段，我将其称之为一个“文本块”，因为它总是作为一整块出现。

第一行是头部，表示ADV模式下的角色名称。这里是空的因为这不是对话句，不需要名字。最后一个参数表示执行完后会立刻执行下一个指令。

接下来的是真正显示在文本框中的文本行（有两种语言），最后一个参数决定了打印完文本后该做什么。这里打印完之后会等待一个输入，然后清除文本框中的所有文本。

最后一行是为了文本记录。这个指令会清除上次清除后产生的所有文本（包括当前打印出来的），然后将这些文本放进文本记录，使您看得太快时可以回看前面的文本。

这是最基本的文本块，但还是有很多参数。

```c#
DisableWindow();

PlayBGM( 1, "msys01", 128, 0 );

ModDrawCharacter(1, 3, "sprite/normal/me2_def_a1_", "0", -160, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 0, 0, FALSE );

ModDrawCharacter(3, 2, "sprite/normal/re2a_def_a1_", "0", 160, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 20, 0, FALSE );

DrawSceneWithMask("background/ie1", "left", 0, 0, 1300 );
```

这段代码要实现一个过渡效果。首先，在实现除BGM和声效外的大部分效果前，用"DisableWindow();"关掉无用的文本框来避免玩家分心。（文本框到下次打印文本时会重新出现，所以只是暂时的）

之后开始播放音乐。然后从左到右绘制带着两个角色的新背景图。（*译注：这里的效果就是背景和立绘同时出现，而非传统的先出现背景再出现立绘*）

一般来说你可能觉得先绘制立绘，但是前两个指令最后一个参数设置成了FALSE以放弃优先级，使最后一个指令仍有优先级，从而使它们同时出现。这也是让先绘制的立绘不被后面的DrawScene消除的方法。

还有许多其他参数需要通过查看wiki并观察效果来研究和了解。

```c#
if (GetGlobalFlag(GADVMode)) { OutputLineAll("", NULL, Line_ContinueAfterTyping); }

OutputLine(NULL, "　待ち合わせ場所ではすでにレナと魅音が待っていた。",
       NULL, "蕾娜和魅音已经在约定场合等了一会儿了。", Line_Normal);

ClearMessage();

DisableWindow();

ModDrawCharacter(1, 3, "sprite/normal/me2_tokui_a1_", "1", -160, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 0, 200, TRUE );
```

这一文本块紧接着表情变化，通过让角色的新立绘覆盖原来的立绘来实现。其余的参数保持一致，看起来就像只有脸部表情发生了变化。

注意这个时候该指令仍有优先级，从而只有等立绘绘制完指令才会继续执行。

```c#
if (GetGlobalFlag(GADVMode)) { OutputLine("&lt;color=#5ec69a&gt;魅音&lt;/color&gt;", NULL, "&lt;color=#5ec69a&gt;Mion&lt;/color&gt;", NULL, Line_ContinueAfterTyping); }

ModPlayVoiceLS(3, 3, "ps3/s19/03/990300077", 256, TRUE);

OutputLine(NULL, "「圭ちゃん、遅いぞー！」",
       NULL, "\"小圭，你迟到啦！\"", GetGlobalFlag(GLinemodeSp));

if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
```

这段以对话句结束，所以头部行需要打印名字“魅音”（带着和魅音相称的颜色），然后在打印完文本前播放语音。

这样就可以同时播放语音和打印文本。（ModPlayVoiceLS没有优先级）

最后一行的意思是：如果在ADV模式下那么和前面做的一样，如果在NVL模式下，那么就不会清除文本而是略一行，然后在下面接着打印文本，因为NVL模式下的文本框远比ADV模式大。

解释了那么多，实际的效果是这样的：

https://www.youtube.com/watch?v=gDOm4B5PYoY（需科学上网）

您可能已经注意到BGM已经在播放中了，所以要时刻牢记脚本是连续的。（*译注：这里的意思是要把整个脚本看成一体，写后面的指令时不要忘记前面执行的指令*）

## 正确排序

（*译注：这里的排序是指指令谁在前谁在后的问题*）

这就是下一个主要关心的点。理解制作场景时要考虑多个因素，以及如何处理每一组成部分是很重要的。

过渡时间也很重要，毕竟您肯定不想让所有东西一起蹦出来。您需要正确的入口，和正确的出口。比如说：我想播放一首音乐并替换当前的音乐，那我必须在另一个音轨播放新音乐时让旧音乐淡出，在旧音乐的淡出和新音乐的开始之间，有一个渐进的变化，而不是突然的停止。

除了一些特殊情况，上述处理适用于所有情况。让各种效果缓慢地变化是很重要的，这样就不会有“我去，这是什么鬼演出？！”的感慨。当然，如果你只关心故事本身，那么上面说的就全是不必要的。

现在我们试着构建一个开始的场景。想象一下现在啥都没有，但以防万一我们还是要清除文本关掉音乐，然后伴随着BGM响起，实现缓缓绘制白色背景的过渡效果的演出，作为真正场景显示前的“引子”，同时清除残留立绘。做完之后再绘制真正的场景，绘制完后播放另一首背景音乐以营造良好的氛围。

```c#
FadeOutBGM( 0, 0, FALSE );
FadeOutBGM( 1, 0, FALSE );
FadeOutBGM( 2, 0, FALSE );
ClearMessage();

PlayBGM( 2, "lsys22", 128, 0 );
DrawScene("white", 3000 );
DrawSceneWithMask("background/ma_j3_01", "m1", 0, 0, 3000 );
PlayBGM( 1, "msys06", 128, 0 );

if (GetGlobalFlag(GADVMode)) { OutputLineAll("", NULL, Line_ContinueAfterTyping); }
OutputLine(NULL, "　倦怠感と頭痛。",
       NULL, "Weariness and a headache.", GetGlobalFlag(GLinemodeSp));
if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
```
恰当地选择绘制场景的最佳时机，从而给人一种听着鸟叫声醒来的感觉。你应该注意到了，正是这些小细节给人带来了沉浸感。

在这方面可以做的事还有很多，比如播放音量很大的声效时晃动屏幕来模拟撞击效果，或者改变角色表情来体现角色语气变化。

通过各种各样的工具和一点点创造力，你就能利用多种令人印象深刻的效果来创建相当身临其境的场景。

## 注意事项

但是依然有很多点需要牢记于心，以避免落入圈套或者产生出人意料的结果。在我给出的很多例子中，永远不要忘记播放BGM前先淡出（FadeOut）对应音轨。目的除了安全保障外，还有让原来的背景音乐在其该结束时结束。

另一个点就是优先级，也就是多个指令可否同时执行。大部分带滤镜绘制图像的时候（*译注：例如DrawSceneWithMask和ModDrawCharacterWithFiltering*），往往独占优先级，禁止同时执行其它更高优先级的指令（比如不能同时绘制新场景和带滤镜的人物立绘）。所以牢记哪个指令应该有更高的优先级是很重要的。

实现某个效果时记住要隐藏文本框，以让观众的注意力集中在效果本身。不要给不同角色相同的图层权重，否则会相互覆盖（*译注：实测当绘制两个权重相同的立绘时：先绘制的立绘消失*）。有些指令没有优先级，有些指令独占优先级。尽量避免把过渡时间设置成0，一般用100或50表现相当快的变化，用更常用的300表示一般的变化。

另外，不同游戏篇章用了不同的游戏引擎（出题篇和解题篇差距最大），因此会在处理方式上有些变化。在解题篇里，绘制场景时会自动隐藏文本框，所以不用再写一句DisableWindow。（*译注：咱只用罪灭篇，跟咱没关系*）

不同指令处理优先级的方式也有略微的不同，一些指令可能会忽视优先级，如果没有被高优先级指令分隔开，就会产生恼人的麻烦。

绘制立绘时也很古怪，有的立绘可能在绘制新背景时依旧存在（我尝试了很多解决方案因为它太烦人了，其中最有效的是重绘立绘和背景，当然什么都不需要做才是最好的（*译注：此处指利用bug完成演出2333*））。（*译注：这就是我说的立绘不消失的bug，大概就是无论如何用DrawScene，立绘永远都不消失，目测bug原因出在权重过大上*）

最后，编写脚本主要依赖于感觉，流程和测试，希望所有这些能够帮助你更轻松地开始编写。

## 常用工具

最后我要介绍一些让编写更轻松的工具。

（*此处就不翻译了，可以直接参考<a href="./article1">函数文档</a>*）

```c#
DrawBustshot(5, "black", 0, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 25, 500, TRUE );
```

This is a convenient tool if you need to draw effects, or to not have to change a scene. It's the main way to make multi layered effects. Though note that it's not used to draw character sprites. It has weak priority and can be added in a priority line. Note that there is a DrawSprite variant that is more prioritizing, and is able to change some things like the orientation, to be used in more technical scenes. But don't forget to avoid drawing it using a layer that is already used.

```c#
FadeOutBGM( 0, 300, FALSE );
```

It's pretty straightforward, but still requires some attention. Whenever you start a bgm, you'll have to add a fade-out for it, and depending on where it has to stop, you will change the timing to make it blend with other transitions. Weak priority and rarely used alone.

```c#
OutputLineAll(NULL, "", Line_WaitForInput);
```

It's mostlly used to write text, but it can be used to create pauses between effects, or if you want an effect to take place after a sentence but not continue afterwards.

```c#
Wait( 2000 );
```

The backbone of every effect, despite being able to increase timing on a majority of methods, you'll be using this one very frequently to create delays and pauses, it structures a lot of sequencing and doesn't hold priority.

```c#
DrawScene("black", 500 );
```

Often you'll have to change the background for scene, and this one is quite useful, but there's a few things to note. First, it's very priority hogging, it's usually what supports a priority line and you can add sprites to be drawn with it that way. It also disables the textbox(only answer arcs, don't forget to do it in question arcs) and most importantly, it cleans up the 'scene' by removing sprites and bustshots.





