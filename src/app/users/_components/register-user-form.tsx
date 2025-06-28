'use client';
import { createUserAction } from '@/app/actions/create-user-action';
import LoadingSpinner from '@/components/loading-spinner';
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
import { useTransition } from 'react';
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

  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: RegisterUserFormValues) {
    startTransition(async () => {
      try {
        await createUserAction(values);
        form.reset();
      } catch (err: unknown) {
        console.log('Erro ao cirar usuário:', err);
      }
    });
  }

  function handleCancel() {
    form.reset();
    form.clearErrors();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex items-start gap-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input label="Nome de usuário" {...field} />
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
                  <FormControl>
                    <Input label="Cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-start gap-8">
            <div className="flex flex-col w-full gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input label="Nome completo" {...field} />
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
                    <FormControl>
                      <Input label="E-mail" {...field} />
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
                <FormItem className="w-full flex flex-col gap-4">
                  <FormLabel className="font-medium text-sm text-neutral-400 uppercase  ">
                    Dias da semana
                  </FormLabel>
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
                                      : field.onChange(
                                          field.value?.filter((value) => value !== day),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal text-neutral-800">
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
        </div>

        <div className="flex items-center gap-4">
          <Button className="w-fit uppercase " type="submit" disabled={isPending}>
            {isPending && <LoadingSpinner />}
            {isPending ? 'Registrando...' : 'Registrar'}
          </Button>
          <Button
            className="w-fit uppercase text-secondary-purple hover:text-secondary-purple/90"
            variant={'ghost'}
            type="button"
            disabled={isPending}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
}
