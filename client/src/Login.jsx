import React, { useState } from 'react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      console.log('Login successful');
      setMessage('Connexion réussie');
    } catch (error) {
      console.error('Error logging in: ', error.message);
      setMessage('Erreur lors de la connexion');
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Se connecter</CardTitle>
        <CardDescription>Connectez-vous à votre compte.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@doe.com"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*******"
              />
            </div>
          </div>
          <Button type="submit">Se connecter</Button>
          {message && (
            <p style={{ color: message === 'Connexion réussie' ? 'green' : 'red' }}>{message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
