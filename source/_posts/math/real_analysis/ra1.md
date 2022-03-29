---
title: 实变函数1 集与直线上的点集
math: true
date: 2022-01-01
category:
  - 数学
tag:
  - 笔记
---

# 集与直线上的点集

 **数分考了93，超开心！今年的奖学金应该是稳了！**

 实变函数应该是本学期最难的课程, 素有"实变函数学十遍"之称. 上课之余我都在查资料, 找网课以加深对所学知识的理解, 所以摸了好久的鱼. 直到现在, 我对自己的理解程度有了一点点信心, 才斗胆写学习笔记, 错误和理解不到位的地方不可避免, 如果您能指出错误我将感激不尽.

## 集与集的运算

这部分倒没什么好说的, 绝大部分只是集合论的知识. 但是实变函数对普通的集合论定义了极限上的意义, 所以本部分就侧重于极限上的集合论.

### 上限集与下限集

我们的基本思路是类比数列极限的定义给出集合列极限的定义.

首先回顾一下数列极限的定义. 最基本的, 对于数列 $\{a_{n}\}$ , 如果存在 $a \in \mathbb{R}$ 使得当 $n \rightarrow \infty$ 时, $\left| a_{n}-a \right| \rightarrow 0$ .就称 数列 $\{a_{n}\}$ 收敛.

但是对于集合而言, 绝对值的意义不明. 如果定义为元素个数, 那么无限集就很难处理 (后面会引入势的概念来表达"元素个数", 但是仍然不易计算). 说明上面的定义不适合用来推广至集合列. 

幸运的是, 我们还有数列极限的另一个定义.

数列上下极限定义为:
$$
\varlimsup_{n \to \infty} a_{n}=\lim_{n\to \infty}\sup_{k>n}a_{k}
$$

$$
\varliminf_{n\to \infty}a_{n}=\lim_{n\to \infty}\inf_{k>n}a_{k}
$$



也就是上确界的极限与下确界的极限.

那么当 $\varlimsup_{n \to \infty} a_{n}=\varliminf_{n\to \infty}a_{n}$ 时就称 $\lim_{n\to \infty}a_{n}$ 存在.

数学分析中已经证明了这个定义是合理的. 那么仿照这个定义, 我们给出集合列极限的定义.

首先是上限集与下限集.

对于集合列 $\{A_{n}\}$ .其上下限集分别为:
$$
\varlimsup_{n\to \infty}{A_{n}}=\bigcap_{n=1}^\infty \bigcup_{k=n}^\infty A_{k}
$$

$$
\varliminf_{n\to \infty}{A_{n}}=\bigcup_{n=1}^\infty \bigcap_{k=n}^\infty A_{k}
$$

下面解释以下其含义:

对于任意的 $x\in \varlimsup_{n\to \infty}{A_{n}}$ , 那么 $x$ 必然属于无穷多个 $\bigcup_{k=n}^\infty A_{k}$ , 因此也属于无穷多个 $A_{k}$ .也就是说 $\varlimsup_{n\to \infty}{A_{n}}$ 是由属于无穷个 $A_{k}$ 的元素构成的集合. 即
$$
\varlimsup_{n\to \infty}{A_{n}}=\{x:有无穷个A_{k}包含x\}
$$
当然上面等式的反向包含并没有证明, 不过证起来很简单, 所以就不再给出证明了.

对于任意的 $x\in \varliminf_{n\to \infty}{A_{n}}$ , 那么 $x$ 必然属于某个 $\bigcap_{k=n}^\infty A_{k}$ , 因此不包含 $x$ 的 $A_{k}$ 只有有限多个( $\bigcup_{n=1}^k A_{n}$ ) .也就是说 $\varlimsup_{n\to \infty}{A_{n}}$ 是由只有有限个集合不包含的元素构成的集合. 即
$$
\varliminf_{n\to \infty}{A_{n}}=\{x:不包含x的A_{k}只有有限多个\}
$$
反向包含也不证了.

当上限集与下限集相等时, 就称 $\lim_{n\to \infty}A_{n}$ 存在.

举例: 令 $E_{n}$ 满足
$$
E_{n}=\left\{
\begin{aligned}
A & ,  n=2k+1, \\
B & ,  n=2k.
\end{aligned}
\right.
$$
那么有
$$
\varlimsup_{n\to \infty}E_{n}=A\cup B
$$

$$
\varliminf_{n\to \infty}E_{n}=A\cap B
$$

接下来介绍几个性质.

首先是包含关系, 和数列极限很像.
$$
\bigcap_{n=1}^\infty A_{n}\subset \varliminf_{n\to \infty}{A_{n}} \subset \varlimsup_{n\to \infty}{A_{n}} \subset \bigcup_{n=1}^\infty A_{n}
$$
其次是关于余集的两个式子
$$
\left( \varliminf E_{n}\right)^c=\varlimsup E_{n}^c
$$

$$
\left( \varlimsup E_{n}\right)^c=\varliminf E_{n}^c
$$

接下来是一个定理, 和实数列的单调有界函数必收敛类似, 只不过全集也是集合, 有界的条件可以省略掉.

(1) 若 $A_{n}$ 为单调递增集列 (此处的单调递增指后面的集合包含前面的集合), 那么 $\lim_{n\to \infty}A_{n}=\bigcup_{n=1}^\infty A_{n}$ 

(2) 若 $A_{n}$ 为单调递减集列, 那么 $\lim_{n\to \infty}A_{n}=\bigcap_{n=1}^\infty A_{n}$ 

上面几个定理, 仿照实数列很容易证明, 这里就不证明了.

接下来是特征函数的概念, 这个在数分里学过, 不过还是拿出来提一下

设 $A\subset X$, 那么定义特征函数 $\chi_{A}(x)$ 满足
$$
\chi_{A}(x)=\left\{
\begin{aligned}
1 & ,  X\subset A, \\
0 & ,  X\not\subset A.
\end{aligned}
\right.
$$
特征函数有以下的几个性质:
$$
\varlimsup_{n\to \infty}\chi_{A}(x)=\chi_{\varlimsup_{n\to \infty}A_{n}}(x)
$$

$$
\varliminf_{n\to \infty}\chi_{A}(x)=\chi_{\varliminf_{n\to \infty}A_{n}}(x)
$$

$$
\lim_{n\to \infty}\chi_{A_{n}}\space exists \Longleftrightarrow \lim_{n\to \infty}A_{n} \space exists
$$

本节的主要内容大概就是这些, 下一节将介绍对等与势的概念.