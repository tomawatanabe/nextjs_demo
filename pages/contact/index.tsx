import { useRouter } from "next/router";
import ContactForm from "./form";
import ContactConfirmation from "./confirmation";
import { useForm, FormProvider } from "react-hook-form";

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
    </div>
  );
};

export default Contact;
