import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { Document } from '@langchain/core/documents';

function createPdfLoader(path: string) {
  return new PDFLoader(path);
}

export async function loadPdf(
  path: string
): Promise<Document<Record<string, any>>[]> {
  const loader = createPdfLoader(path);
  return await loader.load();
}
