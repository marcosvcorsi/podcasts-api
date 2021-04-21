type ValidationResponse = {
  isValid: boolean;
  errors: string[];
};

export const validateRequiredParams = (
  value: any,
  requiredParams: string[]
): ValidationResponse => {
  const errors = requiredParams.reduce((messages, required) => {
    if (!value[required]) {
      messages.push(`${required} is required`);
    }

    return messages;
  }, [] as string[]);

  return {
    isValid: errors.length === 0,
    errors,
  };
};
