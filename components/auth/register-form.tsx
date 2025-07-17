"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import FormField from "../common/form-field";
import { Button } from "../ui/button";
import Heading from "../common/heading";
import SocialAuth from "./social-auth";
import {
  RegisterSchema,
  RegisterSchemaType,
} from "../../schemas/registerSchema";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterSchemaType) => {
    console.log("Form submitted with data:", data);
    // Handle login logic here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px] m-auto mt-8 gap-4"
    >
      <Heading center md title="Create a WEBDEV.blog Account" />

      <FormField
        label="Name"
        type="text"
        error={errors.name?.message}
        {...register("name")}
      />

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

      <FormField
        label="Confirm Password"
        type="password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button type="submit" className="w-full">
        Register
      </Button>
      <div className="flex justify-center my-2">Or</div>
      <SocialAuth />
    </form>
  );
};

export default RegisterForm;
