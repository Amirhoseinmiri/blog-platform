import React from "react";
import Container from "@/components/layout/container";
import RegisterForm from "@/components/auth/register-form";
import { db } from "../../../lib/db";

const RegisterPage = () => {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
