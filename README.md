# jordans

中古販売・買取をする EC サイト 。
中古品なので基本在庫は各一点のみ。

### インストールするライブラリ

"@fortawesome/fontawesome-svg-core": "^6.2.1",  
 "@fortawesome/free-regular-svg-icons": "^6.2.1",  
 "@fortawesome/free-solid-svg-icons": "^6.2.1",  
 "@fortawesome/react-fontawesome": "^0.2.0",  
 "@react-spring/web": "^9.6.0",  
 "@splidejs/react-splide": "^0.7.12",  
 "@supabase/supabase-js": "^2.2.0",  
 "@types/formidable": "^2.0.5",

### コンソールに表示されたエラーの解消方法

- ItemList,mypage  
  map メソッド内の div,Link,Image タグに key を付与  
  Image タグに「priority」を記載  

- api/stocks  
  DB の stock に items を入れ込む処理  
  index にて AddObj をコンソールに出力させるだけの処理を記載してエラーになっていたので  
  useEffect を使用して実行するように変更
