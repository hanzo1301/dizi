import { Readable } from 'stream';
import { getDriveClient } from '@/lib/drive';
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  const params = await context.params;
  const fileId = params?.fileId;
  if (!fileId) {
    return new NextResponse('Missing file ID', { status: 400 });
  }
  try {
    const drive = await getDriveClient();
    const response = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );
    const contentType = response.headers['content-type'] || 'image/jpeg';
    const nodeStream = response.data;
    const webStream = Readable.toWeb(nodeStream);
    return new NextResponse(webStream, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error streaming Drive file:', error.message);
    return new NextResponse('Failed to load image', { status: 500 });
  }
}
