import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import Link from 'next/link';

export default function MainCarousel({ featuredProducts }) {
  console.log(featuredProducts);
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop>
      {featuredProducts.map((product) => (
        <div key={product._id}>
          <Link href={`/product/${product.slug}`} className="flex" passHref>
            <Image
              src={product.banner}
              alt={product.name}
              width={1920}
              height={400}
              loading="lazy"
              className="banner-img "
            />
          </Link>
        </div>
      ))}
    </Carousel>
  );
}
