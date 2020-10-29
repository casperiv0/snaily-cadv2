import Image from "next/image";
import { useEffect, useState } from "react";
import api from "../utils/api";
import useAuth, { ProtectRoute } from "../utils/auth";
import { ICitizen } from '../utils/interfaces/ICitizen'

const Citizen = () => {
  const { user } = useAuth()
  const [citizens, setCitizens] = useState<Array<ICitizen>>([])

  useEffect(() => {
    api.get('/citizen')
    .then((res => {
      if(res.data.citizens){
        setCitizens(res.data.citizens)
      }
    }))
    .catch(e => console.log(e));
  }, [])
  
  return (
    <>
      <div className="px-16 py-2 bg-gray-800 shadow">
        <h1 className="text-xl font-semibold text-white">Olá {user?.username}</h1>
        <ul className="flex space-x-8 text-gray-300">
          <li>Registrar cidadão</li>
          <li>Registrar veículo</li>
          <li>Registrar nova arma</li>
        </ul>
      </div>
      <div className="px-16 py-8">
        {citizens.length < 0 ? (
          <span>Você não tem nenhum cidadão criado.</span>
        ) : (
          citizens.map(citizen => (
            <div key={citizen.id} className="w-40 h-40 text-white bg-gray-900 rounded-md">
              <Image src={`/${citizen.citizen_picture}`} unsized />
              <div className="p-2 text-center">
                <span className="font-semibold">{citizen.full_name}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ProtectRoute(Citizen);