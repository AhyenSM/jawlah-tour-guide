import React from 'react';

const ImageTest = () => {
  return (
    <div>
      <h1>Image Test Component</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        <div>
          <p>Direct public image path:</p>
          <img src="/abuli-munavary-RsvErh4eirg-unsplash.jpg" alt="Qatar desert" style={{width: '300px'}} />
        </div>
        <div>
          <p>Assets folder image path:</p>
          <img src="/assets/abuli-munavary-RsvErh4eirg-unsplash.jpg" alt="Qatar desert" style={{width: '300px'}} />
        </div>
        <div>
          <p>Bashir Mohd image:</p>
          <img src="/bashir-mohd-0gSM4u8zfA8-unsplash.jpg" alt="Qatar building" style={{width: '300px'}} />
        </div>
        <div>
          <p>Florian Wehde image:</p>
          <img src="/florian-wehde-Do6yoytec5E-unsplash.jpg" alt="Qatar skyline" style={{width: '300px'}} />
        </div>
        <div>
          <p>Jaanus Jagomagi image:</p>
          <img src="/jaanus-jagomagi-AZJAIiIn6BY-unsplash.jpg" alt="Qatar building" style={{width: '300px'}} />
        </div>
      </div>
    </div>
  );
};

export default ImageTest;