import { TableRecord } from "src/app/models/types";
const apiEnpoint = 'http://localhost:8080/carowner'

export const getCarOwners = async ():Promise<TableRecord[]> => {
    const carOwners = await fetch(apiEnpoint)
  .then(response => response.json())
  .then(data => data);
  return carOwners;
};

export const createCarOwner = async (newCarOwner: Omit<TableRecord, "id">) => {
    await fetch(apiEnpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCarOwner)
      })
  .then(response => response.json())
  .then(handleErrors)
  .then(result => {
    if(!result.error){
      location.reload();
    }
  })
};


export const editCarOwner = async (carOwner: any) => {
  await fetch(`${apiEnpoint}/${carOwner.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(carOwner)
  })
  .then(response => response.json())
  .then(handleErrors)
  .then(result => {
    if(!result.error){
      location.reload();
    }
  })
}

export const deleteCarOwner = async (carOwnerId: string) => {
  await fetch(`${apiEnpoint}/${carOwnerId}`,{method: 'DELETE'})
  .then(response => response.json())
}

function handleErrors(result:any) {
  if (result.error) {
      throw Error(result.msg);
  }
  return result;
}