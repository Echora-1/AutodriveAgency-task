export const required = {
  validator: (val) => !!val,
  errorText: "Обязательно поле",
};

export const email = {
  validator: (val) => val.match(/.+@.+\..+/i) != null,
  errorText: "Неверный формат",
};

export const phone = {
  validator: (val) => val.match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/) != null,
  errorText: "Неверный формат",
};
