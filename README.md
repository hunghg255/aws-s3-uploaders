# aws-s3-uploaders

<br>

S3 compatible file uploader Plugin for Vite

<p align='center'>
<a href='https://www.npmjs.com/package/aws-s3-uploaders' target="__blank">
<img src='https://img.shields.io/npm/v/aws-s3-uploaders?color=33A6B8&label=' alt="NPM version">
</a>
<a href="https://www.npmjs.com/package/aws-s3-uploaders" target="__blank">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/aws-s3-uploaders?color=476582&label=">
</a>
<br>
<a href="https://github.com/hunghg255/vite-plugin-s3" target="__blank">
<img alt="GitHub stars" src="https://img.shields.io/github/stars/hunghg255/vite-plugin-s3?style=social">
</a>
</p>

## 🚀 Features

- ⚡ **S3 Compatible**: Support any S3 compatible provider (AWS, DO Spaces...)
- ✨ **Uploads any files**: can upload any files or directory not just build folder

## 📦 Install

```bash
$ npm i aws-s3-uploaders
```

## 🦄 Usage

> `uploadOptions` default to `ACL: 'public-read'` so you may need to override if you have other needs.

Add `vite-plugin-s3` plugin to `vite.config.js / vite.config.ts` and configure it:

```ts
import { AwsS3Uploader } from 'aws-s3-uploaders';

const uploader = AwsS3Uploader({
      basePath: '/build',
      clientConfig: {
        credentials: {
          accessKeyId: '',
          secretAccessKey: '',
        },
        region: 'eu-west-2',
      },
      uploadOptions: {
        Bucket: 'my-bucket',
      },
    }),
  ],
});

uploader.apply();
```

## 👀 Options

| Option          | Description                                               | Type                                                                                                                          | Default    |
| :-------------- | :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- | :--------- |
| `exclude`       | A Pattern to match for excluded content                   | `string,RegExp,Function,Array`                                                                                                | `null`     |
| `include`       | A Pattern to match for included content                   | `string,RegExp,Function,Array`                                                                                                | `null`     |
| `clientConfig`  | The configuration interface of S3Client class constructor | [S3ClientConfig](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/s3clientconfig.html)     | `required` |
| `uploadOptions` | `PutObjectRequest` options except `Body` and `Key'        | [PutObjectRequest](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/putobjectrequest.html) | `required` |
| `basePath`      | Namespace of uploaded files on S3                         | `string`                                                                                                                      | `null`     |
| `directory`     | Directory to upload                                       | `string`                                                                                                                      | `null`     |

#### Advanced `include` and `exclude rules`

`include` and `exclude` in addition to a RegExp you can pass a function which will be called with the path as its first argument. Returning a truthy value will match the rule. You can also pass an Array of rules, all of which must pass for the file to be included or excluded.

```javascript
import { AwsS3Uploader } from 'aws-s3-uploaders';
import isGitIgnored from 'is-gitignored';
// Up to you how to handle this
var isPathOkToUpload = function (path) {
  return require('my-projects-publishing-rules').checkFile(path);
};

const uploader = AwsS3Uploader({
  // Only upload css and js and only the paths that our rules database allows
  include: [
    /.*\.(css|js)/,
    function (path) {
      isPathOkToUpload(path);
    },
  ],
  // function to check if the path is gitignored
  exclude: isGitIgnored,
  clientConfig: {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: 'eu-west-2',
  },
  uploadOptions: {
    Bucket: 'my-bucket',
  },
});

uploader.apply();
```

## 💧 [DigitalOcean](https://m.do.co/c/1b7cfb2128b0) Spaces Object Storage example

```javascript
import { AwsS3Uploader } from 'aws-s3-uploaders';

const uploader = AwsS3Uploader({
  clientConfig: {
    credentials: {
      accessKeyId: process.env.DO_ACCESS_KEY_ID,
      secretAccessKey: process.env.DO_SECRET_ACCESS_KEY,
    },
    endpoint: 'https://fra1.digitaloceanspaces.com',
    region: 'fra1',
  },
  uploadOptions: {
    Bucket: 'my-bucket',
  },
});

uploader.apply();
```
