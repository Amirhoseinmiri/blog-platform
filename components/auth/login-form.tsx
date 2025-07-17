"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../../schemas/loginSchema";
import FormField from "../common/form-field";
import { Button } from "../ui/button";
import Heading from "../common/heading";
import SocialAuth from "./social-auth";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log("Form submitted with data:", data);
    // Handle login logic here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px] m-auto mt-8 gap-4"
    >
      <Heading center lg title="Login to WEBDEV.blog" />
      <FormField
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <FormField
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button type="submit" className="w-full">
        Login
      </Button>
      <div className="flex justify-center my-2">Or</div>
      <SocialAuth />
    </form>
  );
};

export default LoginForm;
