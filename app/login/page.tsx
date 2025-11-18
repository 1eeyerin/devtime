"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
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
import { Card, CardContent } from "@/shared/ui/card";
import Logo from "@/shared/ui/logo";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("이메일 주소를 입력해 주세요.")
    .email("유효한 이메일 주소를 입력해 주세요."),
  password: z
    .string()
    .nonempty("비밀번호를 입력해 주세요.")
    .min(8, "비밀번호는 8자 이상이어야 합니다."),
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

  const handleSubmit = (values: LoginFormValues) => {
    console.log(values);
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[url('/assets/symbol-lg.svg')] bg-[position:top_5.5%_right] bg-[length:auto_49%] bg-no-repeat">
      <Card className="flex h-[598px] w-[500px] flex-col items-center justify-center space-y-6 rounded-[10px] border-0 bg-white/50 p-8 text-center shadow-[0_40px_100px_40px_rgba(3,104,255,0.05)] backdrop-blur-[50px]">
        <div className="space-y-2">
          <Logo variant="vertical" />
        </div>
        <CardContent className="w-full space-y-6 p-0">
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>아이디</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="이메일 주소를 입력해 주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호를 입력해 주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                로그인
              </Button>
            </form>
          </Form>
          <Link
            className="font-semibold text-blue-600 hover:underline"
            href="/signup"
          >
            회원가입
          </Link>
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginPage;
