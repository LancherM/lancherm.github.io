---
title: 脚本简介 1
date: 2022-01-01
category:
  - 寒蝉游戏引擎
tag:
  - 文档
  - 寒蝉
---
# 脚本简介 1

先假设你已经大致掌握了C语言的基本语法，下面我们来讲脚本。

其实官方没有类似文档的东西，这里面很多函数的用途都是试出来的，所以有些参数我也不知道代表什么含义，请见谅。

写脚本的前提是能读懂脚本，我们先打开一个写好的脚本。

```c#
//_tsum_008.txt

void main()
{

	FadeOutBGM( 0, 0, FALSE );
	FadeOutBGM( 1, 0, FALSE );
	FadeOutBGM( 2, 0, FALSE );
	FadeOutBGM( 3, 0, FALSE );
	ClearMessage();

	DrawScene( "white", 1000 );
	PlayBGM( 1, "semi", 56, 0 );
	PlayBGM( 2, "suzume", 56, 0 );
	DrawSceneWithMask( "background/Sora", "maskm1", 1, 0, 1300 );
	SetValidityOfInput( FALSE );
	Wait( 1000 );
	SetValidityOfInput( TRUE );
	DrawSceneWithMask( "white", "maskright", 1, 0, 300 );
	DrawSceneWithMask( "background/g1", "maskright", 1, 0, 300 );
	PlaySE( 0, "wa_001", 56, 64 );
	SetValidityOfInput( FALSE );
	Wait( 2000 );
	SetValidityOfInput( TRUE );
	ModSetLayerFilter(2, 256, "none");
	ModDrawCharacter(2, 3, "sprite/me1a_def_a1_", "0", 160, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 0, FALSE );
	DrawScene( "background/gk1", 400 );

	SetColorOfMessage( TRUE, 0xff, 0xbb, 0xff );

	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#5ec69a>魅音</color>", NULL, "<color=#5ec69a>魅音</color>", NULL, Line_ContinueAfterTyping); }
	ModPlayVoiceLS(4, 3, "ps3/s09/03/170300093", 256, TRUE);
	OutputLine(NULL, "「あーーー、そりゃ多分、葛西さんだねぇ。",
		   NULL, "\"啊——————，那位大概是葛西先生吧。", Line_WaitForInput);
	ModPlayVoiceLS(4, 3, "ps3/s09/03/170300094", 256, TRUE);
	OutputLine(NULL, "詩音の監視役だよ。」",
		   NULL, "负责监视诗音的哦。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }

	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#f0953d>レナ</color>", NULL, "<color=#f0953d>蕾娜</color>", NULL, Line_ContinueAfterTyping); }
	ModPlayVoiceLS(4, 2, "ps3/s09/02/170200287", 256, TRUE);
	OutputLine(NULL, "「監視役、なの？」",
		   NULL, "\"监视吗？\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }

	DisableWindow();
	ModDrawCharacter(2, 3, "sprite/me1a_warai_a1_", "0", 160, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 200, TRUE );

}
```

这是罪灭篇脚本的一部分。我们自上到下逐个语句分析。

void main 自不用说，是声明 main 函数，也就是程序的起点。

FadeOutBGM( 0, 0, FALSE ); FadeOutBGM是淡出BGM的意思，也就是停止播放BGM（如果有的话）。第一个0指的是0音轨，因为游戏支持多个BGM同时播放，所以需要为每个BGM指定一个音轨，此处的0便是让0号音轨的BGM停止播放。第二个0是淡出时间，表示在多长时间内声音音量逐渐降为0，此处填0则是让声音立即停止。最后的 FALSE 是允许该语句和后面的语句同时执行的意思，如果填 TRUE 则是不允许该语句和后面的语句同时执行。比如有两个音轨的BGM在同时播放，那么如果写：

```
	FadeOutBGM( 0, 400, TRUE );
	FadeOutBGM( 1, 0, FALSE );
```

则第一个BGM先慢慢停止播放，等第一个BGM停止后再停止播放第二个BGM

如果第一个填 FALSE 那么两个BGM会同时停止播放。
```c#
ClearMessage();
```
是清空文本框，无参数。
```c#
DrawScene( "white", 1000 );
```
DrawScene是绘制场景的意思，也就是说这个函数用来加载背景图。"white"指加载名为"white.png"的背景图（也就是一张白图），此图放在CG文件夹根目录，而且".png"系统会自动补全，所以只写"white"即可。后面的1000是淡入时间。
```c#
PlayBGM( 1, "semi", 56, 0 );
```
这是播放BGM的函数。1是播放音轨。 "semi"则是播放BGM文件夹下名为"semi.ogg"的音乐，同样系统会补上".ogg"。56貌似是音量，0是淡入时间。
```c#
DrawSceneWithMask( "background/Sora", "maskm1", 1, 0, 1300 );
```
此处也是绘制背景，但是加了特效。比如让背景从左到右展开，或者从右上角逐渐揭开之类的。"background/Sora"是加载CG文件夹下background文件夹下的 sora.png。"maskm1"是特效的类型，比如这个是从右上角逐渐揭开（如图）。1，0的用途暂时不清楚。1300是淡入时间。

<img src="/img/img-1.png">

```c#
PlaySE( 0, "wa_001", 56, 64 );
```
这个是播放音效的函数。0是要播放的音轨，"wa_001"是指播放SE文件夹下"wa_001.ogg"的音乐。56和64的作用暂不清楚，可能是音量和淡入时间。值得注意的是，音效只播放一遍，不需要停止函数。而BGM会一直重复播放，且需要停止函数（FadeBGM）。

```c#
SetValidityOfInput( FALSE );
Wait( 2000 );
SetValidityOfInput( TRUE );
```

这个函数可以禁止玩家输入。因为游戏里输入（点击屏幕，按键盘等等）可以快进或跳过当前的指令，这个函数参数设置为FALSE可以使玩家输入无效化，也就是必须看着游戏完成当前指令。SetValidityOfInput( TRUE ) 则是重新使玩家的输入有效。

```c#
Wait( 1000 );
```

是游戏暂停执行指令1000ms

```c#
ModSetLayerFilter(2, 256, "none");
```

是设置立绘图层。2是指设置图层2，256暂不清楚，"none"则是无效果。这个函数的意义主要是给图层加上滤镜，使立绘呈现出各种各样的效果。比如ModSetLayerFilter(2, 256, "night") 可以给在图层2的立绘加上黑夜滤镜。

<img src="/img/img-2.png">

```c#
ModDrawCharacter(2, 3, "sprite/me1a_def_a1_", "0", 160, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 0, FALSE );
```
是加载角色立绘。2是图层。3是角色嘴型动画文件夹编号，我们不做嘴型动画所以可以乱写。"sprite/me1a_def_a1\_"是立绘所在位置，注意不要加编号。"0"是立绘嘴型编号（0、1、2）。160是水平位置，0是正中央。第一个0是垂直位置。第二个0是缩放比例，0就是不缩放的意思。最后一个FALSE也是允许该语句和后面的语句同时执行的意思。最后一个0是淡入时间。10则是该立绘的权重，两个立绘重叠时，权重高的在上面。不过不要太高（>50），否则会出立绘不消失的bug。其余的参数用途未知。

```c#
SetColorOfMessage( TRUE, 0xff, 0xbb, 0xff );
```
这是设置文本颜色，采用十六进制RGB编码格式，默认是白色。0xff, 0xbb, 0xff分别是R、G、B。比如这个对应的是粉色。这是罪灭篇蕾娜视角，所以文本颜色是粉色。后面我们会介绍如何让局部文本变色。

<img src="/img/img-3.png">

```c#
if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#5ec69a>魅音\</color>", NULL, "<color=#5ec69a>魅音\</color>", NULL, Line_ContinueAfterTyping); }
```
这个稍微复杂一些，我们慢慢解释。

首先是if语句，判断是否是ADV模式。先介绍一下，游戏有两种阅读模式：ADV和NVL。两种模式区别见下图,上面是ADV，下面是NVL。显然ADV会显示人名，而NVL不显示。如果是ADV模式，那么执行下面的语句，否则什么都不做。

<img src="/img/img-4.png">

<img src="/img/img-5.png">

​                                                                                                   

我们再来看要执行的语句：
```c#
OutputLine("<color=#5ec69a>魅音\</color>", NULL, "<color=#5ec69a>魅音\</color>", NULL, Line_ContinueAfterTyping);
```

OutputLine是输出文本的函数。第一个参数是日语模式下的输出，可以先不管。第三个参数是其他语言（中英等等）模式下的输出，我们只看这个。显然是输出了一个字符串 <color=#5ec69a>魅音\</color>。<color=#5ec69a>和\</color>代表其中的文本显示对应的颜色，同样是十六进制RGB编码。比如这里让魅音两字显示绿色。而<color=#5ec69a>和\</color>本身不会被输出到文本框中。所以这是让局部文本变色的方法。

综上所述，整个语句的含义是：GADV模式下打印绿色的魅音两字。

<img src="/img/img-6.png">

```c#
ModPlayVoiceLS(4, 3, "ps3/s09/03/170300093", 256, TRUE);
```
这是播放语音函数，不用管。

```c#
OutputLine(NULL, "「あーーー、そりゃ多分、葛西さんだねぇ。",
		   NULL, "\"啊——————，那位大概是葛西先生吧。", Line_WaitForInput);
```
这个和上面的是一样的，第三个参数输出相应的文本。需要注意的是最后一个参数 Line_WaitForInput。这个参数决定下一句该如何输出。比如Line_WaitForInput表示玩家按下鼠标再输出下一句；Line_ContinueAfterTyping则是输出完毕后继续输出下一句，不需要等玩家按鼠标；GetGlobalFlag(GLinemodeSp)的作用和Line_WaitForInput类似，但是要用在最后一句上。
```c#
if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
```
这个也是类似的，先看看是不是ADV模式，是的话就清除文本框，否则就换行（\n）。
```c#
DisableWindow();
```
这个是暂时使文本框消失，让玩家的注意力放到立绘或背景上。

OK先讲这么多，剩下的我们在第二部分继续讲。

