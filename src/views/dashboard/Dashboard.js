import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { GetClients } from '../../../utils/services/services_api'

export default function Dashboard() {
  document.title = 'Clients | phAMACore'

  const {
    isPending: isClientsPending,
    isError: isClientError,
    data: clients,
    error: clientError,
  } = useQuery({
    queryKey: ['clients'],
    queryFn: () => GetClients(true),
  })

  return (
    <>
      <hr className="my-2 d-print-none" />
      <div className="container-fluid bg-light p-0 d-print-none">
        <div className="d-flex justify-content-between">
          <div className="flex-fill d-flex align-items-center">
            <h6 className="m-0">Customer Clients: </h6>
          </div>
        </div>
      </div>
      <hr className="my-2 d-print-none" />
      <div className="card">
        <div className="card-body">
          <h6>Headed to Greatness with Kinjoz</h6>
          <p>{JSON.stringify(clients)}</p>
        </div>
      </div>
    </>
  )
}
