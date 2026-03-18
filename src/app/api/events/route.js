import { NextResponse } from 'next/server';
import { getDriveClient, EVENTS_FOLDER_ID, isImageFile } from '@/lib/drive';

export async function GET() {
  if (!EVENTS_FOLDER_ID) {
    return NextResponse.json({ success: true, events: [], configured: false });
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
      coverUrl: `/api/photos/${f.id}`,
    }));
    return NextResponse.json({ success: true, events, configured: true });
  } catch (error) {
    const msg = error.message || String(error);
    console.error('Error listing Drive events folder:', msg);
    const hint = (msg.includes('PERMISSION_DENIED') || msg.includes('403') || msg.includes('404'))
      ? ' Share the Drive folder with the service account (Viewer).'
      : '';
    return NextResponse.json(
      { success: false, error: msg + hint },
      { status: 500 }
    );
  }
}
