import React, { useState, useEffect } from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import { RiSearchLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import Paginator from 'react-hooks-paginator';
import Header from '../../components/Header';

import api from '../../services/api';

import Client from '../../components/Client';
import ModalAddClient from '../../components/ModalAddClient';
import ModalEditClient from '../../components/ModalEditClient';


import { ClientContainer, SearchContaine } from './styles';

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

const Dashboard: React.FC = () => {
  const pageLimit = 6;

  const [customers, setCustomers] = useState<IClient[]>([]);
  const [customerData, setcustomerData] = useState<IClient[]>([]);

  const [editingClient, setEditingClient] = useState<IClient>({} as IClient);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [offset, setOffset] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");



  useEffect(() => {
    async function loadClient(): Promise<void> {
      const response = await api.get('/client',);

      setCustomers(response.data);
    }

    loadClient();
  }, []);

  useEffect(() => {
    setcustomerData(customers.slice(offset, offset + pageLimit));
  }, [offset, customers]);

  async function handleAddClient(
    client: Omit<IClient, 'id' | 'available'>,
  ): Promise<void> {
    const customerExists = customers.find(c => c.name == client.name);


    if (!customerExists) {
      const response = await api.post(`/client`, {
        ...client,
        available: true,
      });
      
      setCustomers ([...customers, response.data]);
    } else {
      toast.error('Cliente já existe');
     
    }

   
  }
  
  async function handleUpdateClient(
    client: Omit<IClient, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const response = await api.put(`/client/${editingClient.id}`, {
        ...editingClient,
        ...client,
      });

      setCustomers(
        customers.map(mappedClient =>
          mappedClient.id === editingClient.id
            ? { ...response.data }
            : mappedClient,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteClient(id: number): Promise<void> {
    try {
      await api.delete(`/client/${id}`);

      setCustomers(customers.filter(client => client.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditClient(client: IClient): void {
    setEditingClient(client);
    toggleEditModal();
  }

  function handleFilterValue (input: string) {
    const value = customers.filter(client => {
      if (
        client.name.toLowerCase() === input ||
        client.receipt ===  input
      ) {
        return client;
      }
    });
    setCustomers(value);
  };


  return (
    <>

      <Header>
        <div>
          <button type="button" onClick={toggleModal}>
            <div className="text">Novo Cliente</div>
            <div className="icon">
              <FiPlusSquare size={24} />
            </div>
          </button>
        </div>



      </Header>

      <ModalAddClient
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddClient={handleAddClient}
      />
      <ModalEditClient
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingClient={editingClient}
        handleUpdateClient={handleUpdateClient}
      />

      <SearchContaine>
       < input

        type="text"
        placeholder="Buscar Cliente"
        onChange={(e) => {
          setSearchInput(e.target.value.toLowerCase());
        }} />
         <RiSearchLine fontSize="30" onClick={() => handleFilterValue(searchInput)} />
      </SearchContaine>

      <ClientContainer data-testid="client-list">



        {customerData &&
          customerData.map(client => (
            <Client
              key={client.id}
              client={client}
              handleDelete={handleDeleteClient}
              handleEditClient={handleEditClient}
            />
          ))}
      </ClientContainer>

      <Paginator
          totalRecords={customers.length}
          pageLimit={6}
          pageNeighbours={1}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
    </>
  );
};

export default Dashboard;
