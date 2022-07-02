import ejs from 'ejs';
import pdf from 'html-pdf';
import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuid } from 'uuid';
import { env } from './env';
import path from 'path';
import { ReadStream } from 'fs';

const { BucketName: Bucket, reportPath } = env;

async function upload(stream: ReadStream) {
  const s3 = new S3({});
  const parallelUploads3 = new Upload({
    client: s3,
    params: {
      Bucket,
      Key: path.join(reportPath, `${uuid()}.pdf`),
      Body: stream,
      ContentType: 'application/pdf',
      ACL: 'public-read',
    },
  }).done();

  await parallelUploads3;
}

async function run() {
  const html = await ejs.renderFile('./src/template.ejs', { image_url: 'https://picsum.photos/200' });
  pdf.create(html).toStream(async (err, stream) => {
    if (err) console.error(err);
    await upload(stream);
  });
}

run().then();
