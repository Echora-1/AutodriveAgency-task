import { reactive, ref, watch } from "vue";

export function useField(field) {
  const valid = ref(true);
  const value = ref(field.value);
  const touched = ref(false);
  const errors = reactive({});

  const reassign = (val) => {
    valid.value = true;
    Object.keys(field.validators ?? {}).map((name) => {
      const isValid = field.validators[name].validator(val);
      errors[name] = {
        value: !isValid,
        errorText: field.validators[name].errorText,
      };
      if (!isValid) {
        valid.value = false;
      }
    });
  };

  watch(value, reassign);
  reassign(field.value);

  return { value, valid, errors, touched, blur: () => (touched.value = true) };
}
