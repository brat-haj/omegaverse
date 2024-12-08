import axios from "axios"

const getPreviewUrl = async(trackName: string, artistName: string) => {
    const result = await axios.get(`https://api.deezer.com/search?q=${trackName} ${artistName}`);
    return result.data.data[0].preview;
}

export default getPreviewUrl
