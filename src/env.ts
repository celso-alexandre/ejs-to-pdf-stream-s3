import 'dotenv/config';

export const env = {
  BucketName: process.env.BUCKET_NAME || '',
  reportPath: process.env.REPORT_PATH || '',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
};

const undefinedEnv = Object.entries(env).find(([, val]) => !val);

if (undefinedEnv) {
  console.error(`Environment variable ${undefinedEnv[0]} is not defined`);
  process.exit(1);
}
