import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useLogin } from "@/hooks/auth/use-login";

export function Login() {
  const { register, handleSubmit, onSubmit, errors } = useLogin();
  return (
    <>
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center bg-[#B99470] p-8 text-primary-foreground md:p-12">
          <div className="mx-auto max-w-[480px] space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-4xl font-bold tracking-tight">
                Welcome Back
              </h1>
              <p className="text-black">Log in to your account to continue</p>
            </div>
            <Card>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Johnn"
                      {...register("username")}
                      required
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="#"
                        className="text-sm font-medium underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                      required
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Sign in
                  </Button>
                </CardFooter>
              </form>
            </Card>
            <div className="mt-4 text-center text-sm">
              <span className="text-black">Don't have an account?</span>{" "}
              <Link
                to="/register"
                className="font-medium text-white hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted md:block">
          <img
            src="https://plus.unsplash.com/premium_photo-1670076513880-f58e3c377903?q=80&w=1436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover"
            style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
          />
        </div>
      </div>
    </>
  );
}
