import { useEffect, useState, useRef } from "react";
import styles from "../styles/Chatbot.module.css";

const Chatbot = () => {
  type userChat = any[];
  //botが話す内容を保存するためのstate
  const [bot, setBot] = useState([
    { key: 1, answer: "こんにちは" },
    { key: 0, anwer: <input type="button" value="はい" /> },
    { key: 2, anwer: "お名前を教えてください" },
  ]);

  //countするためのstate
  const [count, setCount] = useState(0);
  // チャット内容をすべて表示させるためのstate
  const [chat, setChat] = useState<userChat>([
    "こんにちは",
    "お名前を教えてください",
    <input type="button" value="はい" />,
  ]);
  // フォームの値を送信するまで入れておくためのstate
  const [tmpChat, setTmpChat] = useState("");

  const botChat = () => {
    setChat([...chat, tmpChat]);
    setTmpChat("");
  };

  const addChat = () => {
    if (tmpChat === "") {
      alert("文字を入力してください");
      return;
    }
    setChat([...chat, tmpChat]);
    setTmpChat("");
  };

  //自動スクロール(最新のチャットを表示させておく
  const chatArea = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatArea?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    setCount(count + 1);
  });

  return (
    <div className={styles.outside}>
      <h3 className={styles.h3}>こたえないチャットボット</h3>
      <ul className={styles.ul}>
        {chat.map((chat, index) => {
          return <li key={index}>{chat}</li>;
        })}
      </ul>
      <div className={styles.form} ref={chatArea}>
        <input
          type="text"
          name="todo"
          // formの入力値をtmpTodoで持っておく
          onChange={(e) => {
            setTmpChat(e.target.value);
          }}
          value={tmpChat}
        />
        <button onClick={addChat}>送信</button>
      </div>
    </div>
  );
};

export default Chatbot;
