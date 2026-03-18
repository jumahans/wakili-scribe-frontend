import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authApi } from '@/api/api';
import { 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Eye, 
  EyeOff,
  CheckCircle,
  Scale
} from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      if (!formData.first_name || !formData.last_name || !formData.email) {
        setError('Please fill in all required fields');
        return;
      }
      setStep(2);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await authApi.register({
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-ws-black flex items-center justify-center px-[7vw]">
        <div className="grain-overlay absolute inset-0" />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h2 className="heading-2 text-2xl text-ws-text-primary mb-4">Account Created!</h2>
          <p className="text-ws-text-secondary mb-6">
            Your account is pending approval. Redirecting to sign in...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ws-black flex items-center justify-center px-[7vw] py-20">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ws-black via-ws-black to-ws-coral/5" />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Scale size={24} className="text-ws-coral" />
            <h1 className="font-sora font-bold text-2xl text-ws-text-primary tracking-tight">
              Wakili-Scribe
            </h1>
          </div>
          <p className="text-ws-text-secondary text-sm">Create your legal account</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 1 ? 'bg-ws-coral text-white' : 'bg-white/10 text-ws-text-secondary'
          }`}>
            1
          </div>
          <div className={`w-12 h-px ${step >= 2 ? 'bg-ws-coral' : 'bg-white/20'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 2 ? 'bg-ws-coral text-white' : 'bg-white/10 text-ws-text-secondary'
          }`}>
            2
          </div>
        </div>

        {/* Form Card */}
        <div className="card-glass rounded-2xl p-8 border border-white/10">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-ws-text-secondary flex items-center gap-2">
                      <User size={14} className="text-ws-coral" />
                      First Name
                    </label>
                    <Input
                      placeholder="John"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="bg-ws-black/50 border-white/10 text-ws-text-primary placeholder:text-ws-text-secondary focus:border-ws-coral focus:ring-ws-coral/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-ws-text-secondary flex items-center gap-2">
                      <User size={14} className="text-ws-coral" />
                      Last Name
                    </label>
                    <Input
                      placeholder="Doe"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      className="bg-ws-black/50 border-white/10 text-ws-text-primary placeholder:text-ws-text-secondary focus:border-ws-coral focus:ring-ws-coral/20"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm text-ws-text-secondary flex items-center gap-2">
                    <Mail size={14} className="text-ws-coral" />
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@lawfirm.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-ws-black/50 border-white/10 text-ws-text-primary placeholder:text-ws-text-secondary focus:border-ws-coral focus:ring-ws-coral/20"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm text-ws-text-secondary flex items-center gap-2">
                    <Phone size={14} className="text-ws-coral" />
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+254 700 000 000"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    className="bg-ws-black/50 border-white/10 text-ws-text-primary placeholder:text-ws-text-secondary focus:border-ws-coral focus:ring-ws-coral/20"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm text-ws-text-secondary flex items-center gap-2">
                    <Lock size={14} className="text-ws-coral" />
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-ws-black/50 border-white/10 text-ws-text-primary placeholder:text-ws-text-secondary focus:border-ws-coral focus:ring-ws-coral/20 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ws-text-secondary hover:text-ws-text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-sm text-ws-text-secondary flex items-center gap-2">
                    <Lock size={14} className="text-ws-coral" />
                    Confirm Password
                  </label>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="bg-ws-black/50 border-white/10 text-ws-text-primary placeholder:text-ws-text-secondary focus:border-ws-coral focus:ring-ws-coral/20"
                    required
                  />
                </div>

                {/* Password Requirements */}
                <div className="bg-ws-black/30 rounded-lg p-4 border border-white/5">
                  <p className="text-xs text-ws-text-secondary mb-2">Password requirements:</p>
                  <ul className="space-y-1 text-xs text-ws-text-secondary">
                    <li className={`flex items-center gap-2 ${formData.password.length >= 8 ? 'text-green-400' : ''}`}>
                      <div className={`w-1 h-1 rounded-full ${formData.password.length >= 8 ? 'bg-green-400' : 'bg-ws-text-secondary'}`} />
                      At least 8 characters
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-ws-text-secondary" />
                      Mix of letters and numbers recommended
                    </li>
                  </ul>
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              {step === 2 && (
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-white/20 text-ws-text-primary hover:bg-white/10 font-medium py-3 rounded-full"
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-ws-coral hover:bg-ws-coral/90 text-white font-medium py-3 rounded-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {step === 1 ? 'Continue' : 'Create Account'} <ArrowRight size={18} />
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-ws-text-secondary uppercase tracking-wider">Or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Sign In Link */}
          <p className="text-center text-ws-text-secondary text-sm">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="text-ws-coral hover:text-ws-coral/80 transition-colors font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-ws-text-secondary text-xs mt-8">
          By signing up, you agree to our Terms and Privacy Policy
        </p>
      </div>
    </div>
  );
}