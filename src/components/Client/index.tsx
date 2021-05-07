import React, { useState, useEffect } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import { Container } from './styles';

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

interface IHours {
  tempo_h: number;
  potencia_kW: number;
}

interface IProps {
  client: IClient;
  handleDelete: (id: number) => {};
  handleEditClient: (client: IClient) => void;
}

const Client: React.FC<IProps> = ({
  client,
  handleDelete,
  handleEditClient,
}: IProps) => {

  const [isAvailable, setIsAvailable] = useState(client.available);


  async function toggleAvailable(): Promise<void> {
    try {
      await api.put(`/client/${client.id}`, {
        ...client,
        available: !isAvailable,
      });

      setIsAvailable(!isAvailable);
    } catch (err) {
      console.log(err);
    }
  }

  function setEditingClient(): void {
    handleEditClient(client);
  }

  return (
    <Container available={isAvailable}>

      <section className="body">
        <h2>{client.name}</h2>
        <p>Ordem Venda: {client.saleOrder}</p>
        <p>Região: {client.region}</p>
        <p>Local: {client.local}</p>
        <p>Equipe: {client.team}</p>
        <p>Produto: {client.product}</p>
        <p>Recibo: {client.receipt}</p>
        <p>Descrição Recebedor: {client.descriptionReceiver}</p>
        <p>Modalidade: {client.modality}</p>
        <p>Moeda: {client.coin}</p>
        <p>Valor: {client.value}</p>

      </section>
      <section className="client">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingClient()}
            data-testid={`edit-client-${client.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(client.id)}
            data-testid={`remove-client-${client.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${client.id}`} className="switch">
            <input
              id={`available-switch-${client.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-client-${client.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Client;
