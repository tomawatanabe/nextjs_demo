import { useRouter } from "next/router";
import ContactForm from "../../components/contact/contactForm";
import ContactConfirmation from "../../components/contact/contactConfirmation";
import { useForm, FormProvider } from "react-hook-form";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Contact = () => {
  const router = useRouter();
  const isConfirm = router.query.confirm;

  const methods = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  return (
      <div className="wrapper">
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
        <Link href="/">トップページ</Link>
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
      <Footer />
    </div>
  );
};

export default Contact;
