import { useAuthStore } from "@/hooks/store/use-auth-store";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { showToast } from "../ui/showtoast";

export function Dashboard() {
  const { user, clearUser } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    showToast("Logout successfully", "success");
    navigate("/login");
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl font-bold my-6">Welcome Back</h1>
        <Card className="shadow-lg">
          <CardContent>
            <div className="flex items-center mt-4 space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=1409&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </Avatar>
              <div>
                <h1 className="text-2xl font-semibold">{user?.fullName}</h1>
                <h2 className="text-lg  text-slate-400">@{user?.username}</h2>
                <p className="text-sm font-light">
                  I'm a software engineer with a passion for building innovative
                  products
                </p>
                <Button className="mt-4" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
