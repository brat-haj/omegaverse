import axios from "axios";
import  RecommendationsData  from "../../interface/recommendationsData";
import { getFavoriteArtist } from "./artist";
import { getFavoriteTrack } from "./track";
import TrackData from "../../interface/trackData";
/**
 * Get recommendations from Spotify
 * @param {string} accessToken - The access token
 * @returns {Promise<object>} - Returns the recommendations
 */
export const getRecommendations = async (accessToken: string): Promise<RecommendationsData> => {
    try {
        const favoriteArtist = await getFavoriteArtist(accessToken);
        const favoriteTrack = await getFavoriteTrack(accessToken);
        let mergedSearch: RecommendationsData = { tracks: [] };
        const artistTracks = await searchByArtist(favoriteArtist.name,accessToken);
        const trackTracks = await searchByTrack(favoriteTrack.name, accessToken);
        const artistAndTrackTracks = await searchByArtistAndTrack(favoriteArtist.name, favoriteTrack.name, accessToken);

        mergedSearch.tracks = [
            ...artistTracks,
            ...trackTracks,
            ...artistAndTrackTracks
        ];

        mergedSearch.tracks = mergedSearch.tracks.sort(() => Math.random() - 0.5);

        return mergedSearch;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
    }
}

const searchByArtist = async (artistName: string, accessToken: string): Promise<TrackData[]> => { 
    try {
        artistName = artistName.replace(/ /g, "%20");
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${artistName}&type=track`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const tracks: TrackData[] = [];
        for(let i = 1; i < response.data.tracks.items.length; i++) {
            const track = response.data.tracks.items[i];
            tracks.push({
                id: track.id,
                name: track.name,
                artists: track.artists.map((artist: any) => artist.name),
                album: track.album.name,
                cover: track.album.images[0].url,
            });
        }
        return tracks;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
    }
}

const searchByTrack = async (trackName: string, accessToken: string): Promise<TrackData[]> => {
    try {
        trackName = trackName.replace(/ /g, "%20");
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${trackName}&type=track`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const tracks: TrackData[] = [];
        for(let i = 1; i < response.data.tracks.items.length; i++) {
            const track = response.data.tracks.items[i];
            tracks.push({
                id: track.id,
                name: track.name,
                artists: track.artists.map((artist: any) => artist.name),
                album: track.album.name,
                cover: track.album.images[0].url,
            });
        }
        return tracks;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
    }
}

const searchByArtistAndTrack = async (artistName: string, trackName: string, accessToken: string): Promise<TrackData[]> => { 
    try {
        artistName = artistName.replace(/ /g, "%20");
        trackName = trackName.replace(/ /g, "%20");
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${artistName}%20${trackName}&type=track`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const tracks: TrackData[] = [];
        for(let i = 1; i < response.data.tracks.items.length; i++) {
            const track = response.data.tracks.items[i];
            tracks.push({
                id: track.id,
                name: track.name,
                artists: track.artists.map((artist: any) => artist.name),
                album: track.album.name,
                cover: track.album.images[0].url,
            });
        }
        return tracks;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
    }
}