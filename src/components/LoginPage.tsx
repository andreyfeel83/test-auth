import {PageHeader} from '@/components/PageHeader';
import User from '@/assets/user.svg';
import Password from '@/assets/password.svg';
import {useState, type ChangeEvent, type FormEvent, useEffect} from 'react';
import {AuthSchema} from '@/utils/authSchema';
import {useNavigate} from 'react-router-dom';

const baseInputStyles =
  'w-full rounded-lg border pl-8 pr-3 py-2 text-sm focus:outline-none border-gray-300 focus:border-blue-500';
const iconStyles = 'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-color)] pointer-events-none';
const baseButtonStyles = 'w-full rounded-lg py-2 transition-colors';
const enabledButtonStyles = 'bg-[rgb(22,119,255)] text-white cursor-pointer hover:opacity-80';
const disabledButtonStyles =
  'border border-[rgb(217,217,217)] bg-[rgba(0,0,0,0.04)] text-[rgba(0,0,0,0.25)] cursor-not-allowed';

export const LoginPage = () => {
  const [formValues, setFormValues] = useState({email: '', password: ''});
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const result = AuthSchema.safeParse(formValues);
    if (result.success) {
      setErrors({});
      setIsValid(true);
    } else {
      const fieldErrors: {email?: string; password?: string} = {};

      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as keyof typeof formValues;

        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }

      setErrors(fieldErrors);
      setIsValid(false);
    }
  }, [formValues]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormValues(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    navigate('/auth');
  };

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <PageHeader />
      <h1 className="font-semibold text-2xl text-center pb-6">Sign in to your account to continue</h1>
      <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={handleSubmit} noValidate>
        <div className="relative">
          <img src={User} alt="user icon" className={iconStyles} />
          <input
            type="email"
            name="email"
            placeholder="info@mail.com"
            value={formValues.email}
            onChange={handleChange}
            className={baseInputStyles}
          />
        </div>
        {formValues.email && errors.email && <p className="text-red-500 text-xs -mt-3">{errors.email}</p>}
        <div className="relative">
          <img src={Password} alt="password icon" className={iconStyles} />
          <input
            type="password"
            name="password"
            placeholder="***********"
            value={formValues.password}
            onChange={handleChange}
            className={baseInputStyles}
          />
        </div>
        {formValues.password && errors.password && <p className="text-red-500 text-xs -mt-3">{errors.password}</p>}
        <button
          type="submit"
          disabled={!isValid}
          className={`${baseButtonStyles} ${isValid ? enabledButtonStyles : disabledButtonStyles}`}
        >
          Log in
        </button>
      </form>
    </main>
  );
};
