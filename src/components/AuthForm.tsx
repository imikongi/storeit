"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";

const formSchema = z.object({
  fullName: z.string().min(2).max(50),
});

type FormType = "sign-in" | "sign-up";

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1>{type === "sign-in" ? "Sign in" : "Sign up"}</h1>
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className={"shad-form-item"}>
                    <FormLabel className={"shad-form-label"}>
                      Full name
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className={"shad-input"}
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className={"shad-form-message"} />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className={"shad-form-item"}>
                  <FormLabel className={"shad-form-label"}>Email</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className={"shad-input"}
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className={"shad-form-message"} />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading}
            type="submit"
            className={"form-submit-button"}
          >
            {type === "sign-in" ? "Sign in" : "Sign up"}

            {isLoading && (
              <Image
                src={"/assets/icons/loader.svg"}
                alt={"loader"}
                width={24}
                height={24}
                className={"ml-2 animate-spin"}
              />
            )}
          </Button>

          {errorMessage && <p className={"error-message"}>{errorMessage}</p>}

          <div className={"body-2 flex justify-center"}>
            <p>
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className={"ml-1 font-medium text-brand"}
            >
              {type === "sign-in" ? "Sign in" : "Sign up"}
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AuthForm;
