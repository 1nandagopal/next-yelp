import AuthForm from "@/components/auth-form";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

export default async function AuthPage() {
  async function handleSubmit() {
    "use server";
    console.log("logged in");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Card className="p-5 w-[350px]">
          <CardBody className="space-y-4">
            <AuthForm />
            <form>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <hr className="flex-1 border-2 mt-0.5" />
                  <div className="text-sm">Or continue via</div>
                  <hr className="flex-1 border-2 mt-0.5" />
                </div>
                <div className="flex w-full gap-2">
                  <Button className="bg-black text-white" fullWidth>
                    Github
                  </Button>
                  <Button fullWidth isDisabled>
                    Google
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
}
