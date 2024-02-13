---
templateKey: blog-post
title: Building a TypeScript Wrapper for react-native-keychain
slug: typescript wrapper react native keychain
date: 2023-06-25T16:12:30.441Z
category: Typescript
tag:
  - react native
  - typescript
---
In the world of React Native development, there are couple of methods for keeping your data safe on the device. One popular library that provides secure storage capabilities is `react-native-keychain`. It's important to note that the actual data stored using `react-native-keychain` is encrypted and protected by the underlying device's secure storage mechanisms, such as the Keychain on iOS and the Keystore on Android. This ensures that the stored data remains secure and inaccessible to unauthorized parties.

While using this library directly in your codebase works fine, creating a wrapper with TypeScript can enhance code maintainability, readability, and type safety. In this article, I would like to show you how I created a TypeScript wrapper for `react-native-keychain` using an abstract class, making it easier to manage and use securely stored data in your React Native applications.

## Creating an abstract class

First, install `react-native-keychain` if you don't have it in your project:

```shell
npm install react-native-keychain
```

For a sake of readability, create a new directory for the abstract class and further handlers. I created `storage` folder and started from creating `Storage.ts` where we put our abstract first. The purpose of creating an abstract class in TypeScript is to define a common structure or interface that other classes can inherit from. Abstract classes cannot be instantiated directly; instead, they serve as blueprints for subclasses. We will use this abstract class later, for handling specific business logic.

```typescript
import Keychain from 'react-native-keychain';

interface IClearResult {
  key: string;
  isKeyRemoved: boolean;
}

export default abstract class Storage<T extends string> {
  private readonly storage: any;

  public constructor(getStorage = (): any => Keychain) {
    this.storage = getStorage();
  }

  protected async get(key: T): Promise<string | undefined> {
    const result = await this.storage.getGenericPassword({ service: key });
    if (result) {
      return result.password;
    }
    return undefined;
  }

  protected async set(key: T, value: string) {
    return this.storage.setGenericPassword(key, value, { service: key });
  }

  protected async clearItem(key: T) {
    return this.storage.resetGenericPassword({ service: key });
  }

  protected async clearItems(keys: T[]): Promise<IClearResult[]> {
    const results = [];
    for (const key of keys) {
      const removeProcessResult = await this.clearItem(key);
      results.push({ key, isKeyRemoved: removeProcessResult });
    }
    return results;
  }
}
```

In the `constructor` I initialize the storage. Next I create few methods that I'll use in any type of storages I'll need in further development. These methods are directly invoking the library functions, like `setGenericPassword`, `getGenericPassword`. Note that I use these methods with `password` in their names, however you don't need to store only password data. You can store any key-value pairs. That's the solution I found in one of github issues regarding <a target="_blank" href="https://github.com/oblador/react-native-keychain/issues/291#issuecomment-682460091">this issue</a>. Thanks to this, you can store your data in a similar way you do in the browser using `localStorage`.

Next step is to actually use this abstract class in other class, which we will use across our app. In my example I needed to create this storage to handle API tokens.

```typescript
import Storage from './storage';

enum StorageItems {
  ACCESS_TOKEN = 'authToken',
  REFRESH_TOKEN = 'refreshToken',
}

export class TokenStorage extends Storage <StorageItems> {
  private static instance?: TokenStorage;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new TokenStorage();
    }

    return this.instance;
  }

  public getAccessToken() {
    return this.get(StorageItems.ACCESS_TOKEN);
  }

  public setAccessToken(accessToken: string) {
    this.set(StorageItems.ACCESS_TOKEN, accessToken);
  }

  public async getRefreshToken() {
    return this.get(StorageItems.REFRESH_TOKEN);
  }

  public setRefreshToken(refreshToken: string) {
    this.set(StorageItems.REFRESH_TOKEN, refreshToken);
  }

  public async clear() {
    return await this.clearItems([StorageItems.ACCESS_TOKEN, StorageItems.REFRESH_TOKEN]);
  }
}

export default TokenStorage.getInstance();
```

In this class I create methods for handling actions regarding only tokens.

## Usage

Finally, we can use `TokenStorage` anywhere in our application.

```typescript
import { TokenStorage } from '@storage';

const handleLogin = () => {
    const loginResponse = async getLogin();
    const { token } = loginResponse;
    await TokenStorage.setAccessToken(token);
}

```

If you need store other data in the storage - simply create another class that will handle actions specific to the domain. It may be current application language, credentials or biometric data.