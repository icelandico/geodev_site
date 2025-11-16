---
templateKey: blog-post
title: More advanced use of console logging
slug: More advanced use of console logging
date: 2025-11-16T15:05:00.000+01:00
description: "Logging values ​​to the console is an integral part of my daily
  work (and probably yours too). We can place all sorts of messages in the
  console: validating data, displaying information after a process has
  completed, or providing developer warnings are just some of the uses of the
  console object."
category: JavaScript
tag:
  - basics
  - typescript
---
Logging values ​​to the console is an integral part of my daily work (and probably yours too). We can place all sorts of messages in the console: validating data, displaying information after a process has completed, or providing developer warnings are just some of the uses of the `console` object.

All these operations and many more can be performed using only the methods available for this object. These include:

- `console.log`
- `console.error`
- `console.debug`
- `console.info`
- `console.warn`

In this post, I'd like to present a more advanced way to manage logging in your application. This approach will bring order to your code and allow us to handle such a trivial operation with a separate module that we can modify as needed. In many projects, I've encountered the use of the `no-console` rule in ESlint, which resulted in scattered exceptions for this rule: `// eslint-disable no-console`. Thanks to the approach I've presented, this rule can be disabled in a single place in the code, because in the application, we won't be using the `console` object, but rather a dedicated class.

### Preparation

First, let's start with interface and enum declarations.

```typescript
interface LoggerInterface {
	debug: (message: string, data?: unknown) => void;
	info: (message: string, data?: unknown) => void;
	warning: (message: string, data?: unknown) => void;
	error: (message: string, error?: Error, data?: unknown) => void;
}

enum LogLevel {
	Debug,
	Info,
	Warning,
	Error,
}
```

Notice that I'm not using the `any` type—I've replaced it with the more specific `unknown`.
The next step is to declare the `LogEvent` helper class.

```typescript
class LogEvent<T = unknown> {
	public readonly id = crypto.randomUUID();

	constructor(
	    public readonly level: LogLevel,
	    public readonly message: string,
	    public readonly data?: T,
	    public readonly error?: T
	) {
	    this.level = level;
	    this.message = message;
	    this.data = data;
	    this.error = error;
	}
}
```

To assign the `id`, I use the `crypto` object available in the browser. This class is used to create the structure of the message object that we log to the console. This message will not only have a body. It will also contain additional information:

- level - compatible with the `LogLevel` enum,
- message - the actual message body,
- data - data we can attach to the message,
- error - if level is of type `Error`, this information will be attached to the object.

Finally, the most important class, which is used to gather information and use the appropriate method on the `console` object.

```typescript
class Logger implements LoggerInterface {
	private readonly logToConsoleEnabled: boolean;

	constructor(logToConsoleEnabled: boolean) {
		this.logToConsoleEnabled = logToConsoleEnabled;
	}

	private logToConsole(event: LogEvent) {
		switch(event.level) {
			case LogLevel.Info:
				console.info(event.message, event);
			break;
			case LogLevel.Warning:
				console.warn(event.message, event);
			break;
			case LogLevel.Error:
		  		console.error(event.message, event);
			break;
			case LogLevel.Debug:
		  		console.debug(event.message, event);
			break;
			default:
				console.log(event.message, event);
		}
	}
	
	private log<T = unknown>(event: LogEvent<T>) {
		if (this.logToConsoleEnabled || event.level && event.level > LogLevel.Error) {
      this.logToConsole(event);
	}}

	private debug<T>(message: string, data: unknown): void {
		this.log(new LogEvent(LogLevel.Debug, message, data))
	}

	error<T>(message: string, error: T, data: unknown): void {
		this.log(new LogEvent(LogLevel.Error, message, data, error))
	}

	info<T>(message: string,  data: unknown): void {
		this.log(new LogEvent(LogLevel.Info, message, data))
	}

	warning<T>(message: string, data: unknown): void {
		this.log(new LogEvent(LogLevel.Warning, message, data))
	}
}

const logger = new Logger(true);
```

The class accepts only one parameter in its constructor, `logToConsoleEnabled`. This can be used to specify the environment in which notifications should be displayed in the console. A common use case is hiding logs in a production environment.

When using an instance of the class, we only use `public` methods, i.e., methods that use specific methods of the `console` object. Below are examples of displayed messages using this class.

#### Debug

```typescript
logger.debug('Should return equation result', {valueX: 10, valueY: 20, result: 30});

"Should return equation result",  LogEvent: {
  "level": 0,
  "message": "Should return equation result",
  "data": {
    "valueX": 10,
    "valueY": 20,
    "result": 30
  },
  "error": undefined,
  "id": "2208fe54-ccbf-495e-81ae-81de1aea28e1"
} 
```

#### Info

```typescript

logger.info('User logged successfully', {user: {role: 'ADMIN'}});

"User logged successfully",  LogEvent: {
  "level": 1,
  "message": "User logged successfully",
  "data": {
    "user": {
      "role": "ADMIN"
    }
  },
  "error": undefined,
  "id": "983e9822-0e94-40fb-a4af-244e164e4e63"
} 
```

#### Warning

```typescript
logger.warning('This is warning!', {user: {name: 'John', age: 20}});

"This is warning!",  LogEvent: {
  "level": 2,
  "message": "This is warning!",
  "data": {
    "user": {
      "name": "John",
      "age": 20
    }
  },
  "error": undefined,
  "id": "0495d630-1917-4664-917b-5e35ce381e9b"
}
```

### Error

```typescript

logger.error('Not Authorized', {errorCode: 401}, {payload: null, userId: 29012});

"Not Authorized",  LogEvent: {
  "level": 3,
  "message": "Not Authorized",
  "data": {
    "payload": null,
    "userId": 29012
  },
  "error": {
    "errorCode": 401
  },
  "id": "3674e926-44d1-4fa8-a5c3-bd9a2e6c6187"
} 

```
