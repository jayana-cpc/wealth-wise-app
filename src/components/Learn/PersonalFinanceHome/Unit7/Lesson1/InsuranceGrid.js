import React from 'react';
import Image from 'next/image';
import { Section1Coverage } from './Section1';
import { Section2Coverage } from './Section2';
import { SectionMeaning } from './Section3';
import { Section4Meaning } from './Section4';

export function InsuranceGrid() {
  const imageUrl = 'https://i.imgur.com/GnCaNLI.png';

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 50%', padding: '10px' }}>
        <Image src={imageUrl} alt="Uploaded" layout="responsive" width={500} height={500} />
      </div>
      <div style={{ flex: '1 1 50%', padding: '10px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, border: '1px solid black', margin: '5px', padding: '10px' }}><Section1Coverage /></div>
        <div style={{ flex: 1, border: '1px solid black', margin: '5px', padding: '10px' }}><Section2Coverage /></div>
        <div style={{ flex: 1, border: '1px solid black', margin: '5px', padding: '10px' }}><SectionMeaning /></div>
        <div style={{ flex: 1, border: '1px solid black', margin: '5px', padding: '10px' }}><Section4Meaning /></div>
      </div>
    </div>
  );
}
