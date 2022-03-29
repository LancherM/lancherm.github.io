---
title: 小剧场编写示例
date: 2022-01-01
category:
  - 寒蝉游戏引擎
tag:
  - 文档
  - 寒蝉
---

# 小剧场编写示例

本文将从一个简单的小剧场出发，介绍编写小剧场的主要流程。

以下背景图、立绘的选取仅为参考，读者可根据自己的喜好选择。

先看一个简单的场景，来自拜年纪。

```
校长摇了摇铃铛，象征着一天校园生活的结束。
圭一【这就放学了啊。最近的社团活动都没什么意思，来来去去都是那几个游戏。】
蕾娜【毕竟我们玩的游戏有很多都是以前学生留下的，有些已经玩了很多遍变得破破烂烂的。】
魅音【大家想玩新游戏吗？我听说叔叔那里进了些新桌游，如果大家想玩的话，我们可以晚上七点去秘密基地开个派对。】
悟史【我和沙都子没问题。】
蕾娜【蕾娜可以给大家准备便当。】
圭一【哦哦，是蕾娜的便当，我要留着肚子好好品尝。】
羽入【梨花？】
梨花【我们当然也参加啦，咪啪~】
魅音【既然大家都同意了，那就不见不散了。对了，我去把诗音也叫来吧。】
沙都子【诗音桑也来吗？真是令人期待呢。】
```

在开始写代码之前，先做好准备工作。

打开update文件夹，将原来的\_tsum_op.txt文件备份好，再新建一个空的\_tsum_op.txt文件。

<img src="/img/lecture/1.png">

用notepad++打开\_tsum_op.txt进行编辑。此处建议再打开一个写好的官方脚本，两个相互对照，便于编辑。

<img src="/img/lecture/2.png">

OK之后就可以开始写了。

先写最基本的main函数。

```c#
void main()
{
    
}
```

这里要注意一件事，**脚本中的缩进一定要用Tab，不要用空格**，否则指令无法执行，会直接打印出来。Tab和空格的区别是：Tab缩进四字符只需按一下，而空格需要按四下。下面两图中，左图的是正确的Tab缩进，右图是空格缩进。

<img src="/img/lecture/3.png">

<img src="/img/lecture/4.png">

如果用空格缩进，将输出以下效果。

<img src="/img/lecture/5.png">

可以看到函数直接被打印出来而非执行。如果你发现了类似的问题，应首先检查是否用了空格缩进。

接下来正式开始编写小剧场。

首先要在脑中先构思场景，再借助代码实现。比如这段对话明显是在黄昏的教室内进行的，选取场景、BGM时就要注意这点。

```
校长摇了摇铃铛，象征着一天校园生活的结束。
```

校长摇铃。校长通常在走廊里摇铃，所以场景应选择学校走廊。

抄在脚本编写中是很重要的，一方面节约编写时间，另一方面不容易出错。

打开写好的脚本。

```c#
	//_tsum_013.txt
	SetColorOfMessage( TRUE, 0xff, 0xbb, 0xbb );
	DrawSceneWithMask( "black", "maskdown", 1, 0, 300 );
	DrawSceneWithMask( "background/g1", "maskleft", 1, 0, 300 );
	SetValidityOfInput( FALSE );
	Wait( 2000 );
	SetValidityOfInput( TRUE );
	DrawSceneWithMask( "black", "maskleft", 1, 0, 300 );
	DrawSceneWithMask( "background/m_hi3", "maskleft", 1, 0, 300 );
	PlayBGM( 0, "getting_mad", 56, 0 );

	ClearMessage();
	if (GetGlobalFlag(GADVMode)) { OutputLineAll("", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "　元々、私と三四さんにはそんなに接点があったわけじゃない。",
		   NULL, "原本，我和三四小姐之间应该没什么交集。", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n\n", Line_ContinueAfterTyping); }
```

然后把上面的`DrawSceneWithMask( "background/m_hi3", "maskleft", 1, 0, 300 );`复制过来，参数改成我们想要的参数。

之后播放摇铃声效，最后的代码应该是这样的。

```c#
void main()
{
	DrawSceneWithMask( "background/g2_01", "maskleft", 1, 0, 300 );
	PlaySE( 0, "s_chaim", 56, 64 );
	Wait( 1000 );
}
```

接下来该打印文本了，依然是复制粘贴改参数。

```c#
void main()
{
	DrawSceneWithMask( "background/g2_01", "maskleft", 1, 0, 300 );
	PlaySE( 0, "s_chaim", 56, 64 );
	Wait( 1000 );
	if (GetGlobalFlag(GADVMode)) { OutputLineAll("", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "校长摇了摇铃铛，象征着一天校园生活的结束。", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }		
}
```

注意日语文本用不到，可以全部删去。

接下来是在教室交谈的场景，先加载教室背景图，再开始播放BGM。

```c#
	DrawScene( "background/gk1_01", 1000 );
	PlayBGM( 0, "z2_hig2", 56, 0 );	
```

背景图和BGM都在相应的文件夹里，读者可以自己浏览文件夹，选取自己最合适的背景与BGM。

接下来要绘制人物立绘。注意背景是黄昏，所以要给人物加上黄昏的滤镜。

既然是圭一先说话，那就先绘制圭一的立绘。由于圭一不是唯一一个说话的，所以尽量不要设置在中间位置，这里我们让他在左边。

```c#
	ModSetLayerFilter(1, 256, "sunset"); //设置黄昏滤镜
	ModDrawCharacter(1, 1, "sprite/kei1_komaru_", "0", -120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 400, TRUE ); //绘制圭一立绘
```

之后让圭一说话。

```c#
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#956f6e>圭一</color>", NULL, "<color=#956f6e>圭一</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"这就放学了啊。", Line_WaitForInput);
	OutputLine(NULL, "",
		   NULL, "最近的社团活动都没什么意思，来来去去都是那几个游戏。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
	ClearMessage();
```

圭一说话之后就轮到蕾娜了。和上面一样，先绘制立绘，再说话。

```c#
	ModSetLayerFilter(2, 256, "sunset");//设置黄昏滤镜
	ModDrawCharacter(2, 2, "sprite/re1b_def_b1_", "0", 120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 400, TRUE );//绘制蕾娜立绘

	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#f0953d>レナ</color>", NULL, "<color=#f0953d>蕾娜</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"毕竟我们玩的游戏有很多都是以前学生留下的，有些已经玩了很多遍变得破破烂烂的。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
	ClearMessage();
```

然后是魅音。三个人的场景略显拥挤，我们可以先让蕾娜圭一立绘消失，再在中间位置绘制魅音。

```c#
	DrawScene( "background/gk1_01", 1000 );//注意背景图和原来的一样
	
	ModSetLayerFilter(3, 256, "sunset");
	ModDrawCharacter(3, 3, "sprite/me1b_warai_a1_", "0", 0, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 400, TRUE );
```

注意绘制背景图会使原来的立绘消失。利用这一点我们通过重新绘制背景实现让两人立绘快速消失的效果。

让魅音说话。

```c#
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#5ec69a>魅音</color>", NULL, "<color=#5ec69a>魅音</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"大家想玩新游戏吗？", Line_WaitForInput);
	OutputLine(NULL, "",
		   NULL, "我听说叔叔那里进了些新桌游，如果大家想玩的话，我们可以晚上七点去秘密基地开个派对。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
```

接下来该让沙都子和悟史出场了，和上面一样，先让魅音立绘消失，再同时绘制沙都子和悟史。

```c#
	DrawScene( "background/gk1_01", 1000 );
	ModSetLayerFilter(4, 256, "sunset");	
	ModDrawCharacter(4, 7, "sprite/sato1_def1_", "0", 120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 0, 400, FALSE );
	ModSetLayerFilter(5, 256, "sunset");	
	ModDrawCharacter(5, 4, "sprite/sa1a_def_a1_", "0", -120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 0, 400, TRUE );
```

这里第一个ModDrawCharacter的最后一个参数设置成了FALSE，第二个设置成了TRUE。目的是让两个立绘同时出现。

下面无非是说话。

```c#
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#ffdc6f>悟史</color>", NULL, "<color=#ffdc6f>悟史</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"我和沙都子没问题。\"", GetGlobalFlag(GLinemodeSp));
	ClearMessage();	
```

后面是圭一蕾娜的戏份，依然是消失立绘，加载立绘，并说话。

```c#
	DrawScene( "background/gk1_01", 1000 );

	ModSetLayerFilter(2, 256, "sunset");
	ModDrawCharacter(2, 2, "sprite/re1b_def_b1_", "0", 120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 400, TRUE );

	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#f0953d>レナ</color>", NULL, "<color=#f0953d>蕾娜</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"蕾娜可以给大家准备便当。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
	ClearMessage();
	
	ModSetLayerFilter(1, 256, "sunset");
	ModDrawCharacter(1, 1, "sprite/kei1_def1_", "0", -120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 400, TRUE );

	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#956f6e>圭一</color>", NULL, "<color=#956f6e>圭一</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"哦哦，是蕾娜的便当，我要留着肚子好好品尝。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
	ClearMessage();	
```

梨花和羽入也是一样的。

```c#
	DrawScene( "background/gk1_01", 1000 );	
	ModSetLayerFilter(6, 256, "sunset");
	ModDrawCharacter(6, 12, "sprite/ha3a_def_", "0", -120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 20, 400, FALSE );	
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#8676cf>羽入</color>", NULL, "<color=#8676cf>羽入</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"梨花？\"", GetGlobalFlag(GLinemodeSp));
	ClearMessage();		
	ModSetLayerFilter(7, 256, "sunset");
	ModDrawCharacter(7, 5, "sprite/ri1_warai_a1_", "0", 120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 20, 400, FALSE );
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#6972c1>梨花</color>", NULL, "<color=#6972c1>梨花</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"我们当然也参加啦，咪啪~☆\"", Line_Normal);
	ClearMessage();	
```

后面的就不多解释了，和上面是一样的。

```c#
	DrawScene( "background/gk1_01", 1000 );
	
	ModSetLayerFilter(3, 256, "sunset");
	ModDrawCharacter(3, 3, "sprite/me1b_wink_a1_", "0", -120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 400, TRUE );
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#5ec69a>魅音</color>", NULL, "<color=#5ec69a>魅音</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"既然大家都同意了，那就不见不散了。", Line_WaitForInput);
	OutputLine(NULL, "",
		   NULL, "对了，我去把诗音也叫来吧。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }

	ModSetLayerFilter(5, 256, "sunset");	
	ModDrawCharacter(5, 4, "sprite/sa1a_def_a1_", "0", 120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 0, 400, FALSE );
	
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#fcdb77>沙都子</color>", NULL, "<color=#fcdb77>沙都子</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"诗音桑也来吗？真是令人期待呢。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
	ClearMessage();
```

这样一来这段场景就写完了，以下是完整的代码。

```c#
void main()
{
	DrawScene( "background/g2", 1000 );
	PlaySE( 0, "s_chaim", 56, 64 );
	Wait( 500 );
	if (GetGlobalFlag(GADVMode)) { OutputLineAll("", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "校长摇了摇铃铛，象征着一天校园生活的结束。", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }	

	DrawScene( "background/gk1_01", 1000 );
	PlayBGM( 0, "z2_hig2", 56, 0 );	
	

	
	ModSetLayerFilter(1, 256, "sunset");
	ModDrawCharacter(1, 1, "sprite/kei1_komaru_", "0", -120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 400, TRUE );

	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#956f6e>圭一</color>", NULL, "<color=#956f6e>圭一</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"这就放学了啊。", Line_WaitForInput);
	OutputLine(NULL, "",
		   NULL, "最近的社团活动都没什么意思，来来去去都是那几个游戏。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
	ClearMessage();



	ModSetLayerFilter(2, 256, "sunset");
	ModDrawCharacter(2, 2, "sprite/re1b_def_b1_", "0", 120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 400, TRUE );

	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#f0953d>レナ</color>", NULL, "<color=#f0953d>蕾娜</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"毕竟我们玩的游戏有很多都是以前学生留下的，有些已经玩了很多遍变得破破烂烂的。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
	ClearMessage();

	DrawScene( "background/gk1_01", 1000 );
	
	ModSetLayerFilter(3, 256, "sunset");
	ModDrawCharacter(3, 3, "sprite/me1b_warai_a1_", "0", 0, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 400, TRUE );
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#5ec69a>魅音</color>", NULL, "<color=#5ec69a>魅音</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"大家想玩新游戏吗？", Line_WaitForInput);
	OutputLine(NULL, "",
		   NULL, "我听说叔叔那里进了些新桌游，如果大家想玩的话，我们可以晚上七点去秘密基地开个派对。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
	DrawScene( "background/gk1_01", 1000 );
	ModSetLayerFilter(4, 256, "sunset");	
	ModDrawCharacter(4, 7, "sprite/sato1_def1_", "0", 120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 0, 400, FALSE );
	ModSetLayerFilter(5, 256, "sunset");	
	ModDrawCharacter(5, 4, "sprite/sa1a_def_a1_", "0", -120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 0, 400, TRUE );

	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#ffdc6f>悟史</color>", NULL, "<color=#ffdc6f>悟史</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"我和沙都子没问题。\"", GetGlobalFlag(GLinemodeSp));
	ClearMessage();	

	DrawScene( "background/gk1_01", 1000 );

	ModSetLayerFilter(2, 256, "sunset");
	ModDrawCharacter(2, 2, "sprite/re1b_def_b1_", "0", 120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 400, TRUE );

	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#f0953d>レナ</color>", NULL, "<color=#f0953d>蕾娜</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"蕾娜可以给大家准备便当。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
	ClearMessage();
	
	ModSetLayerFilter(1, 256, "sunset");
	ModDrawCharacter(1, 1, "sprite/kei1_def1_", "0", -120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 400, TRUE );

	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#956f6e>圭一</color>", NULL, "<color=#956f6e>圭一</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"哦哦，是蕾娜的便当，我要留着肚子好好品尝。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
	ClearMessage();	
	DrawScene( "background/gk1_01", 1000 );	
	ModSetLayerFilter(6, 256, "sunset");
	ModDrawCharacter(6, 12, "sprite/ha3a_def_", "0", -120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 20, 400, FALSE );	
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#8676cf>羽入</color>", NULL, "<color=#8676cf>羽入</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"梨花？\"", GetGlobalFlag(GLinemodeSp));
	ClearMessage();		
	ModSetLayerFilter(7, 256, "sunset");
	ModDrawCharacter(7, 5, "sprite/ri1_warai_a1_", "0", 120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 20, 400, FALSE );
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#6972c1>梨花</color>", NULL, "<color=#6972c1>梨花</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"我们当然也参加啦，咪啪~☆\"", Line_Normal);
	ClearMessage();	

	DrawScene( "background/gk1_01", 1000 );
	
	ModSetLayerFilter(3, 256, "sunset");
	ModDrawCharacter(3, 3, "sprite/me1b_wink_a1_", "0", -120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 400, TRUE );
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#5ec69a>魅音</color>", NULL, "<color=#5ec69a>魅音</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"既然大家都同意了，那就不见不散了。", Line_WaitForInput);
	OutputLine(NULL, "",
		   NULL, "对了，我去把诗音也叫来吧。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }

	ModSetLayerFilter(5, 256, "sunset");	
	ModDrawCharacter(5, 4, "sprite/sa1a_def_a1_", "0", 120, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 0, 400, FALSE );
	
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#fcdb77>沙都子</color>", NULL, "<color=#fcdb77>沙都子</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"诗音桑也来吗？真是令人期待呢。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
	ClearMessage();

}
```

我们看下一段场景

```
夜间，山间一间略显破旧的房子里灯火通明，时不时传来欢快的笑声，与周围寂静的环境截然不同。
魅音【哼哼，这次又是大叔我赢了。】
魅音丢出手中的牌，然后把最后一个棋子碰倒。
圭一【太奇怪了，为什么又是魅音赢。】
蕾娜【魅酱很擅长这个游戏的样子，完全不像第一次玩呢。】
魅音【因为我已经从叔叔那里知道了这个游戏的必胜法则。虽然你们可能说我卑鄙，但这就是我们社团的团规！】
圭一【太狡猾了！必胜法则什么的，我们一定要破解给你看。你说对吧，悟史。】
```

切换场景时一般要关掉原来的BGM。

```c#
	FadeOutBGM( 0, 1000, FALSE );
	FadeOutBGM( 1, 1000, TRUE );
```

之后加载合适的BGM与背景，这里加载的是室外背景。

```c#
	DrawScene( "background/kamik_mati_206", 1000 );		
	PlayBGM( 1, "1", 56, 0 );
```

旁白。

```c#
	if (GetGlobalFlag(GADVMode)) { OutputLineAll("", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "夜间，山间一间略显破旧的房子里灯火通明，时不时传来欢快的笑声，与周围寂静的环境截然不同。", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
```

之后切换到室内场景，再绘制立绘。

```c#
	DrawScene( "background/kimi_o1_08", 1000 );
	Wait( 500 );
	ModSetLayerFilter(1, 256, "none");	
	ModDrawCharacterWithFiltering(1, 3, "sprite/me2_huteki_a1_", "0", "maskleft", 1, -240, 0, FALSE, 0, 0, 0, 0, 0, 0, 400, FALSE );
```

这里的Wait是为了演出更自然。

后面的就不必多说了。

```c#
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#5ec69a>魅音</color>", NULL, "<color=#5ec69a>魅音</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"哼哼，这次又是大叔我赢了。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
	ClearMessage();
	if (GetGlobalFlag(GADVMode)) { OutputLineAll("", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "魅音丢出手中的牌，然后把最后一个棋子碰倒。", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }

	DisableWindow();
	ModSetLayerFilter(2, 256, "none");
	ModDrawCharacterWithFiltering(2, 1, "sprite/kei1_Komaru_", "0", "maskleft", 1, 240, 0, FALSE, 0, 0, 0, 0, 0, 0, 400, FALSE );
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#956f6e>圭一</color>", NULL, "<color=#956f6e>圭一</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"太奇怪了，为什么又是魅音赢。\"", GetGlobalFlag(GLinemodeSp));
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
	ClearMessage();
	DisableWindow();
	ModSetLayerFilter(3, 256, "none");
	ModDrawCharacterWithFiltering(3, 2, "sprite/re2a_def_a1_", "0", "maskright", 1, 0, 0, FALSE, 0, 0, 0, 0, 0, 20, 400, TRUE );
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#f0953d>レナ</color>", NULL, "<color=#f0953d>蕾娜</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"魅酱很擅长这个游戏的样子，完全不像第一次玩呢。\"", GetGlobalFlag(GLinemodeSp));	
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }
	ClearMessage();		
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#5ec69a>魅音</color>", NULL, "<color=#5ec69a>魅音</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"因为我已经从叔叔那里知道了这个游戏的必胜法则。", Line_WaitForInput);	
	OutputLine(NULL, "",
		   NULL, "虽然你们可能说我卑鄙，但这就是我们社团的团规！\"", GetGlobalFlag(GLinemodeSp));	
	if (GetGlobalFlag(GADVMode)) { ClearMessage(); } else { OutputLineAll(NULL, "\n", Line_ContinueAfterTyping); }	
```

接下来要圭一变表情，需要重写一遍ModDrawCharacter函数。

```c#
	DisableWindow();
	ModDrawCharacter(2, 1, "sprite/kei1_Def2_", "0", 240, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 0, 400, TRUE );
```

DisableWindow()是让观众的注意力集中在立绘上。

OK，接下来说话。

```c#
	if (GetGlobalFlag(GADVMode)) { OutputLine("<color=#956f6e>圭一</color>", NULL, "<color=#956f6e>圭一</color>", NULL, Line_ContinueAfterTyping); }
	OutputLine(NULL, "",
		   NULL, "\"太狡猾了！", Line_WaitForInput);	
	OutputLine(NULL, "",
		   NULL, "必胜法则什么的，我们一定要破解给你看。", Line_WaitForInput);	
	OutputLine(NULL, "",
		   NULL, "你说对吧，悟史。\"", GetGlobalFlag(GLinemodeSp));
```

这样就写完了。

示例就先做到这里，实现的效果可以参看小剧场视频。





