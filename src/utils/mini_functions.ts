const TRIVIA_KEY = "trivia-quest-storage";

export const getStorage =  () => {
    const fetchedData = localStorage.getItem(TRIVIA_KEY)
    const parsedData = fetchedData? JSON.parse(fetchedData):[]
    return parsedData
};
