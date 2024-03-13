import React, { useState, ChangeEvent, FormEvent } from 'react'; import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";

export default function CardWithForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(name);
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
      } else {
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Ice Spice" value={name} onChange={handleNameChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pass">Password</Label>
                <Input id="pass" type="password" placeholder="xyz" value={password} onChange={handlePasswordChange}
                />
              </div>
              <CardFooter className="flex justify-center">
                <Button type="submit">Submit</Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}