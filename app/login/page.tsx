"use client";

import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog";

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
  const router = useRouter();
  const [isDuplicateLoginOpen, setIsDuplicateLoginOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "로그인에 실패했습니다.");
        setIsLoading(false);
        return;
      }

      if (data.isDuplicateLogin) {
        setIsDuplicateLoginOpen(true);
        setIsLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("로그인 중 오류가 발생했습니다.");
      setIsLoading(false);
    }
  };

  const handleConfirmDuplicateLogin = async () => {
    setIsDuplicateLoginOpen(false);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.getValues("email"),
          password: form.getValues("password"),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "로그인에 실패했습니다.");
        setIsLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("로그인 중 오류가 발생했습니다.");
      setIsLoading(false);
    }
  };

  const isSubmitDisabled = !email || !password || isLoading;

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
              {errorMessage && (
                <div className="text-sm text-red-600 mt-2 mb-2">
                  {errorMessage}
                </div>
              )}
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isSubmitDisabled}
              >
                {isLoading ? "로그인 중..." : "로그인"}
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
      <Dialog
        open={isDuplicateLoginOpen}
        onOpenChange={setIsDuplicateLoginOpen}
      >
        <DialogContent className="w-[328px]! p-6">
          <DialogHeader className="space-y-0">
            <DialogTitle className="mb-4">
              중복 로그인이 불가능합니다.
            </DialogTitle>
            <DialogDescription className="break-keep">
              다른 기기에 중복 로그인 된 상태입니다. [확인] 버튼을 누르면 다른
              기기에서 강제 로그아웃되며, 진행중이던 타이머가 있다면 기록이 자동
              삭제됩니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end">
            <Button onClick={handleConfirmDuplicateLogin}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default LoginPage;
