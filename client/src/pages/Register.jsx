import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import { SignUp } from "@clerk/clerk-react";

/* 
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/users", {
        name,
        email,
        password,
      });
      setMessage("Inscription réussie");
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error.message);
      setMessage("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mt-5 mb-0 w-full max-w-md px-4">
        {message && ( 
          <Alert variant="destructive" className="mt-4 w-[450px]">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="mt-0 grid min-h-[400px] items-center gap-6 lg:grid-cols-2 lg:min-h-[600px] xl:min-h-[800px]">
        <div className="hidden lg:flex items-center justify-center">
          <img
            alt="Soccer"
            className="aspect-square object-cover rounded-r-xl overflow-hidden"
            height="600"
            src="../assets/akern.png"
            width="600"
          />
        </div>
        <div className="mx-6 lg:mx-10 xl:mx-16 space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Bienvenue</h2>
              <p className="text-gray-500 dark:text-gray-400">Entrez vos informations pour vous inscrire</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom *</Label>
                <Input id="name" placeholder="John" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" placeholder="john@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input id="password" type="password" placeholder="*************" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button className="w-full" type="submit" variant="rfc">S'inscrire</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} */

 
export default function Register() {
  return (
      <div className="flex justify-center mt-20">
        <SignUp />
      </div>
  )
}































