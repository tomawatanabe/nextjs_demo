import { useRouter } from "next/router";
import PurchaseForm from "../../components/purchase/purchaseForm";
import PurchaseConfirmation from "../../components/purchase/purchaseConfirmation";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

const Purchase = () => {


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
            <PurchaseConfirmation />
          </>
        ) : (
          <>
            <PurchaseForm />
          </>
        )}
      </FormProvider>
    </div>
  );
};

export default Purchase;
