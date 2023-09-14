import { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
  origin: string;
};

const getFavicon = async (origin: string): Promise<string> => {
  try {
    const url = new URL(origin).hostname;
    const {
      data: { icons }
    } = await axios.get(`https://favicongrabber.com/api/grab/${url}?pretty=true`);
    return icons[0].src;
  } catch (error) {
    return `https://s2.googleusercontent.com/s2/favicons?domain_url=${origin}`;
  }
};

export const FavIcon = ({ origin }: Props) => {
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    getFavicon(origin).then((favicon: string) => setImage(favicon));
  }, [origin]);

  return (
    <picture>
      <source srcSet={image} type="image/avif" />
      <source srcSet={image} type="image/webp" />
      <img src={image} alt="Lovver | External Website Favicon" width={15} height={15} />
    </picture>
  );
};
