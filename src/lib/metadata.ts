import { Metadata } from 'next';
import config from './config';

type GenerateMetadataOptions = {
  withSuffix?: boolean;
};

const generateMetadata = (metadata?: Metadata, options?: GenerateMetadataOptions) => {
  let title = metadata?.title ?? config.appName;
  const description = metadata?.description ?? config.appDescription;

  if (options?.withSuffix) {
    title += ` | ${config.appName}`;
  }

  const metadataResult: Metadata = {
    ...metadata,
    description,
    title,
    metadataBase: new URL(config.appUrl as string),
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: config.appName,
      url: config.appUrl
    }
  };

  return metadataResult;
};

export default generateMetadata;
