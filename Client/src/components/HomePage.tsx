import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label/Label";


export default function CardWithForm() {
  return (
    <div className="flex justify-center items-center mt-20">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Ice Spice" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pass">Password</Label>
                <Input id="pass" placeholder="xyz" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  )
}