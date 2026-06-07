export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  /**
   * Honeypot field — must stay empty. Hidden from real users; bots that fill
   * every input will populate it, letting the API silently drop the request.
   */
  company?: string;
}
