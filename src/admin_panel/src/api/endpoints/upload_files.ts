import Minio from 'minio';

var minioClient = new Minio.Client({
  endPoint: '127.0.0.1',
  port: 9090,
  useSSL: false,
  accessKey: 'xEmqxwmq99jKEf9r',
  secretKey: '31afw2ubXykXqXjTiyYoI4ySE5GujoGR',
});

export const uploadFile = (fileName: string, pathToFile: string) => {
  minioClient.fPutObject('products-images', fileName, pathToFile);
};
