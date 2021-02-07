import { TableRecord } from "src/app/models/types";

export const filterRecords = (tableRecords: TableRecord[], searchInput: string) => {
    const filteredRecords = tableRecords.filter((value) => {
      return (
        value.firstName.toLowerCase().match(searchInput.toLowerCase()) || 
        value.lastName.toLowerCase().match(searchInput.toLowerCase()) || 
        value.carPlateNumber.toLowerCase().match(searchInput.toLowerCase())
      )
    });
    return filteredRecords;
}