'use client'; 

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthFormWrapper from '../../../components/AuthFormWrapper';
import SocialAuth from '../../../components/SocialAuth';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaSyncAlt } from 'react-icons/fa';

type RegisterFormData = {
  username: string;
  email: string;
  nomorTelp: string;
  password: string;
  confirmPassword: string;
  captcha: string;
};

// GENERATE CAPTCHA
const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const RegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<RegisterFormData>();

  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  const [strength, setStrength] = useState(0);
  const [confirmStrength, setConfirmStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  // PASSWORD STRENGTH
  useEffect(() => {
    if (!password) {
      setStrength(0);
      return;
    }
    const value = Math.min(
      (password.length > 7 ? 25 : 0) +
      (/[A-Z]/.test(password) ? 25 : 0) +
      (/[0-9]/.test(password) ? 25 : 0) +
      (/[^A-Za-z0-9]/.test(password) ? 25 : 0),
      100
    );
    setStrength(value);
  }, [password]);

  // CONFIRM PASSWORD STRENGTH
  useEffect(() => {
    if (!confirmPassword) {
      setConfirmStrength(0);
      return;
    }
    const value = Math.min(
      (confirmPassword.length > 7 ? 25 : 0) +
      (/[A-Z]/.test(confirmPassword) ? 25 : 0) +
      (/[0-9]/.test(confirmPassword) ? 25 : 0) +
      (/[^A-Za-z0-9]/.test(confirmPassword) ? 25 : 0),
      100
    );
    setConfirmStrength(value);
  }, [confirmPassword]);

  const getStrengthColor = (val: number) => {
    if (val <= 25) return 'bg-red-500';
    if (val <= 50) return 'bg-yellow-500';
    if (val <= 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const onSubmit = (data: RegisterFormData) => {
    clearErrors();
    let valid = true;

    if (!data.username) {
      setError('username', { message: 'Username wajib diisi' });
      valid = false;
    } else if (data.username.length < 3) {
      setError('username', { message: 'Username minimal 3 karakter' });
      valid = false;
    } else if (data.username.length > 8) {
      setError('username', { message: 'Username maksimal 8 karakter' });
      valid = false;
    }

    if (!data.email) {
      setError('email', { message: 'Email wajib diisi' });
      valid = false;
    } else if (
      !data.email.includes('@') ||
      !(data.email.endsWith('.com') ||
        data.email.endsWith('.net') ||
        data.email.endsWith('.co'))
    ) {
      setError('email', { message: 'Email harus format @ dan .com/.net/.co' });
      valid = false;
    }

    if (!data.nomorTelp) {
      setError('nomorTelp', { message: 'Nomor telepon wajib diisi' });
      valid = false;
    } else if (!/^[0-9]+$/.test(data.nomorTelp)) {
      setError('nomorTelp', { message: 'Nomor telepon hanya boleh angka' });
      valid = false;
    } else if (data.nomorTelp.length < 10) {
      setError('nomorTelp', { message: 'Nomor telepon minimal 10 angka' });
      valid = false;
    }

    if (!data.password) {
      setError('password', { message: 'Password wajib diisi' });
      valid = false;
    } else if (data.password.length < 8) {
      setError('password', { message: 'Password minimal 8 karakter' });
      valid = false;
    }

    if (!data.confirmPassword) {
      setError('confirmPassword', { message: 'Konfirmasi password wajib diisi' });
      valid = false;
    } else if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'Konfirmasi password tidak cocok' });
      valid = false;
    }

    if (!captchaInput || captchaInput !== captcha) {
      setError('captcha', { message: 'Harus sesuai dengan captcha yang ditampilkan' });
      valid = false;
    }

    if (!valid) return;

    toast.success('Register Berhasil!', { theme: 'dark', position: 'top-right' });
    router.push('/auth/login');
  };

  return (
    <AuthFormWrapper title="Register">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">

        {/* USERNAME */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Username <span className="text-gray-500 font-normal">(max 8 karakter)</span>
          </label>
          <input
            {...register('username')}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Masukkan username"
          />
          {errors.username && <p className="text-red-500 text-sm italic">{errors.username.message}</p>}
        </div>

        {/* EMAIL */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Masukkan email"
          />
          {errors.email && <p className="text-red-500 text-sm italic">{errors.email.message}</p>}
        </div>

        {/* NOMOR TELEPON */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input
            type="tel"
            {...register('nomorTelp')}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
            }}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.nomorTelp ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Masukkan nomor telepon"
          />
          {errors.nomorTelp && <p className="text-red-500 text-sm italic">{errors.nomorTelp.message}</p>}
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Masukkan password"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-600">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {password && (
            <>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className={`h-2 rounded ${getStrengthColor(strength)}`} style={{ width: `${strength}%` }}></div>
              </div>
              <p className="text-sm">Strength: {strength}%</p>
            </>
          )}

          {errors.password && <p className="text-red-500 text-sm italic">{errors.password.message}</p>}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Konfirmasi Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Masukkan ulang password"
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-gray-600">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {confirmPassword && (
            <>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className={`h-2 rounded ${getStrengthColor(confirmStrength)}`} style={{ width: `${confirmStrength}%` }}></div>
              </div>
              <p className="text-sm">Strength: {confirmStrength}%</p>
            </>
          )}

          {errors.confirmPassword && <p className="text-red-500 text-sm italic">{errors.confirmPassword.message}</p>}
        </div>

        {/* CAPTCHA */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Captcha:</span>
            <span className="font-mono font-bold bg-gray-100 px-3 py-1 rounded">{captcha}</span>
            <button
              type="button"
              onClick={() => {
                setCaptcha(generateCaptcha());
                setCaptchaInput('');
                clearErrors('captcha');
              }}
              className="text-blue-600 text-lg"
            >
              <FaSyncAlt />
            </button>
          </div>

          <input
            type="text"
            {...register('captcha')}
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.captcha ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Masukkan captcha"
          />
          {errors.captcha && <p className="text-red-500 text-sm italic">{errors.captcha.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">
          Register
        </button>

        <SocialAuth />
      </form>

      <p className="text-center text-sm mt-4 text-gray-600">
        Sudah punya akun?{' '}
        <Link href="/auth/login" className="text-blue-600 font-semibold">
          Login
        </Link>
      </p>
    </AuthFormWrapper>
  );
};

export default RegisterPage;