import React from 'react';
import {FieldValues, Path, PathValue, useForm} from 'react-hook-form';
import {View} from 'react-native';
import {ZodType} from 'zod';

import {moderateScale} from '@src/common/utils';

import {ButtonDefault} from '../Button';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTheme} from 'styled-components/native';

import {FormInput} from './FormInput';
import {createStyles} from './styles';

export interface FormField {
  name: string;
  placeholder: string;
  type: 'text' | 'password' | 'number';
  icon: string;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: {[key: string]: FieldValues[keyof FieldValues]}) => void;
  textButton: string;
  loading: boolean;
  formSchema: ZodType<unknown>;
}

export const Form = <T extends FieldValues>({
  fields,
  onSubmit,
  textButton,
  loading,
  formSchema,
}: FormProps) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<T>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = (data: T) => {
    onSubmit(data);
  };

  return (
    <View style={styles.container}>
      {fields.map((field: FormField) => (
        <FormInput
          key={field.name}
          control={control}
          placeholderTextColor={colors.gray}
          placeholder={field.placeholder}
          secureTextEntry={field.type === 'password'}
          keyboardType={field.type === 'number' ? 'numeric' : 'default'}
          name={field.name as Path<T>}
          defaultValue={'' as PathValue<T, Path<T>>}
          mb={moderateScale(20)}
          icon={field.icon}
          iconColor={colors.white}
          autoCapitalize="none"
          pr={45}
          error={errors[field.name]?.message as string}
        />
      ))}
      <ButtonDefault
        onPress={handleSubmit(handleFormSubmit)}
        isLoading={loading}>
        {textButton}
      </ButtonDefault>
    </View>
  );
};
