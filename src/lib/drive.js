import { google } from 'googleapis';

// Optional: trim env values (some .env editors add leading space)
const env = (key) => {
  const v = process.env[key] || process.env[' ' + key];
  return (v == null ? '' : String(v)).trim();
};

// Main Google credentials (used for Calendar etc. in debug server; we use for Drive if no Drive-specific creds)
const GOOGLE_CREDENTIALS = {
  type: process.env.GOOGLE_TYPE || 'service_account',
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: process.env.GOOGLE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
  token_uri: process.env.GOOGLE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN || 'googleapis.com',
};

// Optional separate Drive credentials (share the Drive folder with this account's email)
const GOOGLE_DRIVE_CREDENTIALS = (() => {
  const key = env('GOOGLE_DRIVE_PRIVATE_KEY');
  const email = env('GOOGLE_DRIVE_CLIENT_EMAIL');
  if (!email || !key) return null;
  return {
    type: 'service_account',
    project_id: env('GOOGLE_DRIVE_PROJECT_ID'),
    private_key_id: env('GOOGLE_DRIVE_PRIVATE_KEY_ID'),
    private_key: key.replace(/\\n/g, '\n'),
    client_email: email,
    client_id: env('GOOGLE_DRIVE_CLIENT_ID'),
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: '',
    universe_domain: 'googleapis.com',
  };
})();

export const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID || env('FOTKY_FOLDER_ID') || '';
export const EVENTS_FOLDER_ID = process.env.EVENTS_FOLDER_ID || env('EVENTS_FOLDER_ID') || '';

function getCredentials() {
  return GOOGLE_DRIVE_CREDENTIALS || GOOGLE_CREDENTIALS;
}

export async function getDriveClient() {
  const creds = getCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  const authClient = await auth.getClient();
  return google.drive({ version: 'v3', auth: authClient });
}

const IMAGE_MIME_PREFIX = 'image/';
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.heic'];

export function isImageFile(file) {
  if (file.mimeType && file.mimeType.startsWith(IMAGE_MIME_PREFIX)) return true;
  const name = (file.name || '').toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => name.endsWith(ext));
}
