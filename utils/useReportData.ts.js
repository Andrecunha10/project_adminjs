import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json());

export const useDataRport = (request, startDate, endDate, selectDate) =>{

    const{ data, error, isLoading} = useSWR(`http://localhost:3000/report/${request}?start_date=${startDate}&end_date=${endDate}&select_date=${selectDate}`, fetcher)

    return {
        dataReport: data,
        error,
        isLoading
    }
}