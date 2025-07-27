"use client";
import React, { useState, useTransition } from "react";

const PasswordReset = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  return <div></div>;
};

export default PasswordReset;
