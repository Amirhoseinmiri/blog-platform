"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../../schemas/loginSchema";
import FormField from "../common/form-field";
import { Button } from "../ui/button";
import Heading from "../common/heading";
import SocialAuth from "./social-auth";
import { login } from "../../actions/auth/login";
import React, { useState, useTransition } from "react";
import Alert from "../common/Alert";
import { useRouter, useSearchParams } from "next/navigation";
import { LOGIN_REDIRECT } from "../../route";
import Link from "next/link";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    setError("");
    startTransition(() => {
      login(data).then((res) => {
        if (res?.error) {
          router.replace("/login");
          setError(res.error);
        }

        if (!res?.error) {
          router.push(LOGIN_REDIRECT);
        }

        if (res?.success) {
          setSuccess(res.success);
        }
      });
    });
  };

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already linked to another account"
      : searchParams.get("error") === "Configuration"
        ? "Invalid configuration"
        : "";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px] m-auto mt-8 gap-4"
    >
      <Heading center lg title="Login to WEBDEV.blog" />
      <FormField
        label="Email"
        disabled={isPending}
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <FormField
        label="Password"
        type="password"
        disabled={isPending}
        error={errors.password?.message}
        {...register("password")}
      />
      {error && <Alert error message={error} />}
      {success && <Alert success message={success} />}
      {urlError && <Alert error message={urlError} />}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
      <div className="flex justify-center my-2">Or</div>
      <SocialAuth />
      <div className="flex items-end justify-end">
        <Link
          className="mt-2 text-sm underline text-slate-700 dark:text-slate-300"
          href="/password-email-form"
        >
          Forgot Password?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
