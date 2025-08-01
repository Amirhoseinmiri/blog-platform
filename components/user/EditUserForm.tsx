"use client";

import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "../common/Alert";
import { User } from "@prisma/client";
import {
  EditProfileSchema,
  EditProfileSchemaType,
} from "@/schemas/EditProfileSchema";
import { editUser } from "@/actions/users/edit-user";
import { tags } from "@/lib/tags";
import { deleteUser } from "@/actions/users/delete-user";
import { signOut } from "next-auth/react";
import Heading from "../common/heading";
import FormField from "../common/form-field";
import { Button } from "../ui/button";

const EditUserForm = ({
  user,
  isCredentials,
}: {
  user: User;
  isCredentials: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleting] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [deleteError, setDeleteError] = useState<string | undefined>("");
  const [deleteSuccess, setDeleteSuccess] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileSchemaType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user.name || undefined,
      email: user.email || undefined,
      bio: user.bio || undefined,
      tags: user.tags || undefined,
    },
  });

  const onSubmit: SubmitHandler<EditProfileSchemaType> = (data) => {
    setSuccess("");
    setError("");
    startTransition(() => {
      editUser(data, user.id).then((res) => {
        if (res?.error) {
          setError(res.error);
        }

        if (res?.success) {
          setSuccess(res.success);
        }
      });
    });
  };

  const onDelete = () => {
    setDeleteSuccess("");
    setDeleteError("");
    startDeleting(() => {
      deleteUser(user.id).then((res) => {
        setDeleteError(res.error);
        setDeleteSuccess(res.success);
        if (res.success) {
          setTimeout(() => {
            signOut();
          }, 5000);
        }
      });
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-[500px] m-auto mt-8 gap-2"
      >
        <Heading title="Update Profile" lg />
        <FormField
          id="name"
          {...register("name")}
          error={errors.name?.message}
          placeholder="name"
          disabled={isPending}
          label="Name"
        />
        {isCredentials && (
          <FormField
            id="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="email"
            disabled={isPending || !isCredentials}
            label="Email"
          />
        )}

        <FormField
          id="bio"
          {...register("bio")}
          error={errors.bio?.message}
          placeholder="bio"
          disabled={isPending}
          label="Bio"
        />

        <fieldset className="flex flex-col">
          <legend className="mb-2 pr-2">Select Tags</legend>
          <div className="flex gap-4 flex-wrap w-full">
            {tags.map((tag) => {
              if (tag === "All") return null;

              return (
                <label key={tag} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={tag}
                    {...register("tags")}
                    disabled={false}
                  />
                  <span>{tag}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {error && <Alert message={error} error />}
        {success && <Alert message={success} success />}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
      <div className="max-w-[500px] m-auto mt-12">
        <div className="text-rose-500">
          <Heading title="Danger Zone" lg />
        </div>
        {deleteError && <Alert message={deleteError} error />}
        {deleteSuccess && <Alert message={deleteSuccess} success />}
        <Button
          variant={"outline"}
          type="button"
          className="mt-4"
          onClick={() => onDelete()}
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </Button>
      </div>
    </>
  );
};

export default EditUserForm;
