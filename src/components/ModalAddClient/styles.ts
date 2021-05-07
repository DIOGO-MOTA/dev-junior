import styled from 'styled-components';
import { Form as Unform } from '@unform/web';


export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 600;
    font-size: 26px;
    line-height: 26px;
    margin-bottom: 20px;
  }

  button {
    margin-top: 48px;
    align-self: flex-end;
  }

  button {
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #3895d3;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;

    .text {
      padding: 16px 24px;
    }

    .icon {
      display: flex;
      padding: 16px 16px;
      background: #3895d3;
      border-radius: 0 8px 8px 0;
      margin: 0 auto;
    }
  }
`;
