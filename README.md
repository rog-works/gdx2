Gdx2
===

# Requirements

* Node.js
* TypeScript
* Docker
* docker-compose

# APIs

* Gdx2.auth.generateAuthUrl
* Gdx2.auth.getToken
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

### 1. 予め`Google Developers Console`で`Google Drive`用の`client_secret_xxxx.json`を取得しておく

https://console.developers.google.com

### 2. コンフィグをコピー

```
$ cp node_modules/gdx2/config/default.json ./config
```

### 3. `config/default.json`内の`clientSecret`に`client_secret_xxxx.json`の内容をコピー

```
$ vim config/default.json
~
  "clientSecret": <your client secret>
~
```

### 4. 認証用URL取得

```
$ node node_modules/gdx2/dist/bin/auth.js generateAuthUrl `pwd`/config/default.json
~ output auth url ~
```

### 5. ブラウザで上記URLにアクセスし、認証後に表示されたコードをコピー

### 6. `config/default.json`内の`getToken.code`にコードを張り付け

```
$ vim config/default.json
~
  "getToken": {
    "code": "<your code>"
~
```

### 7. トークンを取得

```
$ node node_modules/gdx2/dist/bin/auth.js getToken `pwd`/config/default.json
~ output token ~
```

### 8. `config/default.json`内の`createOAuthClient.token`に表示されたトークンを貼り付け

```
$ vim config/default.json
~
  "createOAuthClient": <your token>
~
```

## Gdx2.files

```typscript:files.ts
import * as fs from 'fs';
import { Gdx2 } from 'gdx2';

const config = JSON.parse(fs.readFileSync('./config/default.json'));
const response = await (new Gdx2(config)).files.list();

console.log(response);
```