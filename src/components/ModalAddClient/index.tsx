import React, { useRef, useCallback } from 'react';


import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface IClient {
  id: number;
  name: string ;
  saleOrder: string;
  region: string;
  local: string;
  team: string;
  product: string;
  receipt: string;
  descriptionReceiver: string;
  modality: string;
  coin: string;
  value: string;
  available: boolean;
}

interface ICreateClientData {
  id: number;
  name: string ;
  saleOrder: string;
  region: string;
  local: string;
  team: string;
  product: string;
  receipt: string;
  descriptionReceiver: string;
  modality: string;
  coin: string;
  value: string;
  available: boolean;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddClient: (client: Omit<IClient, 'id' | 'available'>) => void;
}

const ModalAddClient: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddClient,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateClientData) => {
      handleAddClient(data);

      setIsOpen();
    },
    [handleAddClient, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Cliente</h1>
        <Input name="name" placeholder="Ex: Maria" />
        <Input name="saleOrder" placeholder="Ordem venda" />
        <Input name="region" placeholder="Região" />
        <Input name="local" placeholder="Local" />
        <Input name="team" placeholder="Equipe" />
        <Input name="product" placeholder="Produto" />
        <Input name="receipt" placeholder="Recibo" />
        <Input name="descriptionReceiver" placeholder="Descrição recebedor" />
        <Input name="modality" placeholder="Modalidade" />
        <Input name="coin" placeholder="Moeda" />
        <Input name="value" placeholder="Valor" />

        <button type="submit" data-testid="add-client-button">
          <p className="text">Adicionar Cliente</p>
    
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddClient;
