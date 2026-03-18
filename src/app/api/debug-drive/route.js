import { NextResponse } from 'next/server';
import { getDriveClient, DRIVE_FOLDER_ID, EVENTS_FOLDER_ID, isImageFile } from '@/lib/drive';

export async function GET() {
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

  return NextResponse.json(result);
}
