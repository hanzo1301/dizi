import { Router } from 'express';
import { google } from 'googleapis';

const router = Router();

const env = (key) => {
  const v = process.env[key] || process.env[' ' + key];
  return (v == null ? '' : String(v)).trim();
};

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
    universe_domain: 'googleapis.com',
  };
})();

const EVENTS_FOLDER_ID = process.env.EVENTS_FOLDER_ID || '';
const BASE_URL = process.env.BASE_URL || '';

const IMAGE_MIME_PREFIX = 'image/';
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.heic'];

function isImageFile(file) {
  if (file.mimeType && file.mimeType.startsWith(IMAGE_MIME_PREFIX)) return true;
  const name = (file.name || '').toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => name.endsWith(ext));
}

async function getDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: GOOGLE_DRIVE_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  const authClient = await auth.getClient();
  return google.drive({ version: 'v3', auth: authClient });
}

router.get('/', async (req, res) => {
  if (!EVENTS_FOLDER_ID) {
    return res.json({ success: true, events: [], configured: false });
  }
  try {
    const drive = await getDriveClient();
    const response = await drive.files.list({
      q: `'${EVENTS_FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType)',
      orderBy: 'name',
    });
    const allFiles = response.data.files || [];
    const files = allFiles.filter(isImageFile);
    const events = files.map((f) => ({
      id: f.id,
      name: (f.name || '').replace(/\.[^/.]+$/, '') || 'Event',
      coverUrl: `${BASE_URL}/api/photos/${f.id}`,
    }));
    return res.json({ success: true, events, configured: true });
  } catch (error) {
    const msg = error.message || String(error);
    console.error('Error listing Drive events folder:', msg);
    const hint = (msg.includes('PERMISSION_DENIED') || msg.includes('403') || msg.includes('404'))
      ? ' Share the Drive folder with the service account (Viewer).'
      : '';
    return res.status(500).json({ success: false, error: msg + hint });
  }
});

export default router;
