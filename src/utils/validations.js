const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/

export const vEmail = val => emailPattern.test(val) || 'Введіть дійсну адресу електронної пошти'
export const vRequired = val => !!val || 'Поле обов’язкове'
export const vPassLength = val => val.length >= 6 || 'Використовуйте мінімум 6 символів'
