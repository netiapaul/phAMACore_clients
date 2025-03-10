import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { GetClients } from '../../../utils/services/services_api'
import { formatDate } from '../../../utils/functions'
import { Link } from 'react-router-dom'

export default function Clients() {
  document.title = 'Clients | phAMACore'

  const [tableData, setTableDate] = useState({
    selectedProduct: null,
    globalFilterValue: '',
    filters: {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    },
  })

  const {
    isPending: isClientsPending,
    isError: isClientError,
    data: clients,
    error: clientError,
  } = useQuery({
    queryKey: ['clients'],
    queryFn: () => GetClients(true),
  })

  const IDBodyTemplate = (rowData) => {
    return (
      <Link to={`/clients/client-details/${rowData?.id}`} className="fw-medium">
        {rowData?.id}
      </Link>
    )
  }
  const ExpiryDateTemplate = (rowData) => {
    return formatDate(new Date(rowData.psActivateExpiryDate))
  }
  const TransDateTemplate = (rowData) => {
    return formatDate(new Date(rowData.transDate))
  }
  const PickDateTemplate = (rowData) => {
    return formatDate(new Date(rowData.pickDate))
  }
  const BiosDisplayTemplate = (rowData) => {
    return <span>{`${rowData.psPickCPU}/${rowData.psPickBios}`}</span>
  }
  const statusBodyTemplate = (rowData) => {
    return <div className={rowData.psActivated === '1' ? 'batched-doc' : 'unbatched-doc'}></div>
  }
  const cloudBodyTemplate = (rowData) => {
    return (
      <input
        type="checkbox"
        id="forCloud"
        name="forCloud"
        className="text-center"
        checked={rowData.forCloud}
        disabled
      />
    )
  }
  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = { ...tableData.filters }

    _filters['global'].value = value
    setTableDate({
      ...tableData,
      filters: _filters,
      globalFilterValue: value,
    })
  }

  const handleSelect = (e) => {
    // setSelectedProduct(e.value)
    setTableDate({
      ...tableData,
      selectedProduct: e.value,
    })
    console.log(e)
  }

  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-end">
        <input
          type="text"
          className="form-control form-control-sm search-field-input"
          placeholder="Search"
          name=""
          id=""
          value={tableData.globalFilterValue}
          onChange={onGlobalFilterChange}
          // disabled
        />
      </div>
    )
  }

  const header = renderHeader()

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
          <DataTable
            value={clients}
            header={header}
            showGridlines
            size={'small'}
            paginator
            rows={30}
            rowsPerPageOptions={[5, 10, 15, 20, 50]}
            emptyMessage="No data found."
            selectionMode="single"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            dataKey="id"
            loading={isClientsPending}
            filters={tableData.filters}
            selection={tableData.selectedProduct}
            onSelectionChange={(e) => handleSelect(e)}
          >
            <Column field="id" header="ID" body={IDBodyTemplate}></Column>
            <Column field="psCusCode" header="Acct"></Column>
            <Column field="psCompanyName" header="AcctName"></Column>
            <Column field="branchCode" header="Bcode"></Column>
            <Column field="psBranchName" header="Branch"></Column>
            <Column field="psSerialNo" header="SerialNo"></Column>
            <Column
              field="psActivateExpiryDate"
              header="ExpiryDate"
              body={ExpiryDateTemplate}
              style={{ width: '6rem' }}
            ></Column>
            <Column
              field="transDate"
              header="TransDate"
              body={TransDateTemplate}
              style={{ width: '6rem' }}
            ></Column>
            {/* <Column
              field="pickDate"
              header="PickDate"
              body={PickDateTemplate}
              style={{ width: '6rem' }}
            ></Column> */}
            <Column field="psActivated" header="Active" body={statusBodyTemplate}></Column>
            <Column field="psPickCPU" header="CPU/BIOS" body={BiosDisplayTemplate}></Column>
            <Column field="psPickCompany" header="Company"></Column>
            <Column
              field="forCloud"
              header="Cloud"
              body={cloudBodyTemplate}
              style={{ width: '1.5rem', textAlign: 'center' }}
            ></Column>
            <Column field="packageName" header="PackageName"></Column>
          </DataTable>

          {/*  <input
                type="password"
                className={`form-control form-control-sm ${handleError(formik.touched.confpassword && formik.errors.confpassword)}`}
                id="confpassword"
                onChange={formik.handleChange}
                name="confpassword"
                value={formik.values.confpassword}
                onBlur={formik.handleBlur}
              />
              <i
                toggle="#password-field"
                className="mdi mdi-eye-off-outline field-icon toggle-password"
                role="button"
                onClick={() => alert('erwer')}
              ></i> */}
        </div>
      </div>
    </>
  )
}
