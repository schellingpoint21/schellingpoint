// Contact details shared by the redesigned pages.
export const useSpContact = () => {
  const { t } = useI18n()
  const BOOKING_URL = 'https://calendly.com/charlie-schellingpoint-jwgf/30min'
  const EMAIL = 'charlie@schellingpoint.xyz'
  // WhatsApp (+503 7020 4642) with the site's existing pre-filled opening message.
  const whatsappUrl = computed(
    () => `https://wa.me/50370204642?text=${encodeURIComponent(t('common.whatsappMessage'))}`
  )
  return { BOOKING_URL, EMAIL, whatsappUrl }
}
