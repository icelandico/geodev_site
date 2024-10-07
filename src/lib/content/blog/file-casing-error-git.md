---
templateKey: blog-post
title: Solving a file casing error in Git
slug: file casing error git
date: 2024-10-07T19:43:00.000Z
description: ""
category: JavaScript
tag:
  - git
  - various
---
Lastly I run across the following problem while trying to `push` to remote repository.

```git
Already included file name './path-to-file/InputField.tsx' differs from file name './path-to-file/InputFIeld.tsx' only in casing.
```

The problem lies in file name casing. A few steps earlier I pushed a file with a wrong casing (`InputField`). After few changes I realized this and changed the file name. But while trying to push I received the error above. This may happen If you're working on a case-insensitive file system (like Windows like me), Git might have cached the old name with the wrong casing, and this can cause issues. There are multiple solutions for this problem. I'll show two of them, which I utilized (and both were working).

#### 1. Rename the file through Git

Navigate to the directory with your problematic file and run this commands:

```git
git mv InputFIeld.tsx InputField_temp.tsx
git mv InputField_temp.tsx InputField.tsx
```

#### 2. Clear git cache and add the correct case

Navigate to the directory with your problematic file and run this commands:

```git
git rm --cached InputFIeld.tsx
git add InputField.tsx
```
