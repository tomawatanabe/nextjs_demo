# jordans

中古スニーカーを販売する EC サイトを作成する。


### コンソールに表示されたエラーたちの解消方法  
- ItemList  
mapメソッド内のdiv,Link,Imageタグにkeyを付与
Imageタグに「priority」を記載(書けとコンソールにでていたから書いた、詳細不明なので後ほど調べる)

- api/stocks  
DBのstockにitemsを入れ込む処理
indexにてAddObjをコンソールに出力させるだけの処理を記載してエラーになっていたので
useEffectを使用して実行するように変更
