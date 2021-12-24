import React from 'react';
import Layout from '../components/layout/layout';

const ThankYou = () => {
  return (
    <Layout classMain="fullpage">
      <div className="thank-container">
        <h1>Thank you</h1>
        <img src="/images/paperup.jpg" alt="send" />
        <h3>Your order was completed successfully</h3>
      </div>
    </Layout>
  );
};

export default ThankYou;