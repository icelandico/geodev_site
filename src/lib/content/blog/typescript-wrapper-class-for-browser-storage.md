---
templateKey: blog-post
title: Typescript wrapper class for browser storage
slug: typescript wrapper class for browser storage
date: 2025-12-05T20:42:00.000+01:00
description: Working with localStorage and sessionStorage are essential part of
  frontend development. This post shows how to use this functionality in a
  consistent and organized way.
category: Typescript
tag:
  - basics
  - typescript
  - javascript
---

In your front-end applications, you probably use `localStorage` or `sessionStorage` to store various types of data. Each browser's API allows you to use an object with the same names for this purpose. In this post, I'd like to demonstrate how to use this functionality in a consistent and organized manner.

I'll present the final code now and describe its fragments later in this post.

```typescript

interface StorageServiceInterface {
  setItem<T>(key: string, value: T): void;
  getItem<T>(key: string): T | null;
  removeItem(key: string): void;
  clear(): void;
  getStorage(): Storage;
}

class StorageService implements StorageServiceInterface {
  storagePrefix?: string = "";

  constructor(readonly storage: Storage, storagePrefix?: string) {
    this.storagePrefix = storagePrefix;
  }

  private buildKey(key: string): string {
    return this.storagePrefix ? `${this.storagePrefix}-${key}` : key;
  }

  private serialize<T>(value: T): string {
    return JSON.stringify(value);
  }

  private deserialize<T>(value: string): T {
    return JSON.parse(value) as T;
  }

  public setItem<T>(key: string, value: T) {
    const storageKey = this.buildKey(key);
    const stringValue = this.serialize(value);
    try {
      this.storage.setItem(storageKey, stringValue);
    } catch (err) {
      throw err;
    }
  }

  public getItem<T>(key: string): T | null {
    const storageKey = this.buildKey(key);
    const item = this.storage.getItem(storageKey);
    if (!item) return null;
    try {
      return this.deserialize<T>(item);
    } catch {
      return null;
    }
  }

  public removeItem(key: string) {
    const storageKey = this.buildKey(key);
    this.storage.removeItem(storageKey);
  }

  public getKeys(withPrefix = false): string[] {
    const keys: string[] = [];
    for (let i = 0; i < this.storage.length; i++) {
      const fullKey = this.storage.key(i);
      if (fullKey) {
        if (this.storagePrefix) {
          if (fullKey.startsWith(`${this.storagePrefix}-`)) {
            const cleanKey = fullKey.replace(`${this.storagePrefix}-`, "");
            keys.push(withPrefix ? fullKey : cleanKey);
          }
        } else {
          keys.push(fullKey);
        }
      }
    }
    return keys;
  }

  public clear() {
    this.storage.clear();
  }

  public getStorage(): Storage {
    return this.storage;
  }
}

export const localStorageService = new StorageService(
  localStorage,
  "MY_APP_PREFIX"
);

```

We start with an interface declaration: `StorageServiceInterface`. This isn't necessary, but I like to declare interfaces so that the user can quickly access the public properties this class provides. Remember - when a class `implements` an interface, the members declared on the interface must be publicly accessible within the class.

In the class constructor, you must pass the store type – this can be `localStorage` or `sessionStorage`. Optionally, you can also pass a prefix that will be assigned to each key created from this class. I find this very useful for adding another layer of unique values ​​that can potentially be included in `localStorage`. From experience, I recommend the application name or username. This increases the chance of unique names. It's also easier to manage a group of keys if they have a repeating pattern in its name.

The next three private methods are wrappers for the functionality of key construction, value transformation to a string (this value type is required for `localStorage`), and parsing. 

The next three public methods are the most important elements of this class. It is `setItem`, `getItem`, `removeItem` that we will use most often. `getKeys` method is useful if you want to retrieve all keys associated with your application prefix. I added a parameter to decide if returned keys should have the prefix or not.

Now in your code you need to use the instance of this class.

```typescript
localStorageService.setItem("user-settings", {theme: "dark", tableLimit: 10, windowSize: "medium"});

localStorageService.setItem("isSafetyModalOn", true);

const items = localStorageService.getItem("user-settings");
// "Items", { "theme": "dark", "tableLimit": 10, "windowSize": "medium" }

console.log('Storage keys', localStorageService.getKeys());
console.log('Storage keys with prefix', localStorageService.getKeys(true));

// "Storage keys",  ["user-settings", "isSafetyModalOn"]
// "Storage keys with prefix",  ["MY_APP_KEY-isSafetyModalOn", "MY_APP_KEY-user-settings"]
```
