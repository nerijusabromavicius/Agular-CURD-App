import { TableRecord } from 'src/app/models/types';

//car owner data validations
export const validateCarOwner = (carOwner : Omit<TableRecord, "id">): string[] => {
    const carPlateRegulationRegex = "[A-Za-z]{3}[0-9]{3}";
    const validationErrors: string[] = Object.values(carOwner).reduce(
        (prev, cur, index) => {
            if(!prev){
                prev = [];
            } else if(!cur) {
                prev.push(`Please fill ${cammelCaseToTitle(Object.keys(carOwner)[index])}`)
            } else if(carOwner.carPlateNumber !== null && !carOwner.carPlateNumber.match(carPlateRegulationRegex)) {
                prev.push("Car plate number is incorect");
            }
            return prev;
        }, [] as string[]);
    return validationErrors;
};

const cammelCaseToTitle = (camelCase: string) => camelCase
  .replace(/([A-Z])/g, (match) => ` ${match}`)
  .replace(/^./, (match) => match.toUpperCase());
