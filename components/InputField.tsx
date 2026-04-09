import { Text, TextInput, TextInputProps, View, StyleSheet } from 'react-native';
import { colors, typography } from '@/theme';

interface InputFieldProps extends TextInputProps {
  label: string;
  hint?: string;
}

export function InputField({ label, hint, style, ...props }: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, style]}
        {...props}
      />
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    ...typography.label,
    color: colors.textPrimary,
  },
  input: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    ...typography.body,
  },
  hint: {
    ...typography.meta,
    color: colors.textSecondary,
  },
});
