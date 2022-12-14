import styles from "../styles/Sidebar.module.css";
import { useRef, useState, useEffect } from "react";
import Note from "./Note";
import Image from "next/image";

export default function Sidebar(props: any) {
  return (
    <div className={styles.sidebarBox}>
      <Note />
      <div className={styles.imageIcon}>
        <Image
          src="/shoplogo.png"
          alt="syoplogo"
          height={150}
          width={210}
          className={styles.imagefile}
        />
      </div>

      <h3 className={styles.title}>SERIES</h3>
      <div className={styles.box}>
        {/* input onChange={event} ===> if(e.target.checked)  filter e.target.value === item.series   filterで出来た配列を一覧として表示　elseの場合は全画面表示 */}
        <input
          type="checkbox"
          id="posite"
          name="interest"
          value="POSITE SERIES"
          className={styles.hideCheck}
          checked={props.data.notifyFrequency === "POSITE SERIES"}
          onChange={props.handleFrequencyChange}
        />
        <label htmlFor="posite">POSITE SERIES</label>
      </div>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="force"
          name="interest"
          value="AIR FORCE 1 LOW"
          className={styles.hideCheck}
          checked={props.data.notifyFrequency === "AIR FORCE 1 LOW"}
          onChange={props.handleFrequencyChange}
        />
        <label htmlFor="force">AIR FORCE 1 LOW</label>
      </div>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="JORDAN1"
          name="JORDAN1"
          value="JORDAN BRAND 1"
          className={styles.hideCheck}
          checked={props.data.notifyFrequency === "JORDAN BRAND 1"}
          onChange={props.handleFrequencyChange}
        />
        <label htmlFor="JORDAN1">JORDAN BRAND 1</label>
      </div>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="JORDAN5"
          name="JORDAN5"
          value="JORDAN BRAND 5"
          className={styles.hideCheck}
          checked={props.data.notifyFrequency === "JORDAN BRAND 5"}
          onChange={props.handleFrequencyChange}
        />
        <label htmlFor="JORDAN5">JORDAN BRAND 5</label>
      </div>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="JORDAN6"
          name="JORDAN6"
          value="JORDAN BRAND 6"
          className={styles.hideCheck}
          checked={props.data.notifyFrequency === "JORDAN BRAND 6"}
          onChange={props.handleFrequencyChange}
        />
        <label htmlFor="JORDAN6">JORDAN BRAND 6</label>
      </div>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="BLAZER"
          name="BLAZER"
          value="BLAZER"
          className={styles.hideCheck}
          checked={props.data.notifyFrequency === "BLAZER"}
          onChange={props.handleFrequencyChange}
        />
        <label htmlFor="BLAZER">BLAZER</label>
      </div>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="AIR MAX"
          name="AIR MAX"
          value="AIR MAX"
          className={styles.hideCheck}
          checked={props.data.notifyFrequency === "AIR MAX"}
          onChange={props.handleFrequencyChange}
        />
        <label htmlFor="AIR MAX">AIR MAX</label>
      </div>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="DUNK"
          name="DUNK"
          value="DUNK"
          className={styles.hideCheck}
          checked={props.data.notifyFrequency === "DUNK"}
          onChange={props.handleFrequencyChange}
        />
        <label htmlFor="DUNK">DUNK</label>
      </div>
    </div>
  );
}
