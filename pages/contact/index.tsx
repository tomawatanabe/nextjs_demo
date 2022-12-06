import { useRouter } from "next/router";
import ContactForm from "../../components/contact/contactForm";
import ContactConfirmation from "../../components/contact/contactConfirmation";
import { useForm, FormProvider } from "react-hook-form";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import styles from "../../styles/purchase.module.css";
import PageTop from "../../components/pageTop";

const Contact = () => {
  const router = useRouter();
  const isConfirm = router.query.confirm;

  const methods = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  return (
    <div className="wrapper">
      <Header />
      <FormProvider {...methods}>
        {isConfirm ? (
          <>
            <ContactConfirmation />
          </>
        ) : (
          <>
            <ContactForm />
          </>
        )}
      </FormProvider>
      <br />
      <Link href="/" className={styles.link}>
        トップページへ
      </Link>
      <PageTop />
      <Footer />
    </div>
  );
};

export default Contact;
