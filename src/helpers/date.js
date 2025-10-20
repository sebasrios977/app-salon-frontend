import { format, formatISO, parse, parseISO } from "date-fns";
import { es } from "date-fns/locale";


export function convertToISO(strDate) {
    const newDate = parse(strDate, "dd/MM/yyyy", new Date());
    return formatISO(newDate);
}

export function convertToDDMMYYYY(isoDate) {
    const newDate = parseISO(isoDate);
    const formattedDate = format(newDate, "dd/MM/yyyy");
    return formattedDate;
}

export function displayDate(isoDate) {
    const newDate = parseISO(isoDate);
    const formattedDate = format(newDate, "PPPP", { locale: es });
    return formattedDate;
}