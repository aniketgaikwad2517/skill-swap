import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Repeat, 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  AlertCircle,
  ArrowLeft,
  Info
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

interface AuthPageProps {
  initialMode?: 'login' | 'signup' | 'forgot';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { 
    login, 
    signup, 
    forgotPassword, 
    loginWithGoogle, 
    navigateTo, 
    allUsers 
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'verify'>(initialMode);
  
  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showBackendInfo, setShowBackendInfo] = useState(false);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);
    const result = await login(email, password, rememberMe);
    setLoading(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }
    if (!agreedToTerms) {
      setErrorMessage('You must accept the terms of service and community guidelines.');
      return;
    }

    setLoading(true);
    const result = await signup(name, email, password);
    setLoading(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Could not create account. Please try again.');
    } else if (result.requiresEmailVerification) {
      setMode('verify');
      setSuccessMessage(`Confirmation email sent to ${email}. Please check your inbox.`);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    const result = await forgotPassword(email);
    setLoading(false);

    if (result.success) {
      setSuccessMessage(`Password recovery instructions have been sent to ${email}.`);
    } else {
      setErrorMessage(result.error || 'Could not initiate password reset.');
    }
  };

  const handleGoogleClick = async () => {
    setErrorMessage('');
    setLoading(true);
    const result = await loginWithGoogle();
    setLoading(false);
    if (!result.success) {
      setErrorMessage(result.error || 'Google Sign-in could not be completed.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card (Two-column layout on desktop) */}
      <div className="w-full max-w-5xl rounded-3xl bg-[#0D0F1A] border border-white/10 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: BRANDING & PLATFORM INTRO (Desktop 5 cols)  */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-br from-[#121526] via-[#0E111E] to-[#0A0C16] border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          {/* Top Logo and Tagline */}
          <div className="relative z-10 space-y-6">
            <div 
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-cyan-400 p-[1.5px] shadow-glow-violet transition-transform group-hover:scale-105 duration-300">
                <div className="w-full h-full bg-[#0E101A] rounded-[14px] flex items-center justify-center">
                  <Repeat className="w-6 h-6 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  Skill<span className="text-gradient-brand">Swap</span>
                </span>
                <p className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider">
                  Social Skill Exchange
                </p>
              </div>
            </div>

            {/* Tagline */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Your Skills Have Value.{' '}
                <span className="text-gradient-brand block">Exchange Them.</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect with engineers, designers, founders, and linguists. Trade what you know for the practical skills you want to master.
              </p>
            </div>

            {/* Value Proposition Bullets */}
            <div className="space-y-3.5 pt-2">
              {[
                { title: 'Zero Tuition Fees', desc: 'Direct 1-on-1 human guidance without subscription lock-ins' },
                { title: 'Reciprocal Match Algorithm', desc: 'Find partners where your skills fulfill their exact goals' },
                { title: 'Encrypted Video Rooms', desc: 'Schedule calendar sessions with automatic room links' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Social Proof testimonial card */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/[0.08] space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              &ldquo;I swapped Python backend mentorship for Figma design tokens with Elena. I launched my SaaS without hiring an outside designer.&rdquo;
            </p>
            <div className="flex items-center gap-2.5">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80" 
                alt="Alex Rivera" 
                className="w-8 h-8 rounded-full object-cover ring-1 ring-violet-500/40"
              />
              <div>
                <p className="text-xs font-bold text-white leading-tight">Alex Rivera</p>
                <p className="text-[10px] text-slate-400 leading-tight">Senior Full-Stack Engineer</p>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: AUTHENTICATION FORM (Desktop 7 cols)       */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-[#0D0F1B] relative">
          
          {/* Backend Status indicator banner */}
          <div className="mb-6 flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
              <span className="text-slate-300 font-medium">
                Auth Provider: <strong className="text-white">{isSupabaseConfigured ? 'Supabase Cloud PostgreSQL' : 'Local Persistence (Ready for Supabase)'}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowBackendInfo(!showBackendInfo)}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <Info className="w-3 h-3" />
              <span>{showBackendInfo ? 'Hide' : 'Setup Guide'}</span>
            </button>
          </div>

          {/* Backend Instructions Drawer */}
          {showBackendInfo && (
            <div className="mb-6 p-4 rounded-2xl bg-[#141728] border border-cyan-500/30 text-xs text-slate-300 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Supabase Backend Configuration</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                SkillSwap supports full cloud authentication via Supabase Auth. To connect your cloud database:
              </p>
              <ol className="list-decimal list-inside text-[11px] space-y-1 text-slate-300 font-mono">
                <li>Create a free project at <span className="text-cyan-400">supabase.com</span></li>
                <li>Add <span className="text-violet-400">VITE_SUPABASE_URL</span> and <span className="text-violet-400">VITE_SUPABASE_ANON_KEY</span> to <span className="text-white">.env</span></li>
                <li>Restart the dev server. Real OAuth & email confirmation link flows will immediately take over!</li>
              </ol>
            </div>
          )}

          {/* Error & Success Messages */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* MODE: EMAIL VERIFICATION NOTICE                     */}
          {/* ---------------------------------------------------- */}
          {mode === 'verify' && (
            <div className="text-center py-8 space-y-5 animate-in fade-in">
              <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center">
                <Mail className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">Check Your Inbox</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                  We sent an email verification link to <strong>{email}</strong>. Click the link in the message to activate your SkillSwap account.
                </p>
              </div>
              <div className="pt-2 flex flex-col gap-2 max-w-xs mx-auto">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 shadow-glow-sm"
                >
                  Return to Sign In
                </button>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* MODE: LOGIN                                          */}
          {/* ---------------------------------------------------- */}
          {mode === 'login' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-2xl font-black text-white">Welcome Back</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Enter your credentials to access your SkillSwap dashboard and exchange requests.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.rivera@example.com"
                      className="w-full bg-[#151829] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Password with Show/Hide toggle */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#151829] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-[#151829] border-white/20 text-violet-600 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="text-xs text-slate-300 cursor-pointer select-none">
                    Remember my session on this device
                  </label>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-glow-violet transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In to SkillSwap</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Google Sign In */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.08]" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#0D0F1B] px-3 text-slate-500 text-[10px] tracking-wider font-semibold">
                      Or continue with
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleClick}
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.1 8.8 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.2 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z" />
                    <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.6.4-2.4L1.6 7c-.8 1.6-1.3 3.4-1.3 5.3s.5 3.7 1.3 5.3l3.7-2.9z" />
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.1-6.7-5.3L1.6 16c1.9 3.8 5.8 6.4 10.4 6.4z" />
                  </svg>
                  <span>Sign in with Google</span>
                </button>

                {/* Switch to Sign Up */}
                <p className="text-center text-xs text-slate-400 pt-3">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setErrorMessage('');
                    }}
                    className="font-bold text-violet-400 hover:text-violet-300 ml-1 transition-colors"
                  >
                    Sign up
                  </button>
                </p>

                {/* Quick 1-Click Persona Pre-fills for Testing */}
                <div className="pt-4 border-t border-white/[0.08]">
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2 text-center">
                    Quick Demo Credentials
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('alex.rivera@example.com');
                        setPassword('password123');
                      }}
                      className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-left text-[11px] text-slate-300"
                    >
                      <strong className="text-violet-400 block">Alex Rivera</strong>
                      <span className="text-[10px] text-slate-500">Fullstack Eng</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('elena.design@example.com');
                        setPassword('password123');
                      }}
                      className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-left text-[11px] text-slate-300"
                    >
                      <strong className="text-cyan-400 block">Elena Chen</strong>
                      <span className="text-[10px] text-slate-500">Staff Designer</span>
                    </button>
                  </div>
                </div>

              </form>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* MODE: SIGN UP                                        */}
          {/* ---------------------------------------------------- */}
          {mode === 'signup' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-2xl font-black text-white">Create Your Account</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Join the premier skill exchange platform. Connect, teach, and master new crafts.
                </p>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full bg-[#151829] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Work or Personal Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@domain.com"
                      className="w-full bg-[#151829] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Password (min 6 chars)
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-[#151829] border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-[#151829] border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms and conditions */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="rounded bg-[#151829] border-white/20 text-violet-600 focus:ring-0 mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-slate-300 cursor-pointer select-none leading-relaxed">
                    I agree to the <span className="text-cyan-400 hover:underline">Terms of Service</span>,{' '}
                    <span className="text-cyan-400 hover:underline">Privacy Policy</span>, and SkillSwap Community Guidelines.
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 shadow-glow-violet transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Google Sign In */}
                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.08]" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#0D0F1B] px-3 text-slate-500 text-[10px] tracking-wider font-semibold">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleClick}
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.1 8.8 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.2 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z" />
                    <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.6.4-2.4L1.6 7c-.8 1.6-1.3 3.4-1.3 5.3s.5 3.7 1.3 5.3l3.7-2.9z" />
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.1-6.7-5.3L1.6 16c1.9 3.8 5.8 6.4 10.4 6.4z" />
                  </svg>
                  <span>Sign up with Google</span>
                </button>

                <p className="text-center text-xs text-slate-400 pt-2">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrorMessage('');
                    }}
                    className="font-bold text-violet-400 hover:text-violet-300 ml-1 transition-colors"
                  >
                    Log in
                  </button>
                </p>
              </form>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* MODE: FORGOT PASSWORD                                */}
          {/* ---------------------------------------------------- */}
          {mode === 'forgot' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 mb-3 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </button>
                <h3 className="text-2xl font-black text-white">Reset Your Password</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Enter your account email address and we will send you secure recovery instructions.
                </p>
              </div>

              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full bg-[#151829] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 shadow-glow-violet transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Recovery Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
