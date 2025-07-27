"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { verifyEmail } from "../../actions/auth/email-verification";
import Heading from "../common/heading";
import Alert from "../common/Alert";
import { Button } from "../ui/button";

const EmailVerificationClient = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const token = searchParams.get("token");
  useEffect(() => {
    if (!token) {
      return;
    }
    verifyEmail(token).then((response) => {
      if (response.error) {
        setError(response.error);
      } else if (response.success) {
        setSuccess(response.success);
      } else {
        setError("An unexpected error occurred.");
      }
    });
    setLoading(false);
  }, [token]);

  return (
    <div className="border-2 rounded-md p-2 flex flex-col items-center mx-auto max-w-[400px] my-8">
      <Heading title="WEBDEV.blog" center />
      {loading && <p>Loading...</p>}
      {success && <Alert success message={success} />}
      {error && <Alert error message={error} />}
      {success && (
        <Button onClick={() => router.push("/login")}>Go to Login</Button>
      )}
    </div>
  );
};

export default EmailVerificationClient;
