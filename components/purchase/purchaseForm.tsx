import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/purchase.module.css";
import { useCookie } from "../useCookie";

const PurchaseForm = ({
  handleChange,
  handleChangeB,
  imageData,
  imageDataB,
}: any) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const values = getValues();
  const cookieName = useCookie();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //RHFのvaluesオブジェクトの値を配列として定義
    const valuesArr = Object.values(values).slice(0,11);

    // ログインしてなかったら何もしない
    if (cookieName === "userID=" || undefined) {
      return;
      //valuesArrにひとつでもtruthyなものがあったら初期値はセットしない
    } else if (valuesArr.some((ele) => Boolean(ele) === true)) {
      setLoading(false);
      return;
      //valuesArrが全てfalsyだったら初期値をセットする
    } else {
      //DBから値を読み込み
      const get = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/API/users?id=${cookieName}`
        );
        const data = await res.json();
        //デフォルト値としてセット
        setValue("lastName", data[0]?.lastName);
        setValue("firstName", data[0]?.firstName);
        setValue("kanaLastName", data[0]?.kanaLastName);
        setValue("kanaFirstName", data[0]?.kanaFirstName);
        setValue("phone", data[0]?.phoneNumber);
        setValue("email", data[0]?.email);
        setValue("zipCode", data[0]?.zipCode);
        setValue("prefecture", data[0]?.prefecture);
        setValue("city", data[0]?.city);
        setValue("address", data[0]?.address);
        setValue("building", data[0]?.building);
        //setterを呼び出して再レンダリングをかける
        setLoading(false);
      };
      get();
    }
  }, [loading]);

  const onSubmit = () => {
    router.push(`/purchase?confirm=1`);
  };

  const citySuggest = async () => {
    const values = getValues();
    const res = await fetch(
      `https://api.zipaddress.net/?zipcode=${values.zipCode}`,
      {
        mode: "cors",
      }
    );
    const result = await res.json();

    //存在しない郵便番号の場合、アラートを返す
    if (result.code === 404 || result.code === 400) {
      alert("存在しない郵便番号です");
      return;
    }

    setValue("prefecture", result.data.pref);
    setValue("city", result.data.address);
  };

  return (
    <div className={styles.outside}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.kaitori}>
          <span className={styles.midashi}>お客様情報を入力してください。</span>
        </h2>
        <hr />
        <div>
          <label htmlFor="lastName">
            <span className="label-fit label-danger">必須</span>氏名
          </label>

          <input
            id="lastName"
            placeholder="山田"
            {...register("lastName", {
              required: "必須項目です。",
            })}
          />

          <input
            id="firstName"
            placeholder="太郎"
            {...register("firstName", {
              required: "必須項目です。",
            })}
          />

          {(errors.firstName?.message && (
            <span className="formError">
              {errors.firstName?.message as string}
            </span>
          )) ||
            (errors.lastName?.message && (
              <span className="formError">
                {errors.lastName?.message as string}
              </span>
            ))}
        </div>
        <div>
          <label htmlFor="kanaLastName">
            <span className="label-fit label-danger">必須</span>氏名（カナ）
          </label>

          <input
            id="kanaLastName"
            placeholder="ヤマダ"
            {...register("kanaLastName", {
              required: "必須項目です。",
            })}
          />
          <input
            id="kanaFirstName"
            placeholder="タロウ"
            {...register("kanaFirstName", {
              required: "必須項目です。",
            })}
          />

          {(errors.kanaLastName?.message && (
            <span className="formError">
              {errors.kanaLastName?.message as string}
            </span>
          )) ||
            (errors.kanaFirstName?.message && (
              <span className="formError">
                {errors.kanaFirstName?.message as string}
              </span>
            ))}
        </div>
        <div>
          <div>
            <label htmlFor="phoneNumber">
              <span className="label-fit label-danger">必須</span>電話番号
            </label>

            <input
              id="phone"
              placeholder="0312345678"
              {...register("phone", {
                required: "必須項目です。",
                pattern: {
                  value: /^0\d{9,10}$/,
                  message: "電話番号を正しく入力してください",
                },
              })}
            />
            {errors.phone?.message && (
              <span className="formError">
                {errors.phone?.message as string}
              </span>
            )}
          </div>
          <div>
            <span className="notice">*ハイフンなしで入力してください。</span>
          </div>
        </div>
        <div>
          <label htmlFor="email">
            <span className="label-fit label-danger">必須</span>メールアドレス
          </label>

          <input
            id="email"
            placeholder="sample@sample.co.jp"
            {...register("email", {
              required: "必須項目です。",
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                message: "メールアドレスを正しく入力してください",
              },
            })}
          />

          {errors.email?.message && (
            <span className="formError">{errors.email.message as string}</span>
          )}
        </div>
        <div>
          <label htmlFor="postCode">
            <span className="label-fit label-danger">必須</span>郵便番号
          </label>
          <input
            type="text"
            placeholder="1600022"
            {...register("zipCode", {
              required: "必須項目です。",
              pattern: {
                value: /^\d{3}?\d{4}$/,
                message: "郵便番号を正しく入力してください。",
              },
            })}
          ></input>
          <input
            type="button"
            className="Z
            zipCodeBtn"
            onClick={citySuggest}
            value="住所を自動入力"
          />

          {errors.zipCode?.message && (
            <span className="formError">
              {errors.zipCode.message as string}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="prefecture">
            <span className="label-fit label-danger">必須</span>都道府県
          </label>
          <input
            type="text"
            placeholder="東京都"
            id="prefecture"
            {...register("prefecture", { required: "必須項目です。" })}
          />
          {errors.prefecture?.message && (
            <span className="formError">
              {errors.prefecture.message as string}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="city">
            <span className="label-fit label-danger">必須</span>市区町村
          </label>
          <input
            type="text"
            placeholder="新宿区新宿"
            id="city"
            {...register("city", { required: "必須項目です。" })}
          ></input>
          {errors.city?.message && (
            <span className="formError">{errors.city.message as string}</span>
          )}
        </div>
        <div>
          <label htmlFor="address">
            <span className="label-fit label-danger">必須</span>番地
          </label>
          <input
            type="text"
            placeholder="4-3-25"
            id="address"
            {...register("address", { required: "必須項目です。" })}
          />
          {errors.address?.message && (
            <span className="formError">
              {errors.address.message as string}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="building">
            <span className="label-fit label-warning">任意</span>建物名
          </label>
          <input
            type="text"
            placeholder="TOKYU REIT新宿ビル8F"
            id="building"
            {...register("building")}
          />
          <br />
        </div>
        <h2 className={styles.kaitori}>
          <span className={styles.midashi}>
            買取希望商品情報を入力してください。
          </span>
        </h2>
        <hr />
        <div className={styles.formgroupuseditem}>
          <div className="used-item-formA">
            <h3 className={styles.h3tag}>買取希望商品１</h3>
            <div>
              <label htmlFor="itemName">
                <span className="label-fit label-danger">必須</span>品名
              </label>
              <input
                type="text"
                placeholder="NIKE AIR JORDAN 1"
                id="itemName"
                {...register("itemName", { required: "必須項目です。" })}
              />
              {errors.itemName?.message && (
                <span className="formError">
                  {errors.itemName.message as string}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="itemCode">
                <span className="label-fit label-danger">必須</span>品番
              </label>
              <input
                type="text"
                placeholder="555088-101"
                id="itemCode"
                {...register("itemCode", { required: "必須項目です。" })}
              />
              {errors.itemCode?.message && (
                <span className="formError">
                  {errors.itemCode.message as string}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="itemSize">
                <span className="label-fit label-danger">必須</span>サイズ（cm）
              </label>
              <input
                type="text"
                placeholder="28cm"
                id="itemSize"
                {...register("itemSize", { required: "必須項目です。" })}
              />
              {errors.itemSize?.message && (
                <span className="formError">
                  {errors.itemSize.message as string}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="itemColor">
                <span className="label-fit label-danger">必須</span>カラー
              </label>
              <input
                type="text"
                placeholder="白"
                id="itemColor"
                {...register("itemColor", { required: "必須項目です。" })}
              />
              {errors.itemColor?.message && (
                <span className="formError">
                  {errors.itemColor.message as string}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="itemPhoto">
                <span className="label-fit label-danger">必須</span>写真
              </label>
              <input
                //画像ファイルだけでバリデーションする
                accept="image/*"
                type="file"
                id="itemPhoto"
                {...register("itemPhoto", { required: "必須項目です。" })}
                onChange={handleChange}
              />
              {errors.itemPhoto?.message && (
                <span className="formError">
                  {errors.itemPhoto.message as string}
                </span>
              )}
              <div>
                {!!imageData && (
                  <>
                    <span className="subtitle-preview">*プレビュー</span>
                    <output className="preview">
                      <Image
                        src={imageData}
                        alt="画像プレビュー"
                        height={150}
                        width={150}
                      />
                    </output>
                  </>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="itemNote">
                <span className="label-fit label-warning">任意</span>備考
              </label>
              <input
                type="text"
                placeholder="箱無し、傷あり"
                id="itemNote"
                {...register("itemNote")}
              />
            </div>
          </div>
          <div className="used-item-formB">
            <h3 className={styles.h3tag}>買取希望商品２</h3>
            <div>
              <label htmlFor="itemNameB">
                <span className="label-fit label-danger">必須</span>品名
              </label>
              <input
                type="text"
                placeholder="NIKE AIR JORDAN 1"
                id="itemNameB"
                {...register("itemNameB")}
              />
            </div>
            <div>
              <label htmlFor="itemCodeB">
                <span className="label-fit label-danger">必須</span>品番
              </label>
              <input
                type="text"
                placeholder="555088-101"
                id="itemCodeB"
                {...register("itemCodeB")}
              />
            </div>
            <div>
              <label htmlFor="itemSizeB">
                <span className="label-fit label-danger">必須</span>サイズ（cm）
              </label>
              <input
                type="text"
                placeholder="28cm"
                id="itemSizeB"
                {...register("itemSizeB")}
              />
            </div>
            <div>
              <label htmlFor="itemColorB">
                <span className="label-fit label-danger">必須</span>カラー
              </label>
              <input
                type="text"
                placeholder="白"
                id="itemColorB"
                {...register("itemColorB")}
              />
            </div>
            <div>
              <label htmlFor="itemPhotoB">
                <span className="label-fit label-danger">必須</span>写真
              </label>
              <input
                type="file"
                id="itemPhotoB"
                {...register("itemPhotoB")}
                onChange={handleChangeB}
              />
            </div>
            <div>
              {!!imageDataB && (
                <>
                  <span className="subtitle-preview">*プレビュー</span>
                  <output className="preview">
                    <Image
                      src={imageDataB}
                      alt="画像プレビュー"
                      height={150}
                      width={150}
                    />
                  </output>
                </>
              )}
            </div>
            <div>
              <label htmlFor="itemNoteB">
                <span className="label-fit label-warning">任意</span>備考
              </label>
              <input
                type="text"
                placeholder="箱無し、傷あり"
                id="itemNoteB"
                {...register("itemNoteB")}
              />
            </div>
          </div>
        </div>

        <div>
          <p>
            さらに買取希望の方は下記の備考欄に入力をお願い致します。
            <br /> 下記をコピーしてお使いください。
            <br />
            ----------------------------
            <br /> 品名:
            <br /> 品番:
            <br /> サイズ:
            <br /> カラーetc:
            <br /> 備考:
          </p>
          <div>
            <label htmlFor="note">
              <span className="label-fit label-warning">任意</span>備考
            </label>
            <br />
            <textarea
              cols={120}
              rows={15}
              id="note"
              placeholder="買取情報を入力してください"
              {...register("itemAdd")}
              className={styles.form}
            />
          </div>
        </div>
        <div className={styles.btn}>
          <button type="submit" className="idbutton">
            入力内容を確認
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseForm;
