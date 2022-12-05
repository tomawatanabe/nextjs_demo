import { useRouter } from "next/router";
import SignUpForm from "../../components/signUp/signUpForm";
import SignUpConfirmation from "../../components/signUp/signUpConfirmation";
import { useForm, FormProvider } from "react-hook-form";
import SignIn from "../../components/SignIn";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Contact = () => {
  const router = useRouter();
  const isConfirm = router.query.confirm;

  const methods = useForm({
    mode: "onSubmit",
    criteriaMode: "all",
  });

  return (
    <div className="wrapper">
      <Header />
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
      <Footer />
    </div>
  );
};

export default Contact;
