import { useRouter } from "next/router";
import Link from "next/link";
import ContactForm from "../../components/contact/contactForm";
import ContactConfirmation from "../../components/contact/contactConfirmation";
import { useForm, FormProvider } from "react-hook-form";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

const Contact = () => {
  const router = useRouter();
  const isConfirm = router.query.confirm;

  const methods = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  return (

    <div className="wrapper">
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> bf8a4e497a556a0bb0a3d5e8fd8f2d1d35d411e8
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
      <Link href="/">トップページへ</Link>
      <Footer />
<<<<<<< HEAD
>>>>>>> f416c229b6c86f96f6433f125b7406d1fb888d78
=======
>>>>>>> bf8a4e497a556a0bb0a3d5e8fd8f2d1d35d411e8
    </div>
  );
};

export default Contact;
