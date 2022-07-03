import pdf from 'html-pdf';
import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuid } from 'uuid';
import { env } from './env';
import path from 'path';
import { Readable } from 'stream';
import { renderTemplate } from './templates';

const { BucketName: Bucket, reportPath } = env;

function upload(filename: string, stream: Readable) {
  const s3 = new S3({});
  const parallelUploads3 = new Upload({
    client: s3,
    params: {
      Bucket,
      Key: path.join(reportPath, filename),
      Body: stream,
      ContentType: 'application/pdf',
      ACL: 'public-read',
    },
  });

  return parallelUploads3.done();
}

// async function sleep(ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

async function run() {
  const filename = `${uuid()}.pdf`;
  const html = renderTemplate('example', {
    images: Array.from({ length: 30 }, () => ({ url: 'https://picsum.photos/200' })),
  });

  pdf.create(html).toStream(async (err, stream) => {
    if (err) console.error(err);
    await upload(filename, stream);
    // stream.pipe(createWriteStream('./example.pdf'));
  });

  console.log(html);
}

// async function run() {
//   const filename = `${uuid()}.pdf`;
//   const readableStream = new Readable();
//   Array.from({ length: 3 }).forEach(async (x, page) => {
//     const html = await ejs.renderFile('./src/template.ejs', {
//       page: page.toFixed(0),
//       image_url: 'https://picsum.photos/200',
//     });
//     const uploadPromise = upload(filename, readableStream);
//     pdf.create(html).toStream(async (err, stream) => {
//       if (err) console.error(err);
//       console.log({ page });

//       readableStream.push(stream);
//       if (page === 2) {
//         readableStream.push(null);
//         await uploadPromise.done();
//       }
//     });
//   });
// }

run().then();
