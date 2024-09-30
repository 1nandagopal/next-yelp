import { providerSignUp } from "@/actions";
import AuthForm from "@/components/auth-form";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Navbar,
  NavbarBrand,
} from "@nextui-org/react";
import Link from "next/link";

export default async function AuthPage() {
  return (
    <div className="h-screen">
      <Navbar position="static" maxWidth="full" className="mb-5">
        <Link href="/campgrounds">
          <NavbarBrand>
            <p className="text-3xl font-semibold">Campgrounds</p>
          </NavbarBrand>
        </Link>
      </Navbar>
      <div className="flex justify-center items-center h-[calc(100%-84px)] ">
        <Card className="p-5 w-[350px]">
          <CardBody className="space-y-4">
            <AuthForm />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <hr className="flex-1 border-2 mt-0.5" />
                <div className="text-sm">Or continue via</div>
                <hr className="flex-1 border-2 mt-0.5" />
              </div>
              <div className="flex gap-2">
                <div className="w-full">
                  <form action={providerSignUp.bind(null, "github")}>
                    <Button
                      type="submit"
                      className="bg-black text-white"
                      fullWidth
                    >
                      Github
                    </Button>
                  </form>
                </div>
                <Button fullWidth isDisabled>
                  Google
                </Button>
              </div>
            </div>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
}
