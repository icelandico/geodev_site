---
templateKey: blog-post
title: Syncing with Google Drive on linux
slug: syncing with google drive on linux
date: 2026-05-16T16:53:00.000+02:00
description: Use rclone for two way sync with your Google Drive if you're a Linux user.
category: Personal
tag:
  - linux
---
If you're a Linux user like me and you want to have two way sync with Google Drive - you know the pain. It's 2026 and Google still does not offer a Google Drive client for Linux operation system.

Why is that an issue? I write a lot using Obsidian and every note is stored on my Google Drive. When I'm on my mac - I don't have to think about the sync between the computer and Google Drive. When I save my note - it's automatically synced with my GDrive. It does not work the same while I'm on Linux Mint. Sure - I can manually upload the note or other file directly to my drive via browser but it's not 2000' anymore.

Luckily, as always, Linux community came to the rescue. To handle two way sync you just need <a href="https://rclone.org/" target="_blank">rclone</a>. After the installation you have to config it.

```
rclone config
```

The process is very straightforward and it walks you through every step. The sync itself needs one step. 
Before I start working with Obsidian I have to run the sync with the drive.

```
rclone sync drive:Notes ./Notes
```

First parameter is the directory on your GDrive, second parameter indicates the directory on your machine. As you can guess, to sync your local resources with Google Drive you need to reverse the parameters.

```
rclone sync ./Notes drive:Notes 
```
