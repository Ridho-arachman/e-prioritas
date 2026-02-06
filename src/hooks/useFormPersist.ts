// hooks/useFormPersist.ts
import { useEffect, useRef } from "react";
import { UseFormWatch } from "react-hook-form";

interface Options {
  /** Fields to skip (like passwords, tokens) */
  skipFields?: string[];
  /** Wait time before save (milliseconds) */
  waitTime?: number;
  /** Turn auto-save on/off */
  isActive?: boolean;
}

/**
 * Auto-saves form data when user stops typing
 * - Waits a bit before saving
 * - Skips sensitive fields
 * - Clean and easy to use
 */
export function useFormPersist(
  watch: UseFormWatch<any>,
  onSave: (data: any) => void,
  options: Options = {},
) {
  const {
    skipFields = ["password", "confirmPassword"],
    waitTime = 500,
    isActive = true,
  } = options;

  // Store timeout ID
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Don't run if auto-save is off
    if (!isActive) {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      return;
    }

    // Watch for form changes
    const subscription = watch((formData) => {
      if (!formData) return;

      // Cancel previous scheduled save
      if (timerId.current) {
        clearTimeout(timerId.current);
      }

      // Remove sensitive data
      const safeData = { ...formData };
      skipFields.forEach((field) => {
        delete safeData[field];
      });

      // Schedule save after wait time
      timerId.current = setTimeout(() => {
        onSave(safeData);
      }, waitTime);
    });

    // Clean up
    return () => {
      subscription.unsubscribe();
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [watch, onSave, skipFields, waitTime, isActive]);
}
