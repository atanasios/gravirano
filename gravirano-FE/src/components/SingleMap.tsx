import React from 'react';
import { Link } from 'react-router-dom';

type Map = {
    id: string;
    name: string;
    dimensions: string;
    price: number;
    image: string;
};

const SingleMap: React.FC<Map> = ({ id, name, price, image }) => {
    const bucketName = 'gravirano-maps';
    const region = 'eu-north-1';
    const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${image}`;
    
  return (
    <Link to={`/map/${id}`} className='bg-secondary w-84 h-72 flex flex-col items-center text-main rounded-md m-4 shadow-2xl'>
        <p className='text-xl'>{name}</p>
        <img className='w-64 h-48 bg-main mt-6 mb-10' src={imageUrl} alt={name} />
        <p>Price: {price} BGN</p>
    </Link>
  );
};

export default SingleMap;