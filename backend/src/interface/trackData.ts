/**
 * Interface for track data
 * @interface
 * @param {string} id - The id of the track
 * @param {string} name - The name of the track
 * @param {string[]} artists - The artists of the track
 * @param {string} album - The album of the track
 * @param {string} cover - The cover of the track
 */
export default interface TrackData {
    id: string;
    name: string;
    artists: string[];
    album: string;
    cover: string;
}