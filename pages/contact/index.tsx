import { useRouter } from "next/router";
import Link from "next/link";
import ContactForm from "../../components/contact/contactForm";
import ContactConfirmation from "../../components/contact/contactConfirmation";
import { useForm, FormProvider } from "react-hook-form";
import SignIn from "../../components/SignIn";
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
<<<<<<< HEAD
    <SignIn>
      <div className="wrapper">
=======
    <div className="wrapper">
<<<<<<< .merge_file_7gN4Ba
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
=======
      <SignIn>
>>>>>>> cca75fdc8dc3c1c71ed8d9cd908e0879ff580808
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
<<<<<<< HEAD
      </div>
    </SignIn>
=======
      </SignIn>
>>>>>>> .merge_file_DpMESe
    </div>
>>>>>>> cca75fdc8dc3c1c71ed8d9cd908e0879ff580808
  );
};

export default Contact;
