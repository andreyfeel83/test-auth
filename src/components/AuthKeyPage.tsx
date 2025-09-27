import {useState, useRef, type ChangeEvent, type KeyboardEvent, useEffect} from 'react';
import {useMutation} from '@tanstack/react-query';
import {PageHeader} from '@/components/PageHeader';
import {useCountdown} from '@/hooks/useCountdown';
import {generateAuthKey} from '@/utils/generateAuthKey';
import {verifyOtpKey} from '@/api/auth';

const NUM_INPUTS = 6;

export const AuthKeyPage = () => {
  const [otp, setOtp] = useState<string[]>(new Array(NUM_INPUTS).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [authKey, setAuthKey] = useState(generateAuthKey);

  useEffect(() => {
    console.log(`Your secret key is: ${authKey}`);
  }, [authKey]);

  const {mutate, isError, isPending, reset} = useMutation({
    mutationFn: verifyOtpKey,
    onSuccess: () => {
      console.log('Successfully authenticated!');
    },
  });

  const {remainingTime, startCountdown, isCountdownActive} = useCountdown(45);

  const handleGetNewKey = () => {
    const newKey = generateAuthKey();
    setAuthKey(newKey);
    startCountdown();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (isError) reset();
    const {value} = e.target;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < NUM_INPUTS - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (isError) reset();
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (isError) reset();
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!/^\d*$/.test(pastedData)) return;

    const digits = pastedData.slice(0, NUM_INPUTS).split('');
    const newOtp = [...otp];
    digits.forEach((digit, idx) => {
      if (newOtp[idx] !== undefined) {
        newOtp[idx] = digit;
      }
    });
    setOtp(newOtp);

    const lastFilledIndex = Math.min(digits.length, NUM_INPUTS - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  const handleSubmit = () => {
    if (!isOtpComplete || isPending) return;
    const finalOtp = otp.join('');
    mutate({otp: finalOtp, authKey});
  };

  const baseButtonStyles = 'w-full rounded-lg py-2.5 text-white font-medium cursor-pointer transition-opacity';

  return (
    <main className="bg-white flex flex-col items-center justify-center text-center text-[var(--text-color)]">
      <PageHeader />
      <h1 className="font-semibold text-2xl mb-1">Two-Factor Authentication</h1>
      <p className="mb-6">Enter the 6-digit code from the Google Authenticator app</p>

      <div className="flex justify-center gap-3 mb-4" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={el => {
              inputRefs.current[index] = el;
            }}
            type="text"
            pattern="\d{1}"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(e, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            disabled={isPending}
            className={`w-[3.25rem] h-[3.75rem] border-2 rounded-lg text-3xl text-center font-semibold 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-colors
            ${isError ? 'border-red-500' : 'border-gray-300'}`}
          />
        ))}
      </div>

      {isError && <p className="text-sm text-red-500 mb-4 self-start">Invalid code</p>}

      {isOtpComplete ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending || isError}
          className={`${baseButtonStyles} 
            ${isError || isPending ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:opacity-90'}`}
        >
          Continue
        </button>
      ) : isCountdownActive ? (
        <p className="text-sm text-gray-500 h-11 flex items-center justify-center">Get a new code in {remainingTime}</p>
      ) : (
        <button type="button" onClick={handleGetNewKey} className={`${baseButtonStyles} bg-blue-500 hover:opacity-90`}>
          Get new
        </button>
      )}
    </main>
  );
};
