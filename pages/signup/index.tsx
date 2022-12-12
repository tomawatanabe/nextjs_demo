import { useRouter } from "next/router";
import SignUpForm from "../../components/signUp/signUpForm";
import SignUpConfirmation from "../../components/signUp/signUpConfirmation";
import { useForm, FormProvider } from "react-hook-form";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import styles from "../../styles/purchase.module.css";
import PageTop from "../../components/pageTop";
import SignCheck from "../../components/signUp/Signcheck";

const Contact = () => {
  const router = useRouter();
  const isConfirm = router.query.confirm;

  const methods = useForm({
    mode: "onSubmit",
    criteriaMode: "all",
  });

  return (
    <div className="wrapper">
      <SignCheck>
        <Header />
        <h1 className={styles.kaitorititle}>会員登録フォーム</h1>
        <FormProvider {...methods}>
          {isConfirm ? (
            <>
              <SignUpConfirmation />
            </>
          ) : (
            <>
              <SignUpForm />
            </>
          )}
        </FormProvider>
        <Link href="/" className={styles.link}>
          トップページへ
        </Link>
        <PageTop />
        <Footer />
      </SignCheck>
    </div>
  );
};

export default Contact;
