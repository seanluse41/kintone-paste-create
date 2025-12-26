# kintone-paste-create

Allows users to paste a record object into the portal, and quickly create an App.

ポータル画面からレコード形式のJSONを貼り付ければそのままアプリ作成できます。

画像で説明すると：

1. ![Alt text](https://raw.githubusercontent.com/seanluse41/kintone-paste-create/master/img/portal.png)

2. ![Alt text](https://raw.githubusercontent.com/seanluse41/kintone-paste-create/master/img/success.png)

3. ![Alt text](https://raw.githubusercontent.com/seanluse41/kintone-paste-create/master/img/result.png)

## 機能

- 多言語対応（ユーザのロカールを感知する。）
- レコード形式のJSONは外側の `"record": {}`はなくても良い
- レコード番号などの追加できないフィルドはあっても良い、無視される

## 未対応

フィルドコードも指定できたら便利かな

## ユースケース

よく公式Docs（[https://cybozu.dev](https://cybozu.dev)や[https://kintone.dev](https://kintone.dev))では、アプリ作成してからカスタマイズするケースが多い。これがあれば、サイトからコピペーしたら、入力ミスなどなしですぐに作成できる。
ハッカソンとかにも？


## ビルド

1. `npm i`

2. `npm run build`

3. 生成される `/dist/kintone-paste-create.js`を https://xyz.cybozu.com/k/admin/system/customize/　画面からPC用のJavaScriptファイルとしてアップロードすれば完了。