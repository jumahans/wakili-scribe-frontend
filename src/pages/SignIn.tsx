import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ws-black flex items-center justify-center px-[7vw] py-20">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ws-black via-ws-black to-ws-coral/5" />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="font-sora font-bold text-2xl text-ws-text-primary tracking-tight mb-2">
            Wakili-Scribe
          </h1>
          <p className="text-ws-text-secondary text-sm">Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="card-glass rounded-2xl p-8 border border-white/10">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
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

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm text-ws-text-secondary flex items-center gap-2">
                <Lock size={14} className="text-ws-coral" />
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-ws-coral hover:bg-ws-coral/90 text-white font-medium py-3 rounded-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-ws-text-secondary uppercase tracking-wider">Or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-ws-text-secondary text-sm">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-ws-coral hover:text-ws-coral/80 transition-colors font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-ws-text-secondary text-xs mt-8">
          Protected by Wakili-Scribe Security
        </p>
      </div>
    </div>
  );
}