import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, typography } from '@/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  style,
}: ButtonProps) {
  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.surface : colors.primary}
        />
      ) : (
        <Text style={[styles.label, textStyles[variant]]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.55,
  },
  label: {
    ...typography.bodyMedium,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surfaceSoft,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
});

const textStyles = StyleSheet.create({
  primary: {
    color: colors.surface,
  },
  secondary: {
    color: colors.ink,
  },
  outline: {
    color: colors.ink,
  },
});
