/* eslint-disable no-unused-vars */
import React from 'react';
import './Footer.css';

export const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer>
            <p>©️KryssNa {year} </p>
        </footer>
    )
}
