---
title: 复变函数2 复平面上的函数
math: true
date: 2022-01-01
category:
  - 数学
tag:
  - 笔记
---

# 2.复平面上的函数

上文介绍了集合与极限方面的基础知识, 绝大部分都只是简单推广, 几乎没有体现出复空间的特性. 下面将介绍导数和数列在复空间上的推广

## 全纯

先是导数.

***Def 1.16*** 设 $\Omega$ 为 $\mathbb{C}$ 上的开集, $f$ 为 $\Omega$ 上的复值函数. $f$ 称为在点 $z_{0}$ 上的**全纯函数 (holomorphic function)** , 如果 $\frac{f(z_{0}+h)-f(z_{0})}{h}$ 当 $h \to 0$ 时极限存在. 并记

$$
f′(x)=\lim_{h \to 0} \frac{f(z_{0}+h)−f(z_{0})}h
$$  

如果 $f$ 在 $\mathbb{C}$ 上处处全纯, 则称 $f$ **全纯** 

和数学分析中的很多知识一样，用定义来判定一个函数是否全纯往往很困难，下面给出其它的判定方法

可以把 $f(x+iy)=u+iv$ 视作二元函数 $f(x,y)=(u(x,y),v(x,y))$ . 这样 $f$ 全纯等价于二元函数 $f$ 可导, 也就是 $\lim_{h \rightarrow 0}{}\frac{f(z_{0}+h)−f(z_{0})}h$ 存在. 这样的话,  $h$ 从任何方向趋于0得到的结果都是一样的. 比如从 $x$ 方向趋近于0
$$
\lim_{x \rightarrow 0}{\frac{f(x_{0}+x,y)-f(x_{0},y)}{x}}=\frac{\partial f}{\partial x}(z_{0})
$$
从 $y$ 方向趋近于0
$$
\lim_{y \rightarrow 0}{\frac{f(x,y+y_{0})-f(y_{0})}{iy}}=\frac{1}{i}\frac{\partial f}{\partial y}(z_{0})
$$
这两个应该是相等的.展开, 分离实部虚部可以得到:
$$
\frac{\partial u}{\partial x}=\frac{\partial v}{\partial y} \space and\space \frac{\partial u}{\partial y}=-\frac{\partial v}{\partial x}
$$
上式称为**柯西-黎曼方程(Cauchy-Riemann equations)** . 这个方程将实分析和复分析联系了起来, 是全纯函数的重要性质之一.

为了方便, 约定两个记号:
$$
\frac{\partial}{\partial z}=\frac{1}{2}\left( \frac{\partial}{\partial x}+\frac{1}{i}\frac{\partial}{\partial y}\right)
$$

$$
\frac{\partial}{\partial \overline z}=\frac{1}{2}\left( \frac{\partial}{\partial x}-\frac{1}{i}\frac{\partial}{\partial y}\right)
$$

全纯函数还有以下的性质:

***Prop 2.1*** 如果 $f$ 在 $z_{0}$ 处全纯, 那么
$$
\frac{\partial f}{\partial \overline z}(z_{0})=0 \space \space and \space \space f^\prime (z_{0})=\frac{\partial f}{\partial z}(z_{0})=2\frac{\partial u}{\partial z}(z_{0})
$$
这个命题的证明的大致思路如下:

首先第一个等式正是我们得到柯西-黎曼方程时用到的等式. 

其次对于第二个等式, 我们先把 $f^\prime (z_{0})$ 写出来, 恰好是 $\frac{\partial f}{\partial z}(z_{0})$ . 之后写出Jacobi行列式并展开. 注意到二元函数的Jacobi行列式正是 $f^\prime (z_{0})h$ , 两边一对照就能得到结论.

上面写出来的仅仅是全纯函数的性质, 或者说是必要条件, 依然无法判定全纯. 对此, 我们有以下的定理

***Thm 2.2*** 假设 $f$ 是定义在开集 $\Omega$ 上的复值函数. 如果 $u$ 和 $v$ 连续可微且满足柯西-黎曼方程, 那么 $f$ 是 $\Omega$ 上的全纯函数, 而且 $f^\prime (z)=\frac{\partial f}{\partial z}$ .

这个定理就可以判定全纯啦. 这个定理很自然, 但是一些难以分离实部虚部的函数没法判定.

全纯部分的知识大概就这么多, 下面我们讲级数.

## 级数

先看一个例子:
$$
e^z=\sum_{n=1}^\infty \frac{z^n}{n!}
$$
这是将实分析中的指数级数展开式搬了过来. 同理也有三角函数的级数展开式
$$
\sin(z)=\sum_{n=1}^\infty (-1)^n\frac{z^{2n}}{(2n)!}
$$

$$
\cos(z)=\sum_{n=1}^{\infty}(-1)^n\frac{z^{2n+1}}{(2n+1)!}
$$

其实这两个正是正弦余弦函数的定义式

我们有欧拉公式:
$$
\cos(z)=\frac{e^{iz}+e^{-iz}}{2}
$$

$$
\sin(z)=\frac{e^{iz}-e^{-iz}}{2i}
$$

通过这两个等式可以方便地计算三角函数取复数时的值, 实际上正是前面学过的双曲正弦和双曲余弦函数. 还可以得到一些奇奇怪怪的结论, 例如余弦函数不是有界的等等.

下面考虑对数函数. 设 $z=e^{x+iy}$ 那么 $x+iy=\log(z)$ . 又考虑到 $\left| z\right |=e^x$ , $y=\arg\space z$ ,有
$$
\log(z)=\log(\left| z\right|)+\arg\space z
$$
 这里的 $arg\space z$ 可以取很多值, 因此对数函数是一个多值函数. 但是如果指定支(branch), 那么取值只有一个. 也就是
$$
\arg_{\alpha}\space z \in(\alpha,\alpha +2\pi)
$$
特别地, 主值(principle value)或主枝定义为:
$$
Arg \space z \in (-\pi,\pi)
$$
