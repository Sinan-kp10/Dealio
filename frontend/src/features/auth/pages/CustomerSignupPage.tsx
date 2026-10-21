import { useState } from "react";
import { useForm } from "react-hook-form";
import type { CustomerSignupFormData } from "../types/customerSignup.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSignupSchema } from "../schemas/customerSignup.schema";
import { Link } from "react-router-dom";
import { User, Mail, Lock, ShieldCheck, Eye, EyeOff, ArrowRight } from "lucide-react";
import "./CustomerSignupPage.css";

export function CustomerSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerSignupFormData>({
    resolver: zodResolver(customerSignupSchema),
  });

  const onSubmit = (data: CustomerSignupFormData) => {
    console.log("Customer signup submitted", data);
  };

  return (
    <main className="customer-auth-wrapper">
      {/* Top Navigation Bar: Top-left Logo & Top-right Enterprise Link */}
      <header className="auth-top-nav">
        <Link to="/" className="auth-top-logo" aria-label="Dealio home">
          <img
            src="/dealio-logo.png"
            alt="Dealio"
            className="auth-top-logo-img"
          />
        </Link>
        <Link to="/signup/enterprise" className="auth-top-enterprise-link">
          Enterprise? Join now <span className="auth-top-arrow" aria-hidden="true">→</span>
        </Link>
      </header>

      {/* Centered Signup Container */}
      <div className="auth-content-container">
        <div className="customer-auth-card">
            {/* Header */}
            <header className="auth-header">
                <h1 className="auth-title">Create your account</h1>
                <p className="auth-subtitle">Get quotes from verified enterprises.</p>
            </header>

            {/* Signup Form */}
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                        Full Name
                    </label>
                    <div className="input-wrapper">
                        <span className="input-icon-left" aria-hidden="true">
                            <User size={18} />
                        </span>
                        <input
                            id="name"
                            autoComplete="name"
                            placeholder="Enter your full name"
                            className={`input-field ${errors.name ? "input-field-error" : ""}`}
                            {...register("name")}
                        />
                    </div>
                    {errors.name && ( <p className="field-error"> {errors.name.message}</p>)}
                </div>

            {/* Email Address */}
            <div className="form-group">
                <label htmlFor="email" className="form-label"> Email Address</label>
                <div className="input-wrapper">
                    <span className="input-icon-left" aria-hidden="true">
                        <Mail size={18} />
                    </span>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email address"
                        className={`input-field ${errors.email ? "input-field-error" : ""}`}
                        {...register("email")}
                    />
                </div>
                {errors.email && (
                <p role="alert" className="field-error">
                    {errors.email.message}
                </p>
                )}
            </div>

            {/* Password */}
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-wrapper">
                        <span className="input-icon-left" aria-hidden="true">
                            <Lock size={18} />
                        </span>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Create a password"
                            className={`input-field input-field-has-toggle ${errors.password ? "input-field-error" : ""}`}
                            {...register("password")}
                        />
                        <button
                            type="button"
                            className="input-toggle-btn"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && (<p className="field-error"> {errors.password.message}</p>)}
                </div>

            {/* Confirm Password */}
            <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password </label>
                <div className="input-wrapper">
                    <span className="input-icon-left" aria-hidden="true">
                        <ShieldCheck size={18} />
                    </span>
                    <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Confirm your password"
                        className={`input-field input-field-has-toggle ${errors.confirmPassword ? "input-field-error" : ""}`}
                        {...register("confirmPassword")}
                    />
                    <button
                        type="button"
                        className="input-toggle-btn"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-label={
                        showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                    >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.confirmPassword && (<p className="field-error">{errors.confirmPassword.message}</p>)}
            </div>

            {/* Submit Button */}
            <button type="submit"  className="auth-submit-btn"  disabled={isSubmitting}>{isSubmitting ? ("Creating account..." ) : (
                    <>
                        <span>Create Account</span>
                        <span className="auth-submit-icon" aria-hidden="true">
                        <ArrowRight size={18} />
                        </span>
                    </>
                )}
            </button>
            </form>

            {/* Login Prompt */}
            <p className="auth-footer-prompt"> Already have an account?
            <Link to="/login" className="auth-link-bold">
                Log In
            </Link>
            </p>
        </div>
      </div>
    </main>
  );
}

export default CustomerSignupPage;
