import React from 'react';

const Product = ({ product }) => {
    return (
        <li className="app-list-item">
            <a href={product.link}>
                <img src={product.image} alt={product.name} />
            </a>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><a href={product.techLink}>{product.tech}</a> - {product.platform}</p>
            <p>
                <img src={product.qrCode} />
                <a href={product.appStoreLink}>
                    <img src={product.appStoreBadge} alt="Download on the App Store" />
                </a>
            </p>
        </li>
    );
};

export default Product;