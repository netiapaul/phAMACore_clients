import { useQuery } from '@tanstack/react-query'
import { get } from '../../utils/config'
import { GetClients } from '../../utils/services/services_api'

export function CustomerClients() {
  //   const GetClientPackages = () => {
  //     return get(`/api/Clients/GetClients`, {
  //       params: { forcloundch: clientType },
  //     })
  //   }

  const {
    isPending: isClientsPending,
    isError: isClientError,
    data: clients,
    error: clientError,
  } = useQuery({
    queryKey: ['clients'],
    queryFn: () => GetClients(true),
  })
  return { isClientsPending, isClientError, clients, clientError }
}

export function UsePackages() {
  const GetClientPackages = () => {
    return get(`/api/Clients/Packages`)
  }

  const {
    isPending: isPackagePending,
    isError: isPackageError,
    data: packages,
    error: packageError,
  } = useQuery({
    queryKey: ['packages'],
    queryFn: GetClientPackages,
  })
  return { isPackagePending, isPackageError, packages, packageError }
}

export function UseSerialNumber() {
  const GetSerialNumbers = () => {
    return get(`/api/Customers/GetSerialNumbers`)
  }

  const {
    isPending: isSerialPending,
    isError: isSerialError,
    data: serialNumbers,
    error: serialError,
  } = useQuery({
    queryKey: ['serialNumbers'],
    queryFn: GetSerialNumbers,
  })
  return { isSerialPending, isSerialError, serialNumbers, serialError }
}

export function SystemUSers() {
  const GetUsers = () => {
    return get(`/api/Users/GetUsers`)
  }

  const {
    isPending: isUserPending,
    isError: isUserError,
    data: systemUsers,
    error: userError,
  } = useQuery({
    queryKey: ['system_users'],
    queryFn: GetUsers,
  })
  return { isUserPending, isUserError, systemUsers, userError }
}

export function UserRoles() {
  const GetRoles = () => {
    return get(`/api/Users/GetRoles`)
  }

  const {
    isPending: isRolesPending,
    isError: isRolesError,
    data: userRoles,
    error: rolesError,
  } = useQuery({
    queryKey: ['user_roles'],
    queryFn: GetRoles,
  })
  return { isRolesPending, isRolesError, userRoles, rolesError }
}

export function GetCompanies() {
  const GetCompany = () => {
    return get(`/api/SetUpUser/GetCompany`)
  }

  const {
    isPending: isCompanyPending,
    isError: isCompanyError,
    data: companies,
    error: companyError,
  } = useQuery({
    queryKey: ['companies'],
    queryFn: GetCompany,
  })
  return { isCompanyPending, isCompanyError, companies, companyError }
}

export function Getdatabases() {
  const Getdatabase = () => {
    return get(`/api/SetUpUser/Getdatabase`)
  }

  const {
    isPending: isDatabasePendin,
    isError: isDatabaseError,
    data: database,
    error: databaseError,
  } = useQuery({
    queryKey: ['databases'],
    queryFn: Getdatabase,
  })
  return { isDatabasePendin, isDatabaseError, databases, databaseError }
}
