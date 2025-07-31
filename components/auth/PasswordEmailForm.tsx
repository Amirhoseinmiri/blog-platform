"use client";

import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "../common/Alert";
import { passwordEmail } from "@/actions/auth/password-email";
import {
  PasswordEmailSchema,
  PasswordEmailSchemaType,
} from "../../schemas/passwordEmailSchema";
import { Button } from "../ui/button";
import FormField from "../common/form-field";
import Heading from "../common/heading";

const PasswordEmailForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordEmailSchemaType>({
    resolver: zodResolver(PasswordEmailSchema),
  });

  const onSubmit: SubmitHandler<PasswordEmailSchemaType> = (data) => {
    setError("");
    startTransition(() => {
      passwordEmail(data).then((res) => {
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
      <Heading title="Forgot your WEBDEV.blog password?" lg center />
      <FormField
        id="email"
        {...register("email")}
        error={errors.email?.message}
        placeholder="email"
        disabled={isPending}
      />
      {error && <Alert message={error} error />}
      {success && <Alert message={success} success />}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Send Reset Email"}
      </Button>
    </form>
  );
};

export default PasswordEmailForm;
