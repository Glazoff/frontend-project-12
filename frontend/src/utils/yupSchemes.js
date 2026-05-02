import * as yup from 'yup'

export const signupSchema = t => yup.object({
  name: yup
    .string()
    .required(t('auth.signup.errors.nameRequired'))
    .min(3, t('auth.signup.errors.nameMinLength'))
    .max(20, t('auth.signup.errors.nameMaxLength')),
  password: yup
    .string()
    .required(t('auth.signup.errors.passwordRequired'))
    .min(6, t('auth.signup.errors.passwordMinLength')),
  confirmPassword: yup
    .string()
    .required(t('auth.signup.errors.confirmPasswordRequired'))
    .oneOf([yup.ref('password'), null], t('common.validation.passwordsMatch')),
})

export const renameChannelSchema = (t, channel, channels) => yup.object({
  name: yup
    .string()
    .required(t('chat.renameChannelModal.errors.nameRequired'))
    .min(3, t('chat.renameChannelModal.errors.nameMinLength'))
    .max(20, t('chat.renameChannelModal.errors.nameMaxLength'))
    .test(
      'is-unique',
      t('chat.renameChannelModal.errors.nameExists'),
      (value) => {
        if (!value || !channel || !channels) return true
        return !channels.some(
          ch =>
            ch.id !== channel.id
            && ch.name.toLowerCase() === value.toLowerCase(),
        )
      },
    ),
})

export const addChannelSchema = (t, channels) => yup.object({
  name: yup
    .string()
    .required(t('chat.addChannelModal.errors.nameRequired'))
    .min(3, t('chat.addChannelModal.errors.nameMaxMinLength'))
    .max(20, t('chat.addChannelModal.errors.nameMaxMinLength'))
    .test(
      'is-unique',
      t('chat.addChannelModal.errors.nameExists'),
      (value) => {
        if (!value) return true
        return !channels.some(
          ch => ch.name.toLowerCase() === value.toLowerCase(),
        )
      },
    ),
})
