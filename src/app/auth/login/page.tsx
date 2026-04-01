'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthFormWrapper from '../../../components/AuthFormWrapper';
import SocialAuth from '../../../components/SocialAuth';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaSyncAlt } from 'react-icons/fa';



interface LoginFormData {
  email: string;
  password: string;
  captchaInput: string;
  rememberMe?: boolean;
}

interface ErrorObject {
  email?: string;
  password?: string;
  captcha?: string;
}

const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const LoginPage = () => {
  const router = useRouter();

  const [captcha, setCaptcha] = useState('');
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    captchaInput: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState<ErrorObject>({});
  const [loginAttempts, setLoginAttempts] = useState(3);
  const [showPassword, setShowPassword] = useState(false);

  // Generate captcha hanya saat pertama load
  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setFormData(prev => ({ ...prev, captchaInput: '' }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: ErrorObject = {};
    const email = "2903";
    const password = "241712903";

    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
    } else if (formData.email !== `${email}@gmail.com`) {
      newErrors.email = 'Email harus sesuai dengan format npm kalian (cth. 2903@gmail.com)';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password tidak boleh kosong';
    } else if (formData.password !== password) {
      newErrors.password = 'Password harus sesuai dengan format npm kalian (cth. 241712903)';
    }

    if (!formData.captchaInput.trim()) {
      newErrors.captcha = 'Captcha belum diisi';
    } 
    
    else if (formData.captchaInput.trim().toLowerCase() !== captcha.toLowerCase()) {
      newErrors.captcha = 'Captcha tidak valid';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      if (loginAttempts > 0) {
        const newAttempts = loginAttempts - 1;
        setLoginAttempts(newAttempts);

        toast.error(
          newAttempts === 0
            ? 'Kesempatan login habis!'
            : `Login gagal! Sisa kesempatan: ${newAttempts}`,
          { theme: 'dark', position: 'top-right' }
        );
      }
      return;
    }

    toast.success('Login Berhasil!', {
      theme: 'dark',
      position: 'top-right'
    });
    
    sessionStorage.setItem('isLoggedIn', 'true'); 
    router.push('/home');
  };

  return (
    <AuthFormWrapper title="Login">
      <form onSubmit={handleSubmit} className="space-y-5 w-full">

        <p className="text-center text-sm text-gray-600 font-bold">
          Sisa Kesempatan: {loginAttempts}
        </p>

        {/* EMAIL */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-0 focus:border-black transition duration-200`}
            placeholder="Masukan email"
          />
          {errors.email && <p className="text-red-600 text-sm italic">{errors.email}</p>}
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-0 focus:border-black transition duration-200`}
              placeholder="Masukkan password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-600 text-2xl"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password && <p className="text-red-600 text-sm italic">{errors.password}</p>}
        </div>

        {/* REMEMBER */}
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              checked={formData.rememberMe || false}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))
              }
              className="mr-2"
            />
            Ingat Saya
          </label>

          <Link href="/auth/forgot-password" className="text-blue-600 text-sm font-semibold">
            Forgot Password?
          </Link>
        </div>

        {/* CAPTCHA */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Captcha:</span>
            <span className="font-mono font-bold text-lg bg-gray-100 px-3 py-1.5 rounded">
              {captcha}
            </span>

            <button
              type="button"
              onClick={handleRefreshCaptcha}
              className="text-blue-600 text-xl"
            >
              <FaSyncAlt />
            </button>
          </div>

          <input
            name="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.captcha ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-0 focus:border-black transition duration-200`}
            placeholder="Masukan captcha"
          />
          {errors.captcha && <p className="text-red-600 text-sm italic">{errors.captcha}</p>}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loginAttempts === 0}
          className={`w-full py-2.5 rounded-lg text-white font-semibold
          ${loginAttempts === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={() => {
            setLoginAttempts(3);
            toast.success('Kesempatan login berhasil direset!', {
              theme: 'dark',
              position: 'top-right'
            });
          }}
          disabled={loginAttempts !== 0}
          className={`w-full py-2.5 rounded-lg font-semibold
          ${loginAttempts === 0 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-400 text-white cursor-not-allowed'}`}
        >
          Reset Kesempatan
        </button>

        <SocialAuth />

        <p className="text-center text-sm text-gray-600">
          Tidak punya akun?{' '}
          <Link href="/auth/register" className="text-blue-600 font-semibold">
            Daftar
          </Link>
        </p>

      </form>
    </AuthFormWrapper>
  );
};

export default LoginPage;