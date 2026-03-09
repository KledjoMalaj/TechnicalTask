import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

type RegisterFormData = {
  email: string
  password: string
}

export function RegisterForm({ className }: React.ComponentProps<"div">) {
  const { register, handleSubmit } = useForm<RegisterFormData>()

  const mutation = useMutation({
    mutationFn: (data: RegisterFormData) => axios.post('http://localhost:3000/admin/register', data),
    onSuccess: () => {
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Something went wrong')
    }
  })

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data)
  }

  return (
      <div className={cn("flex flex-col gap-6 m-5 w-120", className)}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create Admin Account</CardTitle>
            <CardDescription>Enter your details to register</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input {...register('email', { required: true })} id="email" type="email" placeholder="john@example.com" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input {...register('password', { required: true, minLength: 6 })} id="password" type="password" />
              </div>

              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Creating account...' : 'Create Account'}
              </Button>

            </form>
          </CardContent>
        </Card>
      </div>
  )
}