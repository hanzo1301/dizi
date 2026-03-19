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

const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID || env('FOTKY_FOLDER_ID') || '';
const EVENTS_FOLDER_ID = process.env.EVENTS_FOLDER_ID || '';

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
  const result = {
    gallery: {
      folderIdSet: !!DRIVE_FOLDER_ID,
      folderId: DRIVE_FOLDER_ID ? `${DRIVE_FOLDER_ID.slice(0, 8)}...` : null,
      totalFiles: 0,
      imageFiles: 0,
      error: null,
    },
    events: {
      folderIdSet: !!EVENTS_FOLDER_ID,
      folderId: EVENTS_FOLDER_ID ? `${EVENTS_FOLDER_ID.slice(0, 8)}...` : null,
      totalFiles: 0,
      imageFiles: 0,
      error: null,
    },
  };

  if (DRIVE_FOLDER_ID) {
    try {
      const drive = await getDriveClient();
      const res = await drive.files.list({
        q: `'${DRIVE_FOLDER_ID}' in parents and trashed = false`,
        fields: 'files(id, name, mimeType)',
        orderBy: 'name',
      });
      const all = res.data.files || [];
      result.gallery.totalFiles = all.length;
      result.gallery.imageFiles = all.filter(isImageFile).length;
      result.gallery.fileNames = all.map((f) => f.name);
    } catch (e) {
      result.gallery.error = e.message || String(e);
    }
  }

  if (EVENTS_FOLDER_ID) {
    try {
      const drive = await getDriveClient();
      const res = await drive.files.list({
        q: `'${EVENTS_FOLDER_ID}' in parents and trashed = false`,
        fields: 'files(id, name, mimeType)',
        orderBy: 'name',
      });
      const all = res.data.files || [];
      result.events.totalFiles = all.length;
      result.events.imageFiles = all.filter(isImageFile).length;
      result.events.fileNames = all.map((f) => f.name);
    } catch (e) {
      result.events.error = e.message || String(e);
    }
  }

  return res.json(result);
});

export default router;
