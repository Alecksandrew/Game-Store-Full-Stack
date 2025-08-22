import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { AUTH_URL } from '../../../BACKEND_URL';
import { type ApiResponse } from '../../../types/responseApiType';

type Status = 'confirming' | 'success' | 'error';


export function useEmailConfirmation() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>('confirming');
  const [message, setMessage] = useState('Confirming your email, please wait...');

  useEffect(() => {
    const emailToken = searchParams.get('emailToken');
    const userId = searchParams.get('userId');

    if (!emailToken || !userId) {
      setStatus('error');
      setMessage('Invalid confirmation link. Required parameters are missing.');
      return;
    }

    const confirmEmail = async () => {
      try {
        const encodedToken = encodeURIComponent(emailToken);
        
        const response = await fetch(
          `${AUTH_URL}/confirm-email?emailToken=${encodedToken}&userId=${userId}`
        );
        
        const data: ApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to confirm email.');
        }

        setStatus('success');
        setMessage(data.message);

      } catch (error) {
        setStatus('error');
        if (error instanceof Error) {
          setMessage(error.message);
        } else {
          setMessage('An unknown error occurred during email confirmation.');
        }
      }
    };
    confirmEmail();
  }, [searchParams]); 

  return { status, message };
}

