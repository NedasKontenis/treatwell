import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useMailer = () => {
  const api = axios.create({
    baseURL: 'http://localhost:4000/api',
  });

  return useMutation({
    mutationFn: async ({ title, message }) => {
      return api.post('send-email', {
        subject: title,
        html: `<span>${message}</span>`,
      });
    },
  });
};
