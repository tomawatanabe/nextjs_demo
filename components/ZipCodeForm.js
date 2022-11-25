import React, { useState, useEffect } from "react";

//stateを使って管理するフォーム

export default function ZipCodeForm() {
  //入力された郵便番号を保持するstate
  const [zipCode, setZipCode] = useState("");
  // //サジェストされた住所を保持するstate
  const [addressDatas, setAddressDatas] = useState({
    pref: "",
    address:"",
    city: "",
    town: "",
  });

  const codeSuggest = () => {
    if (zipCode) {
      fetch(`https://api.zipaddress.net/?zipcode=${zipCode}`, {
        mode: "cors",
      })
        .then((result) => {
          return result.json();
        })
        .then((result) => {
          console.log(result);
          setAddressDatas({
            ...addressDatas,
            pref: result.data?.pref,
            address: result.data?.address,
            city: result.data?.city,
            town: result.data?.town,
          });
          console.log(result.data);
          console.log(addressDatas);
        });
    }
  };

  return (
    <>
      <div>
        <input
          id="zipcode"
          placeholder="1234567"
          value={zipCode}
          onChange={(e) => {
            setZipCode(e.target.value);
          }}
        />
        <button onClick={codeSuggest}>郵便番号から住所を自動入力</button>
      </div>
      <div>
        <div>
          <input
            id="prefecture"
            value={addressDatas.pref}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            id="prefecture"
            value={addressDatas.address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        {/* <div>
          <input
            id="city"
            value={addressDatas.city}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            id="town"
            value={addressDatas.town}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div> */}
      </div>
    </>
  );
}
