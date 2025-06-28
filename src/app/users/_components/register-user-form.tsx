'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ALL_DAYS } from '@/constants/all-days';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const registerUserSchema = z.object({
  username: z.string().min(3, 'Usuário é obrigatório'),
  name: z.string().min(3, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  city: z.string().min(3, 'Cidade é obrigatória'),
  weekDays: z
    .array(z.string())
    .refine((value) => value.some((day) => day), 'Selecione pelo menos um dia da semana'),
});

type RegisterUserFormValues = z.infer<typeof registerUserSchema>;

export default function RegisterUserForm() {
  const form = useForm<RegisterUserFormValues>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      username: '',
      name: '',
      email: '',
      city: '',
      weekDays: [],
    },
  });

  function onSubmit(values: RegisterUserFormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-start gap-4">
          <div className="flex flex-col w-full gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="weekDays"
            render={() => (
              <FormItem className="w-full">
                <FormLabel className="uppercase">Dias da semana</FormLabel>
                <div className="w-full flex-wrap grid grid-cols-5 gap-4">
                  {ALL_DAYS.map((day) => (
                    <FormField
                      key={day}
                      control={form.control}
                      name="weekDays"
                      render={({ field }) => {
                        return (
                          <FormItem key={day} className="flex flex-row items-center">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(day)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, day])
                                    : field.onChange(field.value?.filter((value) => value !== day));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {day.substring(0, 3)}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
