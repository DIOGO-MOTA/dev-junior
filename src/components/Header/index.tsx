import React from 'react';

import { Container } from './styles';


const Header: React.FC = ({ children }) => (
  
  <Container>
    
    <header>
      <h1>Dashboard</h1>

      <nav>
        {children}
      </nav>
    </header>
    
  </Container>
);

export default Header;
