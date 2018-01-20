Gdx2
===

# Requirements

* Node.js
* TypeScript
* Docker
* docker-compose

# APIs

* Gdx2.auth.generateAuthUrl
* Gdx2.auth.getCredentials
* Gdx2.auth.refreshCredentials
* Gdx2.files.copy
* Gdx2.files.create
* Gdx2.files.delete
* Gdx2.files.export
* Gdx2.files.generateIds
* Gdx2.files.get
* Gdx2.files.list
* Gdx2.files.trash
* Gdx2.files.update
* Gdx2.files.watch

# Usage

## 事前作業

### 1. 予め`Google Developers Console`で`Google Drive`用の`client_secret_xxxx.json`を取得

https://console.developers.google.com

### 2. `client_secret_xxxx.json`をルート配下の`<root>/.google/client_secret.json`に保存

```
$ cp /path/to/client_recret_xxxx.json .google/client_secret.json
```

### 3. (2)で取得したクライアントシークレットの絶対パスを引数にして、認証用URL取得

```
$ npm run auth generateAuthUrl config/default.json .google/client_secret.json
~ output auth url ~
```

### 4. ブラウザで(3)の認証用URLにアクセスし、認証後に表示されたコードをコピー

### 5. (4)で取得したコードに引数に加え、証明情報を取得して`<root>/.google/credentials.json`に保存

```
$ $(npm run auth getCredentials config/default.json .google/client_secret.json <your code>) | grep access_token > .google/credentials.json
~ output token ~
```

## Gdx2.files

```typscript:files.ts
import * as fs from 'fs';
import { Gdx2 } from 'gdx2';

const list = async () => {
	const response = await (new Gdx2('./config/default.json')).files.list();
	console.log(response);
}

list();
```