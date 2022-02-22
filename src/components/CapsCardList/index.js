import React from 'react';

import CapsCard from 'components/CapsCard';

const CapsCardList = () => (
  <>
    <CapsCard text='Poignet' textBold='droit' />
    <CapsCard text='Poignet' textBold='gauche' />
    <CapsCard text='Plaqué' textBold='contre le corps' />
  </>
);

export default CapsCardList;
