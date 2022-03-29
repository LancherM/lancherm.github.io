---
title: 复变函数1 前言&复数与复数域
math: true
date: 2022-01-01
category:
  - 数学
tag:
  - 笔记
---

# 1.前言&复数与复数域

## 前言

 此笔记仅为记录我的学习过程，并作为期末复习资料使用，如果能帮到您将是我的荣幸。

使用的教材是Stein的*Complex Analysis*英文影印版，老师上课也用英语板书，所以我会对每个数学名词注明英文。

<img src="/img/OIP-C.jpg">

复变函数，是指以复数作为自变量和因变量的函数，而与之相关的理论就是复变函数论。解析函数是复变函数中一类具有解析性质的函数，复变函数论主要就是研究复数域上的解析函数，因此通常也称复变函数论为解析函数论。是数学体系中相当重要的组成部分。

## 复数与复数域

简单列举一下复变函数的预备知识，大部分都是数学分析知识在复空间上的延拓，没有学过的定理我将给出证明。

***Def 1.1***  复数列 $\{z_{1},\space z_{2},\ldots \}$ **收敛 (Converge)** 于 $w \in \mathbb{C}$ , 如果有
$$
\lim_{n\to \infty}\mid z_{n}-w\mid  = 0
$$
记作
$$
w=\lim_{n\to \infty}z_{n}
$$
可见和实数基本是一样的.

***Def 1.2*** 复数列 $\{z_{n}\}$ 是**柯西列 (Cauchy sequence**) ,如果有
$$
\left| z_{n}-z_{m}\right| \rightarrow 0 \space \space \space as\space n,m \rightarrow 0
$$
也可以用数学分析中的 $\epsilon -N$ 语言叙述, 这里就不多说了.

***Thm 1.3*** 复数集 $\mathbb{C}$ 是**完备 (Complete)** 的.

***Def 1.4*** $D_{r}(z_{0})$ 是以 $z_{0}$ 为中心, 以 $r>0$ 为半径的**开圆盘 (Open disc**) , 如果有
$$
D_{r}(z_{0}) = \{ z\in \mathbb{C}:\left| z-z_{0}\right| < r \}
$$
同样有闭圆盘.

***Def 1.5*** $\overline D_{r}(z_{0})$ 是以 $z_{0}$ 为中心, 以 $r>0$ 为半径的**闭圆盘 (Closed disc**) , 如果有
$$
\overline D_{r}(z_{0}) = \{ z\in \mathbb{C}:\left| z-z_{0}\right| \leq  r\}
$$
***Def 1.6*** **单位圆盘 (Unit disc)** $\mathbb{D}$ 满足
$$
\mathbb{D} = \{ z\in \mathbb{C}:\left| z-z_{0}\right| < 1\}
$$

***Def 1.7*** 给定集合 $\Omega \subset \mathbb{C}$ , 点 $z_{0}$ 为 $\Omega$ **内点 (interior point)**, 如果存在 $r > 0$ 使得
$$
D_{r}(z_{0}) \subset  \Omega
$$
集合的**内部 (interior)** 是所有内点构成的集合.

如果一个集合的所有点都是内点, 那么这个集合是开集.

集合 $\Omega$ 是**闭集**, 当且仅当 $\Omega ^C  =  \mathbb{C}-\Omega$ 为开集.

如果存在点列 $z_{n} \in  \Omega$ , 使得 $\lim_{n \to \infty}z_{n}  =  z_{0}$ 且 $z_{n} \ne z_{0}$ . 则称 $z_{0}$ 为**极限点 (limit point)**.

***Def 1.8*** 集合 $\Omega$ 的**闭包 (closure)** $\overline\Omega$ 定义为 $\Omega$ 与其所有的极限点构成的集合的并集.

集合 $\Omega$ 的**边界 (boundary)** 等于其闭包减去内部, 记作 $\partial \Omega$ .

若存在 $M > 0$ 使得 $\left| z \right|  <  M$ 对于所有 $z \in \Omega$ 成立, 则称集合 $\Omega$ **有界 (bounded)**.

***Def 1.9*** 如果集合 $\Omega$ 有界, 那么定义其**直径 (diagram)** 为
$$
diam(\Omega) =  \sup_{x,m\in \Omega}\left| z-w \right|
$$
**紧集 (impact set)** 是有界闭集.

***Thm 1.10*** 集合 $\Omega \subset \mathbb{C}$ 是紧集当且仅当每一个数列 $\{z_{n}\}\subset \Omega$ 都有极限为 $\Omega$ 中一点的子列.  

***Def 1.11*** $\Omega$ 的 **开覆盖 (open covering)** 是一族开集 $\{U_{\alpha}\}$ (不一定连续) 使得
$$
\Omega \subset \bigcup_{\alpha}U_{\alpha}
$$
***Thm 1.12*** 集合 $\Omega \subset \mathbb{C}$ 是紧集当且仅当每一个开覆盖都有有限子覆盖.

这都是数分中的内容, 证明过程不再详细叙述.

***Prop 1.13*** 如果 $\Omega_{1} \ni \Omega_{2} \ni \cdots \ni \Omega_{n} \ni \cdots$  是 $\mathbb{C}$ 中的非空紧集列, 并且
$$
diam(\Omega_{n}) \rightarrow 0 \space \space \space as\space n \rightarrow \infty
$$
那么就存在唯一点 $w \in \mathbb{C}$ 使得 $w \in \Omega_{n}$ 对于所有 $n$ 成立.

这个命题其实是闭区间套定理的变形, 下面给出该定理的证明.

*Proof.*  在每个 $\Omega_{n}$ 中各取出一个 $z_{n}$ , 那么这些 $z_{n}$ 将构成一个复数列 ${z_{n}}$ . 对于任意 $n> m \in \mathbb{N^*}$ , 都有 $\left| z_{n}-z_{m} \right|<diam(\Omega_{m})$ 成立. 由条件当 $n\rightarrow \infty$ 时 $diam_(\Omega_{n}) \rightarrow 0$ 知: 当 $n,m \rightarrow \infty$ 时 $\left| z_{n}-z_{m} \right| \rightarrow 0$. 因此 ${z_{n}}$ 是柯西列. 柯西列必有极限, 设为 $w$ . 由于 $\Omega_{n}$ 是紧集, 由Thm 1.10知必有极限为 $\Omega_{n}$ 中一点的子列. 但是子列极限唯一, 因此 $w \in \Omega_{n}$ .

下面证明唯一性. 设存在两个符合条件的点 $w_{1}, w_{2}$ . 考虑到 $\left| w_{1}-w_{2} \right|<diam_{n \to \infty}(\Omega_{n})=0$ . 因此 $w_{1}=w_{2}$ . 唯一性成立.

接下来是连通集和区域的概念, 这些都是数分二的知识.

***Def 1.14*** 对于开集 $\Omega$ . 如果存在子集 $\Omega_{1}, \Omega_{2}$ 满足:

(1) $\Omega_{1}, \Omega_{2} \neq \varnothing$ ;

(2) $\Omega=\Omega_{1} \cup \Omega_{2}$ ;

(3) $\Omega_{1} \cap \Omega_{2}=\varnothing$.

那么称 $\Omega$ 是**连通 (connected)**的. 连通开集称为**区域 (region)**.

复数中的最值一般指复数的模的最值, 毕竟复数本身没法比较大小. 下面有一个关于复数最值的定理, 证明十分容易, 就不再叙述了.

***Thm 1.15*** 紧集上的连续函数必有最大值和最小值.






