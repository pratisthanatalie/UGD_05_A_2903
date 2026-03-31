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
    formState: { errors, isValid },
    clearErrors,
  } = useForm<RegisterFormData>({
    mode: 'onChange',
  });

  const [captcha, setCaptcha] = useState('');

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [confirmStrength, setConfirmStrength] = useState(0);

  const password = watch('password') || '';
  const confirmPassword = watch('confirmPassword') || '';

  // PASSWORD STRENGTH
  useEffect(() => {
    const strength =
      (password.length > 7 ? 25 : 0) +
      (/[A-Z]/.test(password) ? 25 : 0) +
      (/[0-9]/.test(password) ? 25 : 0) +
      (/[^A-Za-z0-9]/.test(password) ? 25 : 0);

    setStrength(strength);
  }, [password]);

  // CONFIRM PASSWORD STRENGTH
  useEffect(() => {
    const strength =
      (confirmPassword.length > 7 ? 25 : 0) +
      (/[A-Z]/.test(confirmPassword) ? 25 : 0) +
      (/[0-9]/.test(confirmPassword) ? 25 : 0) +
      (/[^A-Za-z0-9]/.test(confirmPassword) ? 25 : 0);

    setConfirmStrength(strength);
  }, [confirmPassword]);

  const getStrengthColor = (val: number) => {
    if (val <= 25) return 'bg-red-500';
    if (val <= 50) return 'bg-yellow-500';
    if (val <= 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const onSubmit = () => {
    toast.success('Register Berhasil!', { theme: 'dark' });
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
            {...register('username', {
              required: 'Username wajib diisi',
              minLength: { value: 3, message: 'Username minimal 3 karakter' },
              maxLength: { value: 8, message: 'Username maksimal 8 karakter' }
            })}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Masukkan username"
          />
          {errors.username && <p className="text-red-500 text-sm italic">{errors.username.message}</p>}
        </div>

        {/* EMAIL */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email wajib diisi',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.(com|net|co)$/,
                message: 'Format email tidak valid'
              }
            })}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Masukkan email"
          />
          {errors.email && <p className="text-red-500 text-sm italic">{errors.email.message}</p>}
        </div>

        {/* NOMOR TELEPON */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input
            type="tel"
            {...register('nomorTelp', {
              required: 'Nomor telepon wajib diisi',
              minLength: { value: 10, message: 'Nomor telepon minimal 10 karakter' }
            })}
            onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.nomorTelp ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              {...register('password', {
                required: 'Password wajib diisi',
                minLength: { value: 8, message: 'Password minimal 8 karakter' }
              })}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              {...register('confirmPassword', {
                required: 'Konfirmasi password wajib diisi',
                validate: (value) =>
                  value === password || 'Konfirmasi password tidak cocok'
              })}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
            <span className="font-mono font-bold bg-gray-100 px-3 py-1 rounded">
              {captcha}
            </span>
            <button
              type="button"
              onClick={() => {
                setCaptcha(generateCaptcha());
                clearErrors('captcha');
              }}
              className="text-blue-600 text-lg"
            >
              <FaSyncAlt />
            </button>
          </div>

          <input
            type="text"
            {...register('captcha', {
              validate: (value) =>
                value?.trim().toLowerCase() === captcha.toLowerCase() ||
                'Harus sesuai dengan captcha yang ditampilkan'
            })}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.captcha ? 'border-black-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Masukkan captcha"
          />

          {errors.captcha && (
            <p className="text-red-500 text-sm italic">
              {errors.captcha.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded font-bold text-white bg-blue-600 hover:bg-blue-700`}
        >
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