"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import Logo from "@/shared/ui/logo";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("이메일 주소를 입력해 주세요.")
    .email("이메일 형식으로 작성해 주세요."),
  password: z
    .string()
    .nonempty("비밀번호를 입력해 주세요.")
    .min(8, "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다."
    ),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [email, password] = useWatch({
    control: form.control,
    name: ["email", "password"],
  });

  const handleSubmit = (values: LoginFormValues) => {
    console.log(values);
  };

  const isSubmitDisabled = !email || !password;

  return (
    <section className="flex min-h-screen items-center justify-center bg-[url('/assets/symbol-lg.svg')] bg-position-[top_5.5%_right] bg-size-[auto_49%] bg-no-repeat">
      <div className="flex h-[598px] w-[500px] flex-col items-center space-y-6 rounded-[10px] bg-white/50 p-8 pt-[72px] shadow-[0px_40px_100px_40px_rgba(3,104,255,0.05)] backdrop-blur-[50px]">
        <div className="mb-[48px]">
          <Logo variant="vertical" />
        </div>
        <div className="space-y-[24px] p-0 w-[328px] text-center">
          <Form {...form}>
            <form
              className="text-left"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-8 mb-3">
                    <FormLabel className="block">아이디</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="이메일 주소를 입력해 주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>&nbsp;</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-8">
                    <FormLabel className="block">비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호를 입력해 주세요."
                        className="not-placeholder-shown:text-2xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>&nbsp;</FormMessage>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isSubmitDisabled}
              >
                로그인
              </Button>
            </form>
          </Form>
          <Link
            className="text-body-small-m text-blue-600 hover:underline"
            href="/signup"
          >
            회원가입
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
