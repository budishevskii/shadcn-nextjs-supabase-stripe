"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { handleRequest } from "@/utils/auth-helpers/client";
import { signUp } from '@/utils/auth-helpers/server';

type LandingFormProps = {
  redirectMethod: 'client' | 'server';
};

export const LandingForm = ({ redirectMethod }: LandingFormProps): React.JSX.Element => {
  const _router = useRouter();
  const router = redirectMethod === 'client' ? _router : null;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    subscriptionType: "monthly",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signUp, router);
    setIsSubmitting(false);
  };  

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="w-full max-w-md shadow-xl rounded-2xl p-6">
      <CardContent>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              autoComplete='email'
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              autoComplete='new-password'
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              autoComplete='new-password'
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <Label>Subscription Type</Label>
            <RadioGroup
              name="subscriptionType"
              value={formData.subscriptionType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, subscriptionType: value }))
              }
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly Subscription</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-time" id="one-time" />
                <Label htmlFor="one-time">One-Time Purchase</Label>
              </div>
            </RadioGroup>
          </div>          
          <Button type="submit" className="w-full" disabled={isSubmitting}>I&apos;m in</Button>
        </form>
      </CardContent>
    </Card>
  );
};
