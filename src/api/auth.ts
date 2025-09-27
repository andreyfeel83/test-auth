interface VerifyOtpPayload {
  otp: string;
  authKey: string;
}

export const verifyOtpKey = async (payload: VerifyOtpPayload): Promise<{success: boolean}> => {
  console.log('Verifying OTP:', payload.otp, 'against secret:', payload.authKey);

  if (payload.otp === payload.authKey) {
    return {success: true};
  } else {
    throw new Error('Invalid authentication code');
  }
};
