import { useRouter } from "next/router";
import SignUpForm from "./form";
import SignUpConfirmation from "./confirmation";
import { useForm, FormProvider } from "react-hook-form";

const Contact = () => {
  const router = useRouter();
  const isConfirm = router.query.confirm;

  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all",
  });

  return (
    <div className="wrapper">
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
    </div>
  );
};

export default Contact;
