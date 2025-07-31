"use client";

import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "../common/Alert";
import { useSearchParams } from "next/navigation";
import {
  PasswordResetSchema,
  PasswordResetSchemaType,
} from "../../schemas/PasswordResetSchema";
import FormField from "../common/form-field";
import Heading from "../common/heading";
import { Button } from "../ui/button";
import { passwordReset } from "../../actions/auth/password-reset";

const PasswordResetFormClient = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(PasswordResetSchema),
  });

  const token = searchParams.get("token");

  const onSubmit: SubmitHandler<PasswordResetSchemaType> = (data) => {
    setError("");
    startTransition(() => {
      passwordReset(data, token).then((res) => {
        if (res?.error) {
          setError(res.error);
        }

        if (res?.success) {
          setSuccess(res.success);
        }
      });
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px] m-auto mt-8 gap-2"
    >
      <Heading title="Enter your new WEBDEV.blog password?" lg center />
      <FormField
        id="password"
        {...register("password")}
        error={errors.password?.message}
        placeholder="password"
        type="password"
        disabled={isPending}
      />
      <FormField
        id="confirmPassword"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
        placeholder="confirmPassword"
        type="password"
        disabled={isPending}
      />
      {error && <Alert message={error} error />}
      {success && <Alert message={success} success />}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Save New Password"}
      </Button>
    </form>
  );
};

export default PasswordResetFormClient;
