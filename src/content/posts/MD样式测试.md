---
title: MD样式测试
published: 2025-12-08 17:55:22
description: 用于测试Markdown语法样式
category: 随笔
tags: [Markdown, CSS, Astro]
slug: 07x3d8x
---

[跳转链接](https://test.almango.cn)

# Simple Tips 测试
!!!note
这是一个 **note** 提示框。
!!!
!!!tip
这是一个 *tip* 提示框。
!!!

!!!warning
这是一个 [warning] 提示框。
!!!

!!!caution
这是一个 `caution` 提示框。
!!!



<!-- 第一步：先引入样式（建议放在页面 <head> 中，全局生效） -->
<style>
  /* 提示框容器基础样式 */
  .admonition {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    border-left: 5px solid; /* border-blue-500 */
    color: rgb(44, 142, 255); /* text-blue-800 */
  }

  /* Note 类型提示框配色 */
  .admonition-note {
    border-color: rgb(44, 142, 255); /* 背景透明度 0.2 */
    background-color: rgba(44, 142, 255, 0.1); /* 背景透明度 0.1 */
    color: rgb(44, 142, 255); /* text-blue-800 */

  }

  /* Tip 类型（可选扩展） */
  .admonition-tip {
    border-color: rgba(54, 201, 120, 1); /* border-green-200 */
    background-color: rgba(54, 201, 120, 0.1); /* 背景透明度 0.1 */
    color: rgba(54, 201, 120, 1); /* text-green-800 */
  }

  /* Warning 类型（可选扩展） */
  .admonition-warning {
    border-color: rgba(255, 57, 57, 1); /* border-yellow-200 */
    background-color: rgba(255, 57, 57, 0.1); /* 背景透明度 0.1 */
    color: rgba(255, 57, 57, 1); /* text-yellow-800 */
  }

  .admonition-caution {
    border-color: rgba(255, 166, 0, 1); /* border-yellow-200 */
    background-color: rgba(255, 166, 0, 0.1); /* 背景透明度 0.2 */
    color: rgba(255, 166, 0, 1); /* text-yellow-800 */
  }

  /* 提示框标题样式 */
  .admonition-title {
    font-weight: 700; /* font-bold */
    margin-bottom: 0.5rem; /* mb-2 */
    text-transform: uppercase;
  }
</style>

<!-- 第二步：使用提示框 HTML 结构 -->
<div class="admonition admonition-note">
  <div class="admonition-title">Note</div>
  Highlights information that users should take into account, even when skimming.
</div>

<!-- 可选：其他类型示例 -->
<div class="admonition admonition-tip">
  <div class="admonition-title"> Tip</div>
  This is a tip for using admonitions without any plugins.
</div>

<div class="admonition admonition-warning">
  <div class="admonition-title">Warning</div>
  Please check the syntax to ensure the style works correctly.
</div>

<div class="admonition admonition-caution">
  <div class="admonition-title">Caution</div>
  This is a caution for using admonitions without any plugins.
</div>