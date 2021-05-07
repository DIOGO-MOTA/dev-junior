import styled from 'styled-components';

export const SearchContaine = styled.label`
      display: flex;
      margin-top: -150px;
      margin-left: 40%;
      align-self: center;
      display: flex;
      background: #fff;
      border-radius: 8px;
      padding: 18px 24px;
      width: 400px;
      font-size: 16px;

      svg {
        color: #b7b7cc;
      }

      input {
       flex: 1;
       background: transparent;
       border: 0;
       color: #b7b7cc;

      &::placeholder {
       color: #b7b7cc;
    }


    }


`;

export const ClientContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 0;


  display: grid;

  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
`;


