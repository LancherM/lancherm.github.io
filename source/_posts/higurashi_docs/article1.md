---
title: 引擎文档
date: 2022-01-01
category:
  - 寒蝉游戏引擎
tag:
  - 文档
  - 寒蝉
---

# 引擎文档

本文档主要介绍函数。由于官方没有公开文档，我也没有精力反编译程序得到源码，所以以下各函数的性质均由我本人通过反复实验得出，疏漏错误不可避免。如果您有任何建议，欢迎随时反馈。

本文档也可当成工具书使用，遇到不懂的函数随时查阅。

以下暂不清楚意义的参数用unkx（x为自然数）来表示。若对声明部分或数据类型感到困惑，请参看<a href="https://www.runoob.com/csharp/csharp-tutorial.html">c#教程</a>

## 常用函数

### Wait()

#### 声明

```c#
void Wait(unsigned int time);
```

#### 参数

time: 无符号整型变量，表示系统暂停的时间，单位是ms

#### 示例

```c#
Wait(500);
```

表示让游戏暂停500ms，此过程中游戏不会执行接下来的指令，但已经播放的BGM和音效等不会停止播放。

### DrawScene()

#### 语法

```c#
void DrawScene(string fileName, unsigned int time);
```

#### 参数

fileName: 字符串型变量，代表要加载的背景图的路径。其根目录是"\StreamingAssets\CG"文件夹，因此在加载CG文件夹下的图片时只需要输入图片文件名。其次脚本在编译时会自动补上".png"，因此只输入文件名即可。同理如果想要导入其它图片，也请将图片格式转为".png"

time: 无符号整形变量，表示背景图淡入的时间。**注意**：图片淡入时不会执行后面的指令。

#### 示例

```c#
DrawScene( "background/res4", 400 );
```

表示将background文件夹下的res4.png作为背景图显示出来，淡入时间为400ms。

### DrawSceneWithMask()

#### 声明

```c#
void DrawSceneWithMask(string fileName, string effectName, int unk1, int unk2, unsigned int time);
```

#### 参数 

fileName: 同DrawScene()

effectName: 字符串型变量。表示要显示的特效的图片路径。特效均储存在CG文件夹里，以mask开头的图片便是。

unk1: 未知

unk2: 未知

time: 同DrawScene()

#### 说明

该函数与DrawScene()相似，都是加载背景图片，只不过多了特效。此处的特效是指淡入图片的效果，比如从左向右淡入，以百叶窗的方式淡入等等。当然淡入时间参数不能为0，否则没有效果。一般用于开头。

#### 示例

```c#
DrawSceneWithMask( "background/ma_g1", "maskright", 1, 0, 300 );
```

表示以从右向左淡入背景图，淡入时间是300ms

### DisableWindow();

#### 声明

```c#
void DisableWindow();
```

#### 参数

无参数

#### 说明

该函数仅仅是令文本框消失，让观众的注意力放到立绘和背景上。在下一次输出文本时文本框重新出现。一般用于显示新背景，显示新立绘，或者让角色表情变化。（PS: 无论如何，在用DrawScene()、ModDrawCharacter()等函数前加一句DisableWindow()是一个好习惯）

#### 示例

```
DisableWindow();
```

### PlayBGM

#### 声明

```c#
void PlayBGM(unsigned int soundTrack, string fileName, int unk1, int unk2);
```

#### 参数

soundTrack: 无符号整型变量，表示音轨编号0，1，2，3……由于游戏引擎支持多个音频同时播放，故将其分配到不同音轨。如果两个音频在同一个音轨播放，那么后播放的音频将取代先播放的音频。

fileName: 字符串型变量，代表要播放的BGM的路径。其根目录是"\StreamingAssets\BGM"文件夹，因此在加载BGM文件夹下的音频时只需要输入音频文件名。其次脚本在编译时会自动补上".ogg"，因此只输入文件名即可。同理如果想要导入其它音频，也请将音频格式转为".ogg"

unk1: 未知

unk2: 未知，可能是音量？

#### 示例

```
PlayBGM( 0, "Cafe", 56, 0 );
```

意思是播放BGM文件夹下的"cafe.ogg"，并指定音轨0

### PlaySE

#### 声明

```c#
void PlaySE(unsigned int soundTrack,string fileName, int unk1, int unk2 );
```

#### 参数

soundTrack: 同PlayBGM。**注意**：声效音轨不会与BGM音轨冲突，也就是说可以同时播放音轨为0的BGM和音轨为0的声效，而不会产生冲突。

fileName: 同PlayBGM。不过根目录变成了SE文件夹。

unk1: 未知

unk2: 未知

#### 说明

PlaySE和PlayBGM的区别：前者只播放一遍音频，而后者循环播放音频。因此前者适合播放声效，而后者播放BGM

#### 示例

```
PlaySE( 0, "wa_011", 56, 64 );
```

意思是播放SE文件夹下的"wa_011.ogg"，并指定音轨0

### ModSetLayerFilter

#### 声明

```c#
void ModSetLayerFilter(unsigned int layer, int unk1, string filter);
```

#### 参数

layer: 无符号整型。表示要设置的立绘图层编号1、2、3……

unk1: 未知，一般是256

filter: 字符串型变量。滤镜名。主要有"none"（无效果）、"night"（夜晚滤镜）、"sunset"（黄昏滤镜）

#### 说明

此函数的主要作用是给人物立绘加上滤镜，以适应背景图。如果设置成"none"，那么此函数就没有效果（官方脚本里特别喜欢设置"none"，虽然没有任何卵用）

#### 示例

```c#
ModSetLayerFilter(3, 256, "sunset");
ModDrawCharacter(3, 3, "sprite/me1b_warai_a1_", "0", 0, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 10, 400, TRUE );
```

把图层3的滤镜设置为黄昏，之后在图层3上加载魅音的立绘。

效果：

<img src="/img/image-20220304105707541.png">

### ModDrawCharacter

#### 声明

```c#
void ModDrawCharacter(unsigned int layer, unsigned int lyPack, string fileName, string picName, int x, int y, int scaling, bool unk1, int unk1, int unk2, int unk3, int unk4, int unk5, int unk6, int unk7, int weight, unsigned int time, bool judge);
```

#### 参数

此函数参数较多，我们逐个说明。

layer: 无符号整型。指定立绘图层编号1、2、3……注意不要让两个角色同时使用一个图层，如果使用两次ModDrawCharacter函数，且指定的图层相同，那么后面的立绘会覆盖前面的立绘。

lyPack: 无符号整型。是该角色嘴型动画所在文件夹。由于我们不做嘴型动画，此参数无需考虑

fileName: 字符串型变量。指定立绘所在路径，根目录是CG。注意不要加嘴型编号，比如"kei1_def1_0"应写成"kei1_def1_"

picName: 字符串型变量。是立绘嘴型动画编号，一般为"0"、"1"、"2"。和fileName拼接成立绘文件名。**注意**：不要忘记加引号

x: 立绘水平位置，单位可能是像素px（？）。0即为中间位置，正数在左边，负数在右边。

y: 立绘竖直位置，单位可能是像素px（？）。一般设置为0

scaling: 缩放比例。0即为无缩放。

unk1—unk7均未知

weight: 整型变量。代表权重。两立绘重叠时，权重大的在上面。**注意**：不要太大（>50），否则会出现立绘永不消失的bug；同时也不要给不同的角色相同的权重。

time: 无符号整型。代表淡入时间

judge: 是布尔变量，可取TRUE和FALSE。代表是否允许同时执行其它指令。TRUE代表不允许，也就是必须等立绘显示出来才能执行后面的指令。FALSE代表允许

#### 说明

这个函数的作用主要有两个，一是显示立绘，二是让角色变表情。

让角色变表情时，需要再使用一次ModDrawCharacter函数，且第二次的图层，位置，权重等参数应与显示立绘时的相同。

```c#
ModDrawCharacter(1, 2, "sprite/re2a_warai_a1_", "0", 0, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 0, 200, TRUE );    \\显示蕾娜的立绘
ModDrawCharacter(1, 2, "sprite/re2a_def_a1_", "0", 0, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 0, 200, FALSE );    \\换表情
```

注意到应设置为同一图层，这样后面的立绘会覆盖前面的立绘，以实现变表情的效果。

#### 示例

```c#
ModDrawCharacter(1, 2, "sprite/re2a_kaii_a1_", "0", 0, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 0, 200, TRUE );
```

表示显示蕾娜的立绘，图层为1，水平位置为0（正中间），竖直位置为0，无缩放，权重为0，淡入时间为200ms，不允许同时执行下面的指令。

### ModDrawCharacterWithFiltering

#### 声明

```c#
void ModDrawCharacterWithFiltering(unsigned int layer, unsigned int lyPack, string fileName, string picName, string effectName, int unk1, int unk2, int x, bool unk3, int unk4, int unk5, int unk6, int unk7, int weight, unsigned int time, bool judge);
```

#### 参数

layer、lyPack、fileName、picName、x、weight、time、judge均与ModDrawCharacter相同。

effectName: 字符串型变量。代表要加载的特效名称。和DrawSceneWithMask()中的特效相同，均为mask开头的文件。

unk1—unk7均未知

#### 说明

此函数是ModDrawCharacter的升级版，可以以某种特效加载立绘，其余基本与ModDrawCharacter相同。一般用于角色出现时，不用于更换表情时。

**注意**：该函数与ModDrawCharacter参数位置不同，水平位置移到了第一个布尔变量之前（ModDrawCharacter是picName之后），并多了effectName参数。

#### 示例

```c#
ModDrawCharacterWithFiltering(1, 2, "sprite/re2a_warai_a1_", "0", "maskright", 1, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 300, TRUE );
```

表示从右向左淡入蕾娜的立绘，且图层为0，水平位置为0

### OutputLine

#### 声明

```c#
void OutputLine(NULL, string jap, NULL, string chi, int type);
```

#### 参数

jap: 字符串型变量。表示日语模式下要输出的文本。

chi: 字符串型变量。表示中文模式下要输出的文本。

type: 表示输出文本之后应该怎么做。主要取值有Line_ContinueAfterTyping（不等用户点击直接输出后面的文本）Line_WaitForInput（用户点击后输出下面的文本）GetGlobalFlag(GLinemodeSp)（用户点击后清屏再输出后面的文本）

#### 示例

```c#
OutputLine(NULL, "　あの２人は水鉄砲の銃撃戦に相当の熟練があった。",
	NULL, "这两个人打水枪战相当熟练。", GetGlobalFlag(GLinemodeSp));
```

日语模式下输出"あの２人は水鉄砲の銃撃戦に相当の熟練があった。"

中文模式下输出"这两个人打水枪战相当熟练。"

输出后用户点击鼠标清屏并输出下一句话。

### SetValidityOfInput

#### 声明

```c#
void SetValidityOfInput(bool va);
```

#### 参数

va: 布尔型变量。可取TRUE和FALSE。TRUE代表允许用户输入。FALSE代表不允许用户输入。

#### 说明

此函数的作用是设置用户输入的有效性。要较长时间展示某个画面且不允许用户跳过时，可用该函数设置有效性为FALSE。等展示结束后再设置为TRUE。

#### 示例

```
SetValidityOfInput( FALSE );
Wait( 5000 );
SetValidityOfInput( TRUE );
```

### ClearMessage

#### 声明

```c#
void ClearMessage();
```

#### 参数

无参数

#### 说明

此函数用于清除文本框中的文本（也可理解为换页）

### CallScript

#### 声明

```c#
void CallScript(string fileName);
```

#### 参数

fileName: 调用的文件名。

#### 说明

本函数的作用是调用已经写好的脚本文件，一般是提前写好的演出效果，官方提前写好的脚本以@开头，例如滴血演出“@toketu.txt”等等。当然读者也可自己编写演出效果。

#### 示例

```c#
CallScript("@toketu2");
```

### StartShakingOfWindow

#### 说明

我对此函数了解甚少，无法完整描述每个参数的作用，好在此函数大部分情况下不需要修改，复制粘贴即可。此函数的效果是让窗口震动一下。

#### 示例

```
StartShakingOfWindow( 248, 40, 0, 0, 2*2, FALSE );
```

### StartShakingOfAllObjects

#### 说明

对此函数了解甚少。此函数的效果是使所有对象（立绘、背景、文本框等）震动一下，因此经常和上面的函数搭配使用。

#### 示例

```
StartShakingOfWindow( 248, 40, 0, 0, 2*2, FALSE );
StartShakingOfAllObjects( 248, 40, 0, 0, 2*2, TRUE );
```

效果是窗口连带所有对象一起震动一下。注意第一个函数最后一个参数要设置为FALSE，第二个设置为TRUE。这样两个函数同时执行且不会执行后面的指令。

### FadeOutBGM

#### 声明

```c#
void FadeOutBGM(unsigned int soundTrack, int time, bool judge);
```

#### 参数

soundTrack: 想要停止播放的BGM的音轨编号

time: 淡出时间

judge: 可取TRUE和FALSE，设置是否允许同时执行后面的指令。TRUE为不允许，FALSE为允许

#### 说明

此函数的作用是使BGM停止播放

#### 示例

```c#
FadeOutBGM( 0, 0, FALSE );
FadeOutBGM( 1, 0, FALSE );
FadeOutBGM( 2, 0, FALSE );
FadeOutBGM( 3, 0, FALSE );
```

### FadeBustshot

#### 声明

```c#
void FadeBustshot(unsigned layer, bool unk1, int unk2, int unk3, int unk4, int time, bool judge);
```

#### 参数

layer：表示要消失的立绘的图层

unk1—unk4未知

time：淡出时间

judge: 可取TRUE和FALSE，设置是否允许同时执行后面的指令。TRUE为不允许，FALSE为允许

#### 说明

本函数的作用是使单个立绘消失

## 进阶函数

这部分的函数比较高级，用于实现较为复杂的演出效果，实际用到的时候很少。我对这些函数的了解也比较少，因此下面不写函数的严格声明，只举示例。

### DrawBustshot

#### 示例

```
DrawBustshot(5, "black", 0, 0, 0, FALSE, 0, 0, 0, 0, 0, 0, 0, 25, 500, TRUE );
```

#### 说明

这个函数主要用于显示特效，也可以简单理解成在屏幕上显示图片，比如示例中显示"black.png"。注意：此函数不会改变背景，而且可以同时显示多个图片，类似立绘。但请不要用这个函数显示立绘，因为其优先级很弱，容易出问题

### DrawFilm

#### 示例

```
DrawFilm（ 2， 176， 155， 104， 255， 0， 1000， TRUE ）;
```

#### 说明

在所有立绘和背景之上绘制彩色滤镜，把屏幕变成各种颜色。2是滤镜图层，176、155、104是RGB编码，255是不透明度（或者说亮度），1000是淡入时间。该函数的效果需要用FadeFilm函数消去。

### Negative

#### 示例

```
Negative( 1000, TRUE );
```

#### 说明

使屏幕反色，该函数的效果需要用FadeFilm函数消去。

### FadeFilm

#### 示例

```
FadeFilm( 500, TRUE );
```

#### 说明

消去DrawFilm和Negative的效果

