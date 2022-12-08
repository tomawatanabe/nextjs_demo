# jordans

中古販売・買取をする EC サイト  
中古品なので基本在庫は各一点のみ



### コンソールに表示されたエラーの解消方法  
- ItemList,mypage  
mapメソッド内のdiv,Link,Imageタグにkeyを付与  
Imageタグに「priority」を記載(書けとコンソールにでていたから書いた、詳細不明なので後ほど調べる)  
  
- api/stocks  
DBのstockにitemsを入れ込む処理  
indexにてAddObjをコンソールに出力させるだけの処理を記載してエラーになっていたので  
useEffectを使用して実行するように変更
