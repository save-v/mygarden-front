const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/

export const vEmail = val => emailPattern.test(val) || 'Please enter a valid email address'
export const vRequired = val => !!val || 'Field is required'
export const vPassLength = val => val.length >= 6 || 'Please use minimum 6 characters'
