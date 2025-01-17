import { Control, Controller } from 'react-hook-form';
import { TextInput, TextInputProps, Text } from 'react-native';

import { cn } from '../lib/utils';

interface InputProps extends TextInputProps {
  error?: boolean;
  touched?: boolean;
  control: Control<any>;
  name: string;
  label?: string;
  errorMessage?: string;
}

export default function Input({
  error,
  touched,
  className,
  control,
  name,
  label,
  errorMessage,
  ...rest
}: InputProps) {
  return (
    <>
      {label && <Text className="text-md my-2 font-medium text-white">{label}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              className={cn(
                'h-[55px] rounded-lg border border-gray-200 bg-gray-100 px-4 text-base',
                error && touched && 'border-red-500 bg-red-50',
                className
              )}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#9E9E9E"
              {...rest}
            />
            {errorMessage && touched && (
              <Text className="text-md mb-4 ml-2 text-red-500">{errorMessage}</Text>
            )}
          </>
        )}
      />
    </>
  );
}
